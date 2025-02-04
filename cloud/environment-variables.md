---
sidebar_label: 'Environment Variables'
title: 'Set Environment Variables on Astronomer'
id: environment-variables
description: Set environment variables on Astronomer to specify Airflow configurations and custom logic.
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

> **Note:** Some environment variables on Astronomer Cloud are set globally and cannot be overridden for individual Deployments. For more information on these environment variables, read [Global Environment Variables](platform-variables.md).

## Set Environment Variables via the Astronomer UI

Environment variables can be set directly in the Astronomer UI. To do so:

1. In the Astronomer UI, open a Deployment.
2. In the Deployment's **Configuration** menu, click **Edit Variables**.

    ![Edit Variables button highlighted in the Deployment configuration page](/img/docs/edit-variables.png)

3. Specify an environment variable key and value in the table. For sensitive credentials that should be treated with an additional layer of security, select the **Secret** checkbox. This will permanently hide the variable's value from all users in your Workspace.

    When you're finished configuring the environment variable, click **Add**.

    ![Add Variables button highlighted in the Environment Variables configuration table](/img/docs/add-variable.png)

4. Click **Update Variables** to save your changes. This action restarts your Airflow Scheduler, Webserver, and Workers. After saving, it can take up to two minutes for new variables to be applied to your Deployment.

:::caution

Environment variables marked as secret are stored securely by Astronomer and will never be shown in the Astronomer UI, but it's possible for a user in your organization to proactively create or configure a DAG that exposes those values in Airflow task logs. Airflow task logs are visible to all Workspace members in the Airflow UI and accessible in your Astronomer Cluster's Amazon S3 bucket.

To avoid exposing secret values in task logs, instruct your team to not log environment variables in DAG code. At this time, there is no way for Astronomer to prohibit this.

:::

### Edit existing values

If you want to make changes to an existing environment variable, you can modify the variable's value at any time. To do so:

1. In the Astronomer UI, open a Deployment.
2. In the Deployment's **Configuration** menu, click **Edit Variables**.
3. Click the pencil icon next to the value you want to edit.

    ![Pencil icon next to an existing value in the Environment Variables configuration table](/img/docs/variable-pencil.png)

4. Modify the variable's value, then click the green checkmark.

    ![Green checkmark icon next to an updated value in the Environment Variables configuration table](/img/docs/variable-checkmark.png)

5. Click **Update Variables** to save your changes. This action restarts your Airflow Scheduler, Webserver, and Workers. After saving, it can take up to two minutes for updated variables to be applied to your Deployment.

Once an environment variable key has been set, it cannot be changed. Only an environment variable's value can be modified.

:::caution

Environment Variables that are set as secret can be modified, but the variable's secret value will never be shown to the user once it's been saved. To modify a secret environment variable, you'll be prompted to enter a new value.

:::

### How environment variables are stored on Astronomer

Environment variables that are set via the Astronomer UI or API and are not marked as secret are stored in a database managed by Astronomer.

Environment variables that are set via the Astronomer UI or API and _are_ marked as secret are encrypted and stored in a secrets backend that is managed by Astronomer and hosted in the Control Plane.

## Set Environment Variables via Dockerfile

If you want to store environment variables using an external version control tool, we recommend setting them in your `Dockerfile`. This file is automatically created when you first initialize an Astronomer project via `astrocloud dev init`.

:::caution

Given that this file will be committed to your version control tool and to Astronomer, we strongly recommend either storing sensitive environment variables via the Astronomer UI or using a third party secrets backend.

:::

To add environment variables, declare an ENV statement with the environment variable key and value. Your Dockerfile might look like this:

```
FROM quay.io/astronomer/astro-runtime:2.1.1
ENV AIRFLOW__CORE__MAX_ACTIVE_RUNS_PER_DAG=1
ENV AIRFLOW__CORE__DAG_CONCURRENCY=5
ENV AIRFLOW__CORE__PARALLELISM=25
```

Once your environment variables are added:

1. Run `astrocloud dev stop` and `astrocloud dev start` to rebuild your image and apply your changes locally OR
2. Run `astrocloud deploy` to apply your changes to your running Airflow Deployment on Astronomer

> **Note:** Environment variables injected via the `Dockerfile` are mounted at build time and can be referenced in any other processes run during the Docker build process that immediately follows `astrocloud deploy` or `astrocloud dev start`.
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
2. [.env (local development only)](develop-project.md#set-environment-variables-via-env-local-development-only))
3. Dockerfile
4. Default Airflow Values (`airflow.cfg`)

For example, if you set `AIRFLOW__CORE__PARALLELISM` with one value via the Astronomer UI and you set the same environment variable with another value in your `Dockerfile`, the value set in the Astronomer UI will take precedence.
