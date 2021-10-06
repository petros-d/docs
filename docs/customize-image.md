---
sidebar_label: 'Customize Image'
title: 'Customize the Astronomer Runtime Image'
id: 'customize-image'
---

import {siteVariables} from '@site/src/versions';

## Overview

All Astronomer projects require you to specify a Debian-based Astronomer Runtime image in a `Dockerfile`. While the Runtime Docker image includes packages, dependencies, and logic to support your experience with Apache Airflow, almost all use cases require that you customize your Astronomer project in some way.

This guide provides instructions on how to:

- Add Python and OS-level packages to Runtime
- Add dependencies to Runtime
- Run on-build commands
- Use the Airflow CLI
- Add environment variables locally
- Build from a private repository

> **Note:** The guidelines below assume that you've initialized a project on Astronomer via `astro dev init`. For more information on initializing projects, refer to our [Develop Locally](develop-locally).

## Add Python and OS-level Packages

To build Python and OS-level packages into your Airflow Deployment, add them to your `requirements.txt` and `packages.txt` files in your Astronomer project. Both files are automatically generated when initializing a project locally via `astro dev init`.

Add Python packages to your `requirements.txt` and OS-level packages to your `packages.txt` file.

To pin a version of a package, use the following syntax:

```
<package-name>==<version>
```

If you'd like to exclusively use Pymongo 3.7.2, for example, you'd add the following in your `requirements.txt` file:

```
pymongo==3.7.2
```

If you don't pin a package to a version, the latest version of the package that's publicly available will be installed by default.

### Rebuild your image

Once you've saved those packages in your project files, rebuild your image by running `astro dev stop` followed by `astro dev start`. This process stops your running Docker containers and restarts them with your updated image.

### Confirm your package was installed

If you added `pymongo` to your `requirements.txt` file, for example, you can confirm that it was properly installed by running a `docker exec` command into your Scheduler:

1. Run `docker ps` to identify the 3 running docker containers on your machine
2. Copy the container ID of your Scheduler container
3. Run the following:

```
docker exec -it <scheduler-container-id> pip freeze | grep pymongo

pymongo==3.7.2
```

## Add Other Dependencies

In the same way you can build Python and OS-level Packages into your image, you can build additional dependencies and files for your DAGs to use.

In the example below, we'll add a folder of `helper_functions` with a file (or set of files) that can be used by Airflow DAGs.

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

2. Rebuild your image by running `astro dev stop` followed by `astro dev start`.

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

## Configure `airflow_settings.yaml` (Local Development Only)

