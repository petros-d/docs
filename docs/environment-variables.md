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

## Set Environment Variables via the Astronomer UI

Environment variables can be set directly in the Astronomer UI. To do so:

1. In the Astronomer UI, open an Airflow Deployment.
2. Open the **Variables** tab.
3. Add your environment variables.

![Astro UI Env Vars Config](https://assets2.astronomer.io/main/docs/astronomer-ui/v0.16-Astro-UI-EnvVars.png)

> **Note:** Input for all configurations officially supported by Airflow are pre-templated, but you can also specify your own values.

### How Environment Variables are Stored on Astronomer

All values for environment variables that are added via the Astronomer UI are stored as a [Kubernetes Secret](https://kubernetes.io/docs/concepts/configuration/secret/), which is encrypted at rest and mounted to your Deployment's Airflow pods (Scheduler, Webserver, Worker(s)) as soon as they're set or changed.

Environment variables are _not_ stored in Airflow's Metadata Database and are _not_ stored in Astronomer's platform database. Unlike other components, the Astronomer Houston API fetches them from the Kubernetes Secret instead of the platform's database to render them in the Astronomer UI.

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

> **Note:** Environment variables injected via the `Dockerfile` are mounted at build time and can be referenced in any other processes run during the docker build process that immediately follows `$ astro deploy` or `astro dev start`.
>
> Environment variables applied via the Astronomer UI only become available once the docker build process has been completed.

## Environment Variable Priority

Given the ability to set environment variables across 3 different methods potentially simultaneously, it's worth noting the precedence each take.

On Astronomer, environment variables will be applied and overridden in the following order:

1. Astronomer UI
2. Dockerfile
3. Default Airflow Values (`airflow.cfg`)

In other words, if you set `AIRFLOW__CORE__PARALLELISM` with one value via the Astronomer UI and you set the same environment variable with another value in your `Dockerfile`, the value set in the Astronomer UI will take precedence.

## Add Airflow Connections and Variables via Environment Variables

For users who regularly use Airflow Connections and Variables, we recommend storing and fetching them via environment variables.

As mentioned above, Airflow Connections and Variables are stored in Airflow's Metadata Database. Adding them _outside_ of task definitions and operators requires an additional connection to Airflow's Postgres Database, which is called every time the Scheduler parses a DAG (as defined by `process_poll_interval`, which is set to 1 second by default).

By adding Connections and Variables as environment variables, you can refer to them more easily in your code and lower the amount of open connections, thus preventing a strain on your Database and resources.

Read below for instructions on both.

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

You're free to set this environment variable via an `.env` file locally, via your Dockerfile or via the Astronomer UI as explained above. For more information on how to generate your Connection URI, refer to [Airflow's documentation](https://airflow.apache.org/docs/stable/howto/connection/index.html#generating-connection-uri).

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

> **Note:** The ability to store and fetch Airflow Variables was [introduced in Airflow 1.10.10](https://github.com/apache/airflow/pull/7923) and is not available in earlier versions.
