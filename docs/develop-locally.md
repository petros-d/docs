---
sidebar_label: 'Develop Locally'
title: 'Run Airflow Locally Using the Astronomer CLI'
id: 'develop-locally'
---

import {siteVariables} from '@site/src/versions';

## Overview

The Astronomer CLI is the easiest way to run Apache Airflow on your machine. From the CLI, you can create a local Apache Airflow environment with a dedicated Webserver, Scheduler and Postgres Database.

You might want to run Airflow locally to test DAGs before pushing them to an Astronomer Deployment. The Astronomer CLI includes all of the tools you need to write, run, and monitor DAGs on your local machine. As you work with Apache Airflow on Astronomer, use this guide to:

- Test your Astronomer project locally.
- Access logs for your locally running Airflow components.
- Access a local instance of the Airflow UI.
- Run Airflow CLI Commands.

### Prerequisites

To run Airflow locally via the CLI, you need:

- [The Astronomer CLI](install-cli)
- [Docker](https://www.docker.com/products/docker-desktop)

## Initializing an Airflow Project

To create a new Astronomer project folder, open an empty directory and run `astro dev init`. This command generates the following files in the directory:

```
.
├── dags # Where your DAGs go
│   └── example-dag.py # An example DAG that comes with the initialized project
├── Dockerfile # For the Astronomer Runtime Docker image, environment variables, and overrides
├── include # For any other files you'd like to include
├── plugins # For any custom or community Airflow plugins
├── airflow_settings.yaml # For your Airflow Connections, Variables and Pools (local only)
├── packages.txt # For OS-level packages
└── requirements.txt # For Python packages
```

These files make up the Docker image that runs in your local Airflow environment.

### Astronomer Runtime

Your `Dockerfile` includes a reference to Astronomer Runtime. Packaged into a Debian-based Docker image, Astronomer Runtime extends the Apache Airflow open source project to provide you with differentiated functionality that centers around reliability, efficiency, and performance.

The Docker image you'll find in your Dockerfile by default is:

<pre><code parentName="pre">{`FROM quay.io/astronomer/astro-runtime:${siteVariables.runtimeVersion}
`}</code></pre>

## Running Airflow Locally

To start a local Astronomer project, run `astro dev start` from your project directory. This command builds your project and spins up 3 Docker containers on your machine, each for a different Airflow component:

- **Postgres:** Airflow's metadata database
- **Webserver:** The Airflow component responsible for rendering the Airflow UI
- **Scheduler:** The Airflow component responsible for monitoring and triggering tasks

After running the command, you should see the following output:

<pre><code parentName="pre">{`% astro dev start
Env file ".env" found. Loading...
Sending build context to Docker daemon  10.75kB
Step 1/1 : FROM quay.io/astronomer/astro-runtime:${siteVariables.runtimeVersion}

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
`}</code></pre>

If the project builds successfully, you can access the Airflow UI by going to `http://localhost:8080/` and logging in with `admin` for both your username and password. You can also access your Postgres database at `localhost:5432/postgres`.

After logging in, you should see the DAGs from your `dags` directory in the Airflow UI.

<div class="text--center">
<img src="/img/docs/sample-dag.png" alt="Example DAG in the Airflow UI" />
</div>

## Updating an Astronomer Project

If you're making a change to your Astronomer project, you might have to update your local Airflow environment to run your changes locally.

### DAG Code Changes

All changes made to the following files will be picked up as soon as they're saved to your code editor:

- `dags`
- `plugins`
- `include`

Once you save your changes, refresh the Airflow Webserver in your browser to see them render.

### Other Changes

All changes made to the following files require rebuilding your image:

- `packages.txt`
- `Dockerfile`
- `requirements.txt`
- `airflow_settings.yaml`

To rebuild your image after making a change to any of these files, `astro dev stop` followed by `astro dev start`. In addition to rebuilding your image, these commands restart the Docker containers running your local Airflow environment.

> **Note:** Note: As you develop locally, it may be necessary to reset your Docker containers and metadata DB for testing purposes. To do so, run astro dev kill instead of astro dev stop when rebuilding your image. This deletes all data associated with your local Postgres metadata database, including Airflow Connections, logs, and task history.

## Accessing Airflow Logs

To show logs for the Scheduler or Webserver in a locally running Astronomer project, run `astro dev logs`. Once you run this command, the most recent logs for these components appear in your terminal window.

To continue monitoring logs, run `astro dev logs --follow`. The `--follow` flag ensures that the latest logs continue to appear in your terminal window.

## Running Airflow CLI Commands

To run [Apache Airflow CLI](https://airflow.apache.org/docs/apache-airflow/stable/cli-and-env-variables-ref.html) commands in your project, run `astro dev run` followed by an Airflow command.

For example, the Apache Airflow command for viewing your entire configuration is `airflow config list`. To run this command with the Astronomer CLI, you would run `astro dev run config list` instead.

## What's Next

After you've successfully run an Astronomer project locally, we recommend reading the following documentation to learn about deploying your project to Astronomer:

- [Configure a Deployment](configure-deployment)
- [Deploy Code](deploy-code)
