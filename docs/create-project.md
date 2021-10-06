---
sidebar_label: 'Create a Project'
title: 'Create an Astronomer Project'
id: 'Create a Project'
---

import {siteVariables} from '@site/src/versions';

## Overview

Before deploying Airflow pipelines to Astronomer Cloud, you first need to create an Astronomer project on your local machine. An Astronomer project contains all of the code necessary to run your Airflow pipelines, including DAGs, plugins, and packages.

The Astronomer project structure makes it easy to manage and deploy your pipelines to Astronomer Cloud. This guide provides instructions for creating a new Astronomer project, as well as information about the default Astronomer project structure.

## Prerequisites

To create a local Astronomer project, you need:

- [The Astronomer CLI](install-cli)
- [Docker](https://www.docker.com/products/docker-desktop)

## Step 1: Create an Astronomer Project

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

Your `Dockerfile` includes a reference to Astronomer Runtime. Packaged into a Debian-based Docker image, Astronomer Runtime extends the Apache Airflow open source project to provide you with differentiated functionality that centers around reliability, efficiency, and performance. For more information on what's included in Runtime and how it's released, see [Runtime Versioning](runtime-versioning).

By default, the Docker image in your Dockerfile is:

<pre><code parentName="pre">{`FROM quay.io/astronomer/astro-runtime:${siteVariables.runtimeVersion}
`}</code></pre>

## Step 2: Test Your Project Locally

To test your local Astronomer project, run `astro dev start` from your project directory. This command builds your project and spins up 3 Docker containers on your machine to run it.

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

If the project builds successfully, you can access the Airflow UI by going to `http://localhost:8080/` and logging in with `admin` for both your username and password.

After logging in, you should see the DAGs from your `dags` directory in the Airflow UI.

<div class="text--center">
<img src="/img/docs/sample-dag.png" alt="Example DAG in the Airflow UI" />
</div>

Running your project locally is an important step when testing your Astronomer project. For more information on running a local Airflow environment, read [Run a Project Locally](develop-locally#run-a-project-locally).

## Next Steps

After you've successfully run an Astronomer project locally, we recommend reading the following documentation to learn about developing and deploying your project:

- [Develop Locally](develop-locally)
- [Configure a Deployment](configure-deployment)
- [Deploy Code](deploy-code)
