---
sidebar_label: 'Deploy Code'
title: 'Deploy Code to Astronomer'
id: 'environment-variables'
---

## Overview

You can use environment variables to set Airflow configurations ([reference here](https://airflow.apache.org/docs/stable/configurations-ref.html)) and custom values for your Airflow Deployments.

For instance, you can set environment variables to:

- Set up an SMTP service.
- Limit Airflow parallelism and DAG concurrency.
- Store Airflow Connections and variables.
- Customize your default DAG view in the Airflow UI (Tree, Graph, Gantt, etc.)

This guide covers:

- How to set environment variables on Astronomer
- How environment variables are stored on Astronomer
- How to store Airflow Connections and Variables as environment variables

> Some environment variables on Astronomer Cloud are set at the platform level and cannot be overridden on individual Deployments. For more information on these environment variables, read Platform Environment Variables.

## Set Environment Variables via the Astronomer UI

Environment variables can be set directly in the Astronomer UI. To do so:

1. In the Astronomer UI, open an Airflow Deployment.
2. Open the **Variables** tab.
3. Specify an environment variable name and value in the table.
4. Click **Add**.

<div class="text--center">
  <img src="/img/docs/env-vars.png" alt="Environment variables table" />
</div>

> **Note:** Input for all configurations officially supported by Airflow are pre-templated, but you can also specify your own values.

### How environment variables are stored on Astronomer

All values for environment variables that are added via the Astronomer UI are stored as a [Kubernetes Secret](https://kubernetes.io/docs/concepts/configuration/secret/), which is encrypted at rest and mounted to your Deployment's Airflow pods (Scheduler, Webserver, Worker(s)) as soon as they're set or changed.

Environment variables are not stored in Airflow's Metadata Database and are not stored in Astronomer's platform database. Unlike other components, the Astronomer Houston API fetches them from the Kubernetes Secret instead of the platform's database to render them in the Astronomer UI.

For information on how Airflow Connections and Variables are encrypted on Astronomer, refer to [this forum post](https://forum.astronomer.io/t/how-are-connections-variables-and-env-vars-encrypted-on-astronomer/173).

## Set Environment Variables via Dockerfile

If you want to store environment variables using an external version control tool, we recommend setting them in your `Dockerfile`. This file is automatically created when you first initialize an Airflow project on Astronomer via `astro dev init`.

> **Note:** Given that this file will be committed upstream, we strongly recommend using a secrets protocol to store environment variables containing sensitive information.

To add environment variables, declare an ENV statement with the environment variable name and value. Your Dockerfile might look like this:

```
FROM quay.io/astronomer/ap-airflow:1.10.7-buster-onbuild
ENV AIRFLOW__CORE__MAX_ACTIVE_RUNS_PER_DAG=1
ENV AIRFLOW__CORE__DAG_CONCURRENCY=5
ENV AIRFLOW__CORE__PARALLELISM=25
```

Once your environment variables are added:

1. Run `astro dev stop` and `astro dev start` to rebuild your image and apply your changes locally OR
2. Run `astro deploy` to apply your changes to your running Airflow Deployment on Astronomer

> **Note:** Environment variables injected via the `Dockerfile` are mounted at build time and can be referenced in any other processes run during the Docker build process that immediately follows `astro deploy` or `astro dev start`.
>
> Environment variables applied via the Astronomer UI only become available once the Docker build process has been completed.

## Set Environment Variables via .env (Local Only)

You can use the [Astronomer CLI](/docs/enterprise/v0.25/develop/cli-quickstart/) to set environment variables based on a specified `.env` file, which was automatically generated when you initialized an Airflow project on Astronomer via `astro dev init`.

To add Environment Variables locally:

1. Open the `.env` file in your Airflow project directory.
2. Add your environment variables to the `.env` file.
3. Rebuild your image by running `astro dev start --env .env`.

When setting environment variables in your `.env` file, use the following format:

```
AIRFLOW__CORE__DAG_CONCURRENCY=5
```

> **Note:** If your Environment Variables contain secrets you don't want to expose in plain-text, you may want to add your `.env` file to `.gitignore` when you deploy these changes to your version control tool.

### Confirm your Environment Variables were Applied

To confirm that the environment variables you just set were applied to your Airflow Deployment locally, first run:

```
docker ps
```

This will output 3 Docker containers that were provisioned to run Airflow's 3 primary components on your machine: The Airflow Scheduler, Webserver and Postgres Metadata Database.

Now, create a [Bash session](https://docs.docker.com/engine/reference/commandline/exec/#examples) in your scheduler container by running:

```
docker exec -it <scheduler-container-name> /bin/bash
```

If you run `ls -1` following this command, you'll see a list of running files:

```
bash-5.0$ ls -1
Dockerfile             airflow.cfg            airflow_settings.yaml  dags                   include                logs                   packages.txt           plugins                requirements.txt       unittests.cfg
```

Now, run:

```
env
```

This should output all Environment Variables that are running locally, some of which are set by you and some of which are set by Astronomer by default.

> **Note:** You can also run `cat airflow.cfg` to output _all_ contents in that file.

### Use multiple .env files

The Astronomer CLI will look for `.env` by default, but if you want to specify multiple files, make `.env` a top-level directory and create sub-files within that folder.

A project with multiple `.env` files might look like the following:

```
my_project
  ├── Dockerfile
  └──  dags
    └── my_dag
  ├── plugins
    └── my_plugin
  ├── airflow_settings.yaml
  ├── .env
    └── dev.env
    └── prod.env
```

## Add Airflow Connections and Variables via Environment Variables

For users who regularly use Airflow Connections and Variables, we recommend storing and fetching them via environment variables.

As mentioned above, Airflow Connections and Variables are stored in Airflow's Metadata Database. Adding them outside of task definitions and operators requires an additional connection to Airflow's Postgres Database, which is called every time the Scheduler parses a DAG (as defined by `process_poll_interval`, which is set to 1 second by default).

By adding Connections and Variables as environment variables, you can refer to them more easily in your code and lower the amount of open connections, thus preventing a strain on your Database and resources.

### Airflow Connections

The environment variable naming convention for Airflow Connections is:

```
ENV AIRFLOW_CONN_<CONN_ID>=<connection-uri>
```

For example, consider the following Airflow Connection:

- Connection ID: `MY_PROD_DB`
- Connection URI: `my-conn-type://login:password@host:5432/schema`

Here, the full environment variable would read:

```
ENV AIRFLOW_CONN_MY_PROD_DB=my-conn-type://login:password@host:5432/schema
```

You can set this environment variable via an `.env` file locally, via your Dockerfile, or via the Astronomer UI as explained above. For more information on how to generate your Connection URI, refer to the [Apache Airflow documentation](https://airflow.apache.org/docs/stable/howto/connection/index.html#generating-connection-uri).

### Airflow Variables

The environment variable naming convention for Airflow Variables is:

```
ENV AIRFLOW_VAR_<VAR_NAME>=Value
```

For example, consider the following Airflow Variable:

- Variable Name: `My_Var`
- Value: `2`

Here, the environment variable would read:

```
ENV AIRFLOW_VAR_MY_VAR=2
```

## Environment Variable Priority

On Astronomer, environment variables will be applied and overridden in the following order:

1. Astronomer UI
2. .env (Local only)
3. Dockerfile
4. Default Airflow Values (`airflow.cfg`)

For example, if you set `AIRFLOW__CORE__PARALLELISM` with one value via the Astronomer UI and you set the same environment variable with another value in your `Dockerfile`, the value set in the Astronomer UI will take precedence.
