---
sidebar_label: 'Deploy Code'
title: 'Deploy Code to Astronomer'
id: 'deploy-code'
---

## Overview

Astronomer Cloud makes it easy for your team to test Airflow DAGs locally and push them to a Deployment in a Production or Development environment.

This guide will walk you through two things:

- How to test DAGs on your local machine with the Astronomer CLI.
- How to deploy DAGs to a Deployment on Astronomer Cloud.

## Prerequisites

To deploy DAGs to Astronomer, you must have:

- The [Astronomer CLI](install-cli) installed in an empty directory.
- An Astronomer Workspace with at least one [Deployment](configure-deployment).
- [Docker](https://www.docker.com/products/docker-desktop) installed.

> **Note:** If you’re running the Astronomer CLI with [buildkit](https://docs.docker.com/develop/develop-images/build_enhancements/) enabled in Docker, you may see an error (`buildkit not supported by daemon`). Learn more in [this forum post](https://forum.astronomer.io/t/buildkit-not-supported-by-daemon-error-command-docker-build-t-airflow-astro-bcb837-airflow-latest-failed-failed-to-execute-cmd-exit-status-1/857).

## Step 1: Initialize an Astronomer Project

In the empty directory in which you installed the Astronomer CLI, run:

```
./astro dev init
```

This will generate the following files in that directory:

    .
    ├── dags # Where your DAGs go
    │   └── example-dag.py # An example DAG that comes with the initialized project
    ├── Dockerfile # For the Astronomer Runtime Docker image, environment variables, and overrides
    ├── include # For any other files you'd like to include
    ├── plugins # For any custom or community Airflow plugins
    ├── airflow_settings.yaml # For your Airflow Connections, Variables and Pools (local only)
    ├── packages.txt # For OS-level packages
    └── requirements.txt # For Python packages

These files make up the Docker image that you'll first push to the Airflow environment on your local machine and then to a Deployment on Astronomer.

### Astronomer Runtime

Your `Dockerfile` will include a reference to Astronomer Runtime. Packaged into a Debian-based Docker image, Astronomer Runtime extends the Apache Airflow open source project to provide you with differentiated functionality that centers around reliability, efficiency, and performance.

The Docker image you'll find in your Dockerfile by default is:

```
FROM quay.io/astronomer/astro-runtime:2.1.1
```

This Docker image is based on [Airflow 2.1.1](https://airflow.apache.org/docs/apache-airflow/stable/changelog.html#airflow-2-1-1-2021-07-02) and is hosted on [Astronomer's Docker Registry](https://quay.io/repository/astronomer/astro-runtime?tab=tags). As we release support for newer versions of Apache Airflow throughout the Private Beta Program, we'll make sure to let you know.

## Step 2: Run Airflow Locally

Once you have the files you need in your project directory, you're ready to start your local Airflow environment.

1. First, run:

   ```
   ./astro dev start
   ```

   This command spins up 3 Docker containers on your machine, each for a different Airflow component:

   - **Postgres:** Airflow's Postgres Metadata Database.
   - **Webserver:** The Airflow component responsible for rendering the Airflow UI.
   - **Scheduler:** The Airflow component responsible for monitoring and triggering tasks.

   You should see the following output:

   ```
   % astro dev start
   Env file ".env" found. Loading...
   Sending build context to Docker daemon  10.75kB
   Step 1/1 : FROM quay.io/astronomer/astro-runtime:2.1.1

   # Executing 5 build triggers
   ---> Using cache
   ---> Using cache
   ---> Using cache
   ---> Using cache
   ---> Using cache
   ---> 5160cfd00623
   Successfully built 5160cfd00623
   Successfully tagged astro-trial_705330/airflow:latest
   INFO[0000] [0/3] [postgres]: Starting
   INFO[0002] [1/3] [postgres]: Started
   INFO[0002] [1/3] [scheduler]: Starting
   INFO[0003] [2/3] [scheduler]: Started
   INFO[0003] [2/3] [webserver]: Starting
   INFO[0004] [3/3] [webserver]: Started
   Airflow Webserver: http://localhost:8080
   Postgres Database: localhost:5432/postgres
   The default credentials are admin:admin
   ```

2. To verify that all 3 Docker containers were created, run:

   ```
   docker ps
   ```

   > **Note**: Running `astro dev start` will start your project with the Airflow Webserver exposed at port 8080 and Postgres exposed at port 5432.
   >
   > If you already have either of those ports allocated, you can either [stop existing docker containers](https://forum.astronomer.io/t/docker-error-in-cli-bind-for-0-0-0-0-5432-failed-port-is-already-allocated/151) or [change the port](https://forum.astronomer.io/t/i-already-have-the-ports-that-the-cli-is-trying-to-use-8080-5432-occupied-can-i-change-the-ports-when-starting-a-project/48).

3. To access the Airflow UI of your local Airflow project,

    - Go to http://localhost:8080/.
    - Log in with `admin` as both your username and password.

   The example DAG in your directory should be populated in the Airflow UI on your local machine.

   ![Example DAG](https://assets2.astronomer.io/main/docs/getting-started/sample_dag.png)

4. To push up changes to any of the files in your project directory, run:
    
    ```
    ./astro dev stop
    ```

    Then, restart the Docker containers by running:

    ```
    ./astro dev start
    ```

    For code-only modifications to your DAG files, just save your changes in your code editor and refresh the Airflow UI in your browser - you don't need to rebuild your image.

    > **Note:** As you develop locally, it may be necessary to reset your Docker containers and metadata database for testing purposes. To do so, run `astro dev kill` instead of `astro dev stop` when rebuilding your image. This will delete all data associated with your local Postgres metadata database, including Airflow Connections, logs, and task history.

## Step 3: Authenticate to Astronomer

Once you've tested your DAGs locally, you're ready to push them to Astronomer. As long as you're a Workspace Admin or Editor, you can push code to any Deployment you have access to. To start, authenticate to Astronomer Cloud by running:

```
./astro auth login astronomer.io
```

If you created your account with a username and password, you'll be prompted to enter them directly in your terminal. If you did so via GitHub or Google OAuth, you'll be prompted to grab a temporary token from https://cloud.astronomer.io/token.

## Step 4: Push DAGs to an Astronomer Deployment

To deploy your DAGs, run:

```
./astro deploy
```

This command returns a list of Airflow Deployments available in your Workspace and prompts you to pick one. Once this command is executed, all files in your Airflow project directory are built into a new Docker image. This includes system-level dependencies, Python-level dependencies, DAGs, and your `Dockerfile`. It does not include any of the metadata associated with your local Airflow environment, including task history and Airflow Connections or Variables that were set locally. This Docker image is then pushed to all containers running the Apache Airflow application on Astronomer Cloud, including Celery Workers.

If a deploy is triggered while a Celery Worker is executing a task and **Worker Termination Grace Period** is set, the Worker will continue to process that task up to the specified number of minutes before restarting itself. By default, the grace period is 10 minutes. For more information, read [Configure a Deployment on Astronomer](configure-deployment).

## Step 5: Validate Your Changes

If it's your first time deploying, expect to wait a few minutes for the Docker image to build. To confirm that your deploy was successful, open your Deployment in the Astronomer UI and click **Open Airflow** to access the Airflow UI.

Once you log in, you should see the DAGs you just deployed.

## What's Next

Now that you're familiar with deploying DAGs to Astronomer Cloud, consider reading:

- [Customize your Image](https://www.astronomer.io/docs/cloud/stable/develop/customize-image)
- [Set Environment Variables](https://www.astronomer.io/docs/cloud/stable/deploy/environment-variables)

These docs live in Astronomer's main documentation page and have not been ported over to Private Beta documentation here, though the functionality described is still applicable.

For up-to-date information about product limitations during the Private Beta Program, read [Known Limitations](known-limitations).

If you have any questions, reach out to us. We're here to help.
