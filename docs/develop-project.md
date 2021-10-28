---
sidebar_label: 'Develop a Project'
title: 'Develop Your Astronomer Project'
id: 'develop-project'
---

import {siteVariables} from '@site/src/versions';

## Overview

This document explains the various ways you can work in a local Astronomer project. Specifically, this guide provides instructions on how to:

- Add DAG code to your project
- Add Python and OS-level packages to your project
- Add dependencies to your project
- Run on-build commands
- Use the Airflow CLI
- Add environment variables locally

## Prerequisites

To develop locally, you need:

- An existing [Astronomer project](create-project).
- [The Astronomer CLI](install-cli)
- [Docker](https://www.docker.com/products/docker-desktop)

## Run a Project Locally

To run a local Astronomer project, run `astro dev start`. This command builds your project and spins up 3 Docker containers on your machine, each for a different Airflow component:

- **Postgres:** Airflow's metadata database
- **Webserver:** The Airflow component responsible for rendering the Airflow UI
- **Scheduler:** The Airflow component responsible for monitoring and triggering tasks

Once the project builds, you can access the Airflow UI by going to `http://localhost:8080/` and logging in with `admin` for both your username and password. You can also access your Postgres database at `localhost:5432/postgres`.

### Access Airflow Logs

To show logs for the Scheduler or Webserver in a locally running Astronomer project, run `astro dev logs`. Once you run this command, the most recent logs for these components appear in your terminal window.

To continue monitoring logs, run `astro dev logs --follow`. The `--follow` flag ensures that the latest logs continue to appear in your terminal window.

### Run Airflow CLI Commands

To run [Apache Airflow CLI](https://airflow.apache.org/docs/apache-airflow/stable/cli-and-env-variables-ref.html) commands in your locally running project, run `astro dev run` followed by an Airflow command.

For example, the Apache Airflow command for viewing your entire configuration is `airflow config list`. To run this command with the Astronomer CLI, you would run `astro dev run config list` instead.

## Rebuild a Project

All Astronomer projects require you to specify a Debian-based Astronomer Runtime image in a `Dockerfile`. When you run your project locally or on Astronomer Cloud, all of your DAG code, packages, and configurations are built into this image.

If you're making a change to your Astronomer project, you might have to rebuild your image and update your local Airflow environment to run your changes locally.

### DAG Code Changes

All changes made to the following files will be live in your project as soon as you save them to your code editor:

- `dags`
- `plugins`
- `include`

Once you save your changes, refresh the Airflow Webserver in your browser to see them render.

### Environment Changes

All changes made to the following files require rebuilding your image:

- `packages.txt`
- `Dockerfile`
- `requirements.txt`
- `airflow_settings.yaml`

To rebuild your project after making a change to any of these files, `astro dev stop` followed by `astro dev start`. In addition to rebuilding your image, these commands restart the Docker containers running your local Airflow environment.

> **Note:** Note: As you develop locally, it may be necessary to reset your Docker containers and metadata DB for testing purposes. To do so, run astro dev kill instead of astro dev stop when rebuilding your image. This deletes all data associated with your local Postgres metadata database, including Airflow Connections, logs, and task history.

## Add DAGs

DAGs are stored in the `dags` folder of your Astronomer project. To add a DAG to your project, simply add its `.py` file to this folder.

### Add DAG Helper Functions

To build additional helper functions for DAGs into your Astronomer project, we recommend adding a folder of `helper_functions` with a set of files that can be used by Airflow DAGs. To do this:

1. Add a directory of `helper_functions` to your local project:

    ```bash
    .
    ├── airflow_settings.yaml
    ├── dags
    │   └── example-dag.py
    ├── Dockerfile
    ├── helper_functions
    │   └── helper.py
    ├── include
    ├── packages.txt
    ├── plugins
    │   └── example-plugin.py
    └── requirements.txt
    ```

2. [Rebuild your project](develop-locally#rebuild-a-project).

To confirm that your helper functions were successfully installed:

1. Run `docker ps` to identify the 3 running docker containers on your machine
2. Copy the container ID of your Scheduler container
3. Run the following command to see your new directory in the container:

    ```bash
    $ docker exec -it <scheduler-container-id> /bin/bash
    bash-4.4$ ls
    Dockerfile  airflow_settings.yaml  helper_functions  logs  plugins  unittests.cfg
    airflow.cfg  dags  include  packages.txt  requirements.txt
    ```

## Add Python and OS-level Packages

To build Python and OS-level packages into your Astronomer project, add them to your `requirements.txt` and `packages.txt` files. Add Python packages to your `requirements.txt` and OS-level packages to your `packages.txt` file.

To pin a version of a package, use the following syntax:

```text
<package-name>==<version>
```

To exclusively use Pymongo 3.7.2, for example, add the following line to your `requirements.txt` file:

```text
pymongo==3.7.2
```

If you don't pin a package to a version, the latest version of the package that's publicly available is installed by default.

Once you've saved these packages in your project files, [rebuild your project](develop-locally#rebuild-a-project).

### Confirm your package was installed

If you added `pymongo` to your `requirements.txt` file, for example, you can confirm that it was properly installed by running a `docker exec` command into your Scheduler:

1. Run `docker ps` to identify the 3 running docker containers on your machine
2. Copy the container ID of your Scheduler container
3. Run the following:

```
docker exec -it <scheduler-container-id> pip freeze | grep pymongo

pymongo==3.7.2
```

## Configure `airflow_settings.yaml` (Local Development Only)

When you first initialize a new Astronomer project, a file called `airflow_settings.yaml` is automatically generated. With this file, you can configure and programmatically generate Airflow [Connections](https://airflow.apache.org/docs/apache-airflow/stable/howto/connection.html), [Pools](https://airflow.apache.org/docs/apache-airflow/stable/concepts/pools.html), and [Variables](https://airflow.apache.org/docs/apache-airflow/stable/howto/variable.html) when you're developing locally.

:::caution
If you are storing your project in a public directory, we recommend adding this file to your `.gitignore` or equivalent secret management service.
:::

### Add Airflow Connections, Pools, and Variables

By default, the `airflow_settings.yaml` file includes the following template:

```yaml
airflow:
  connections:
    - conn_id: my_new_connection
      conn_type: postgres
      conn_host: 123.0.0.4
      conn_schema: airflow
      conn_login: user
      conn_password: pw
      conn_port: 5432
      conn_extra:
  pools:
    - pool_name: my_new_pool
      pool_slot: 5
      pool_description:
  variables:
    - variable_name: my_variable
      variable_value: my_value
```

This template includes all possible configuration values. If you want to add another Connection, Pool, or Variable, you can copy the existing fields for the given resource and replace the default values with your own. For instance, to create another Variable, you can add its values under the existing default Variable like so:

```yaml
variables:
  - variable_name: my_variable
    variable_value: my_value
  - variable_name: my_second_variable
    variable_value: value987
```

Once you've saved those packages in your project files, [rebuild your project](develop-locally#rebuild-a-project). When you access the Airflow UI for your project at `localhost:8080`, you should see your new resources in the **Connections**, **Pools**, and **Variables** tabs.

## Run Commands on Build

To run extra system commands when your Airflow image builds, add them to your `Dockerfile` as a `RUN` command. These commands run as the last step in the image build process.

For example, if you want to run `ls` when your image builds, your `Dockerfile` would look like this:

<pre><code parentName="pre">{`FROM quay.io/astronomer/astro-runtime:${siteVariables.runtimeVersion}
`}</code></pre>

## Add Environment Variables (Local development only)

The Astronomer CLI comes with the ability to bring in Environment Variables from a specified file by running `astro dev start` with an `--env` flag:

```
astro dev start --env .env
```

This feature is available for local development only. For more detail on how to add Environment Variables both locally and on Astronomer Cloud, refer to [Environment Variables](environment-variables).
