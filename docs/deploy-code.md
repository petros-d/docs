---
sidebar_position: 3
sidebar_label: 'Deploy Code'
id: deploy-code
---

# Deploy Code to Astronomer Cloud

## Overview

This guide provides the setup steps for deploying DAGs to Astronomer Cloud using the Astronomer CLI.

## Prerequisites

In order to push up DAGs to a Deployment on Astronomer Cloud, you must have:

- An Astronomer [Workspace](https://www.astronomer.io/docs/enterprise/v0.25/deploy/manage-workspaces) with at least one active [Airflow Deployment](https://www.astronomer.io/docs/enterprise/v0.25/deploy/configure-deployment).
- An empty directory on your local machine.

## Step 1: Authenticate to Astronomer

To authenticate via the Astronomer CLI, run:

```
/path/to/executable/astro auth login astronomer.io
```

## Step 2: Confirm Your Workspace and Deployment

From the Astronomer CLI, you're free to push code to any Airflow Deployment you have access to as long as you have the appropriate deployment-level permissions to do so. For more information on both Workspace and Deployment-level permissions on Astronomer, refer to [User Permissions](https://www.astronomer.io/docs/enterprise/v0.25/manage-astronomer/workspace-permissions).

Before you deploy to Astronomer, make sure that the Airflow Deployment you'd like to deploy to is within the Workspace you're operating in.

To see the list of Workspaces you have access to, run:

```
/path/to/executable/astro workspace list
```

To switch between Workspaces, run:

```
/path/to/executable/astro workspace switch
```

To see the list of Deployments within a particular Workspace, run:

```
/path/to/executable/astro deployment list
```

For more specific CLI guidelines and commands, read [CLI Quickstart](https://www.notion.so/docs/enterprise/v0.25/develop/cli-quickstart/).

## Step 3: Deploy to Astronomer

Finally, make sure you're in the correct Airflow project directory.

When you're ready to deploy your DAGs, run:

```
/path/to/executable/astro deploy
```

- If you are testing this feature but don't have any DAGs to deploy, run `astro dev init` to create a sample Airflow project in your directory.

This command returns a list of Airflow Deployments available in your Workspace and prompts you to pick one. Once this command is executed, all files in your Airflow project directory are built into a new Docker image and Docker containers for all Airflow components are restarted.

## Step 4: Validate Your Changes

If it's your first time deploying, expect to wait a few minutes for the Docker Image to build.

To confirm that your deploy was successful, open to your Deployment in the Astronomer UI and click **Open Airflow** to access the Airflow UI.

Log in to Airflow with the default credentials of `admin/admin`. Once you log in, you should see the DAGs you just deployed.

### What gets deployed?

Everything in the project directory where you ran `$ astro dev init` is bundled into a Docker image and deployed to your Airflow Deployment on your Astronomer platform. This includes system-level dependencies, Python-level dependencies, DAGs, and your `Dockerfile`.

Astronomer exclusively deploys the code in your project and does not push any of the metadata associated with your local Airflow environment, including task history and Airflow Connections or variables set locally in the Airflow UI.

For more information about what gets built into your image, read [Customize your Image](https://www.notion.so/docs/enterprise/v0.25/develop/customize-image/).
