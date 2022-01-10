---
sidebar_label: 'Deploy Code'
title: 'Deploy Code to Astronomer'
id: deploy-code
description: Deploy Airflow DAGs to Astronomer Cloud.
---

import {siteVariables} from '@site/src/versions';

## Overview

Astronomer Cloud makes it easy for your team to test Airflow DAGs locally and push them to a Deployment in a Production or Development environment. The following diagram shows how your Astronomer project can be packaged and deployed to Astronomer Cloud via the Astronomer CLI.

![Deploy Code](/img/docs/deploy-architecture.png)

:::info

The process for deploying an Astronomer project via CI/CD varies slightly from this diagram. For more information, refer to [CI/CD: Workflow Overview](ci-cd.md#workflow-overview).

:::

This guide explains how to deploy DAGs to a Deployment on Astronomer Cloud.

## Prerequisites

To deploy DAGs to Astronomer, you must have:

- The [Astronomer CLI](install-cli.md) installed in an empty directory.
- An Astronomer Workspace with at least one [Deployment](configure-deployment.md).
- An [Astronomer project](create-project.md).
- [Docker](https://www.docker.com/products/docker-desktop).

> **Note:** If you’re running the Astronomer CLI with [buildkit](https://docs.docker.com/develop/develop-images/build_enhancements/) enabled in Docker, you may see an error (`buildkit not supported by daemon`). Learn more in [this forum post](https://forum.astronomer.io/t/buildkit-not-supported-by-daemon-error-command-docker-build-t-airflow-astro-bcb837-airflow-latest-failed-failed-to-execute-cmd-exit-status-1/857).

## Step 1: Authenticate to Astronomer

Once you've tested your DAGs locally, you're ready to push them to Astronomer. To start, authenticate to Astronomer Cloud by running:

```
astro auth login
```

If you created your account with a username and password, you'll be prompted to enter them directly in your terminal. If you did so via GitHub or Google OAuth, you'll be prompted to grab a temporary token from https://cloud.astronomer.io/token.

## Step 2: Push DAGs to an Astronomer Deployment

To deploy your DAGs, run:

```
astro deploy
```

This command returns a list of Airflow Deployments available in your Workspace and prompts you to pick one. Once this command is executed, all files in your Airflow project directory are built into a new Docker image and pushed to Astronomer.

## Step 3: Validate Your Changes

If it's your first time deploying, expect to wait a few minutes for the Docker image to build. To confirm that your deploy was successful, open your Deployment in the Astronomer UI and click **Open Airflow** to access the Airflow UI.

Once you log in, you should see the DAGs you just deployed.

## What Happens During a Code Deploy

When you deploy code to Astronomer Cloud, your entire Astronomer project is built into a Docker image. This includes system-level dependencies, Python-level dependencies, DAGs, and your `Dockerfile`. It does not include any of the metadata associated with your local Airflow environment, including task history and Airflow Connections or Variables that were set locally. This Docker image is then pushed to all containers running the Apache Airflow application on Astronomer Cloud, including Celery Workers.

If you are deploying code to a Deployment that is already running code from a previous version of your project, the following happens:

1. Existing workers running your old project continue executing their current tasks.
2. New workers automatically spin up using KEDA to execute code from your new project.
3. Once the workers running your old project finish their current tasks, they are terminated. Workers running your new project are spun up to take their place.

:::info

By default, the maximum amount of time that a worker can run a task is 24 hours. After 24 hours, the worker running your task is automatically terminated to ensure that Astronomer can consistently upgrade and maintain your Airflow infrastructure. A worker running for longer than 24 hours will terminate regardless of its task status or any related code deploys.

If you want to run a task for longer than 24 hours, you must specify an [`execution_timeout`](https://airflow.apache.org/docs/apache-airflow/stable/concepts/tasks.html#timeouts) of more than 24 hours in the code for your task.

:::


## Next Steps

Now that you're familiar with deploying DAGs to Astronomer Cloud, consider reading:

- [Develop Project](develop-project.md)
- [Set Environment Variables](environment-variables.md)

For up-to-date information about product limitations, read [Known Limitations](known-limitations.md).

If you have any questions, reach out to us. We're here to help.
