---
sidebar_label: 'Environment Variables'
title: 'Set Environment Variables on Astronomer'
id: environment-variables
---

## Overview

You can use environment variables to set Airflow configurations ([reference here](https://airflow.apache.org/docs/stable/configurations-ref.html)) and custom values for your Airflow Deployments.

For instance, you can set environment variables to:

- Set up an SMTP service.
- Limit Airflow parallelism and DAG concurrency.
- Store Airflow Connections and Variables.
- Customize your default DAG view in the Airflow UI (Tree, Graph, Gantt, etc.)

This guide covers:

- How to set environment variables on Astronomer.
- How environment variables are stored on Astronomer.
- How to store Airflow Connections and Variables as environment variables.

> **Note:** Some environment variables on Astronomer Cloud are set globally and cannot be overridden for individual Deployments. For more information on these environment variables, read [Global Environment Variables](global-variables).

## Set Environment Variables via the Astronomer UI

Environment variables can be set directly in the Astronomer UI. To do so:

1. In the Astronomer UI, open a Deployment.
2. In the Deployment's **Configuration** menu, click **Edit Variables**.

    ![Edit Variables button highlighted in the Deployment configuration page](/img/docs/edit-variables.png)

3. Specify an environment variable key and value in the table. To permanently hide the variable's value from all users in your Workspace, additionally select the **Secret** checkbox.

    When you finish configuring the environment variable, click **Add**.

    ![Add Variables button highlighted in the Environment Variables configuration table](/img/docs/add-variable.png)

4. Click **Update Variables** to apply your changes. This action restarts your Airflow Scheduler, Webserver, and Workers.

### Edit existing values

If you want to make changes to existing environment variables, you can edit the values for those variable keys. To do so:

1. In the Astronomer UI, open a Deployment.
2. In the Deployment's **Configuration** menu, click **Edit Variables**.
3. Click the pencil icon next to the value you want to edit.

    ![Pencil icon next to an existing value in the Environment Variables configuration table](/img/docs/variable-pencil.png)

4. Reconfigure the variable, then click the Green checkmark.

    ![Green checkmark icon next to an updated value in the Environment Variables configuration table](/img/docs/variable-checkmark.png)

5. Click **Update Variables** to apply your changes. This action restarts your Airflow Scheduler, Webserver, and Workers.

### How environment variables are stored on Astronomer

All values for environment variables that are set in the Astronomer UI are stored in a database managed by Astronomer as part of the Control Plane. If you set environment variables in your Dockerfile, they are stored in the Docker image that is generated when you run `astro dev start` or `astro deploy`.

If you have an environment variable with sensitive information or credentials, we recommend setting the variable as **Secret** via the UI instead of storing it in your Dockerfile.

## Set Environment Variables via Dockerfile

If you want to store environment variables using an external version control tool, we recommend setting them in your `Dockerfile`. This file is automatically created when you first initialize an Airflow project on Astronomer via `astro dev init`.

> **Note:** Given that this file will be committed upstream, we strongly recommend either storing sensitive variables via the Astronomer UI or using a 3rd party secrets protocol.

To add environment variables, declare an ENV statement with the environment variable key and value. Your Dockerfile might look like this:

```
FROM quay.io/astronomer/astro-runtime:2.1.1
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

## Add Airflow Connections and Variables via Environment Variables

For users who regularly use [Airflow Connections](https://airflow.apache.org/docs/apache-airflow/stable/concepts/connections.html) and [Variables](https://airflow.apache.org/docs/apache-airflow/stable/concepts/variables.html), we recommend storing and fetching them via environment variables.

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

> **Note:** Airflow Connections set via environment variables do not appear in the Airflow UI and cannot be modified there.

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

On Astronomer, environment variables are applied and overridden in the following order:

1. Astronomer UI
2. [.env (local development only)](develop-project#set-environment-variables-via-env-local-development-only))
3. Dockerfile
4. Default Airflow Values (`airflow.cfg`)

For example, if you set `AIRFLOW__CORE__PARALLELISM` with one value via the Astronomer UI and you set the same environment variable with another value in your `Dockerfile`, the value set in the Astronomer UI will take precedence.