When you first initialize a new Astronomer project, a file called `airflow_settings.yaml` is automatically generated. With this file, you can configure and programmatically generate Airflow [Connections](https://airflow.apache.org/docs/apache-airflow/stable/howto/connection.html), [Pools](https://airflow.apache.org/docs/apache-airflow/stable/concepts/pools.html), and [Variables](https://airflow.apache.org/docs/apache-airflow/stable/howto/variable.html) when you're developing locally.

:::caution
For security reasons, the `airflow_settings.yaml` file is currently only for local development and should not be used for pushing up code to Astronomer via `astro deploy`. For the same reason, we recommend adding this file to your `.gitignore` or equivalent secret management service.
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

This template includes all possible configuration values. If you want to add another Connection/Pool/Variable, you can copy the existing fields for that resource and replace the default values with your own. For instance, to create another Variable, you can add its values under the existing default Variable like so:

```yaml
variables:
  - variable_name: my_variable
    variable_value: my_value
  - variable_name: my_second_variable
    variable_value: value987
```

### Rebuild your image

To deploy your new Connections/Pools/Variables to your local project, rebuild your image by running `astro dev stop` followed by `astro dev start`. This process stops your running Docker containers and restarts them with your updated image.

When you access the Airflow UI for your project at `localhost:8080`, you should see your new resources in the **Connections**, **Pools**, and **Variables** tabs.

## Run Commands on Build

To run extra commands when your Airflow image builds, add the commands to your `Dockerfile` as a `RUN` command. These will run as the last step in the image build process.

For example, if you want to run `ls` when your image builds, your `Dockerfile` would look like this:

<pre><code parentName="pre">{`FROM quay.io/astronomer/astro-runtime:${siteVariables.runtimeVersion}
`}</code></pre>

## Docker Compose Override (Local Development Only)

The Astronomer CLI is built on top of [Docker Compose](https://docs.docker.com/compose/), a tool for defining and running multi-container Docker applications. To override any of the Astronomer CLI's default configurations, add a `docker-compose.override.yml` file to your Astronomer project directory. Any values in this file will override default settings when you run `astro dev start`.

To add another volume mount for a directory named `custom_dependencies`, for example, add the following to your `docker-compose.override.yml` file:

```
version: "2"
services:
  scheduler:
    volumes:
      - /home/astronomer_project/custom_dependencies:/usr/local/airflow/custom_dependencies:ro
```

Make sure to specify `version: "2"` and mimic the format of the source code file linked above.

When your image builds on `astro dev start`, any changes made within the `custom_dependencies` directory will be picked up automatically, just like with files in your `dags` directory:

```
$ docker exec -it astronomer_project239673_scheduler_1 ls -al
total 76
drwxr-xr-x    1 astro    astro         4096 Dec 30 17:21 .
drwxr-xr-x    1 root     root          4096 Dec 14  2018 ..
-rw-rw-r--    1 root     root            38 Oct  8 00:07 .dockerignore
-rw-rw-r--    1 root     root            31 Oct  8 00:07 .gitignore
-rw-rw-r--    1 root     root            50 Oct  8 00:10 Dockerfile
-rw-r--r--    1 astro    astro        20770 Dec 30 17:21 airflow.cfg
drwxrwxr-x    2 1000     1000          4096 Oct  8 00:07 dags
-rw-r--r--    1 root     root           153 Dec 30 17:21 docker-compose.override.yml
drwxrwxr-x    2 1000     1000          4096 Oct  8 00:07 include
drwxr-xr-x    4 astro    astro         4096 Oct  8 00:11 logs
drwxr-xr-x    2 1000     1000          4096 Dec 30 17:15 custom_dependencies
-rw-rw-r--    1 root     root             0 Oct  8 00:07 packages.txt
drwxrwxr-x    2 1000     1000          4096 Oct  8 00:07 plugins
-rw-rw-r--    1 root     root             0 Oct  8 00:07 requirements.txt
-rw-r--r--    1 astro    astro         2338 Dec 30 17:21 unittests.cfg
```

> **Note:** The Astronomer CLI does not currently support overrides to Environment Variables. For more information on how to set, configure and customize those values, refer to [Environment Variables](environment-variables).

## Add Environment Variables Locally

The Astronomer CLI comes with the ability to bring in Environment Variables from a specified file by running `astro dev start` with an `--env` flag:

```
astro dev start --env .env
```

> **Note:** This feature is limited to local development only. Whatever `.env` you use locally cannot be deployed to Astronomer.
>
> For more detail on how to add Environment Variables both locally and on Astronomer, refer to [Environment Variables](environment-variables).

## Build from a Private GitHub Repository

The following setup describes how to bring in Python Packages stored in a private GitHub repo.

### Prerequisites

- The Astronomer CLI
- An Astronomer project directory
- An [SSH Key](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to your Private GitHub repo

### Step 1: Create a file called Dockerfile.build

1. In your directory, create a file called `Dockerfile.build` that's parallel to your `Dockerfile`.

2. To the first line of that file, add a `FROM` statement that specifies the Runtime image you want to run on Astronomer. This statement should end with `AS stage`.

    If you're running the Astronomer Runtime image for Airflow 2.1.1, for example this would be:

    ```
    FROM quay.io/astronomer/astro-runtime:3.0.1 AS stage
    ```

    > **Note:** Do not include `-onbuild` at the end of your Airflow Image as you typically would in your `Dockerfile`.

3. Immediately below the `FROM` statement, add the following:

    ```
    LABEL maintainer="Astronomer <humans@astronomer.io>"
    ARG BUILD_NUMBER=-1
    LABEL io.astronomer.docker=true
    LABEL io.astronomer.docker.build.number=$BUILD_NUMBER
    LABEL io.astronomer.docker.airflow.onbuild=true
    # Install Python and OS-Level Packages
    COPY packages.txt .
    RUN cat packages.txt | xargs apk add --no-cache

    FROM stage1 AS stage2
    RUN mkdir -p /root/.ssh
    ARG PRIVATE_RSA_KEY=""
    ENV PRIVATE_RSA_KEY=${PRIVATE_RSA_KEY}
    RUN echo "${PRIVATE_RSA_KEY}" >> /root/.ssh/id_rsa
    RUN chmod 600 /root/.ssh/id_rsa
    RUN apk update && apk add openssh-client
    RUN ssh-keyscan -H github.com >> /root/.ssh/known_hosts
    # Install Python Packages
    COPY requirements.txt .
    RUN pip install --no-cache-dir -q -r requirements.txt

    FROM stage1 AS stage3
    # Copy requirements directory
    COPY --from=stage2 /usr/lib/python3.6/site-packages/ /usr/lib/python3.6/site-packages/
    COPY . .
    ```

    These statements bundle your SSH keys, OS-Level packages in `packages.txt`, and Python Packages in `requirements.txt` from your private directory together into a Docker image.

    A few notes on this setup:

    - The `Private RSA Key` is an [SSH Key generated via GitHub](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
    - If you don't want keys in this file to be pushed back up to your GitHub repo, consider adding this file to `.gitignore`

### Step 2: Build your image

Run the following in your terminal:

```
docker build -f Dockerfile.build --build-arg PRIVATE_RSA_KEY="$(cat ~/.ssh/id_rsa)" -t custom-<airflow-image> .
```

If you have `quay.io/astronomer/astro-runtime:3.0.3-base` in your `Dockerfile.build`, for example, this command would be:

```
docker build -f Dockerfile.build --build-arg PRIVATE_RSA_KEY="$(cat ~/.ssh/id_rsa)" -t custom-astro-runtime:3.0.3-base .
```

### Step 3: Replace your Dockerfile

You now need to reference the custom image you just built in your `Dockerfile`. To do so, replace the current contents of your `Dockerfile` with the following:

```
FROM <custom-airflow-image>
```

If you're based your custom image off of `quay.io/astronomer/astro-runtime:3.0.3-base`, for example, this line would read:

```
FROM custom-astro-runtime:3.0.3-base
```

### Step 4: Push your custom image to Astronomer

If you're developing locally, push your changes to your Astronomer project by running `astro dev stop` followed by `astro dev start`.

If you're pushing up to Astronomer, run `astro deploy` or trigger your CI/CD pipeline.

For more detail on deploying to Astronomer, read [Deploy Code](deploy-code).
