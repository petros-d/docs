---
sidebar_label: 'Configure a Deployment'
title: 'Configure a Deployment'
id: 'configure-deployment'
---

## Overview

An Airflow Deployment on Astronomer is an instance of Apache Airflow that was created either via the Astronomer UI or the Astronomer CLI. Each Airflow Deployment on Astronomer is hosted on a single Astronomer cluster in your cloud, has a dedicated set of resources, and operates with an isolated Postgres Metadata Database.

This guide walks you through the process of creating and configuring an Airflow Deployment on Astronomer.

## Configure a Workspace

Currently, each installation of Astronomer Beta has only one Workspace, which is where you manage Airflow Deployments.

When you first authenticate to Astronomer, you can expect to be invited to a Workspace that our team has created for your Organization. To change the name or description of your Workspace, go to the Workspace's **Settings** tab and edit each value as needed.

## Create a Deployment

To create an Airflow Deployment on Astronomer Cloud:

1. Log in to Astronomer, open your Workspace, and click **New Deployment**.
2. Use the **New Deployment** menu to configure the following:
    - **Name**
    - **Description** (Optional)
    - **Airflow Version**: For Private Beta, Airflow 2.1 is available.
    - **Deployment Location**: The Astronomer cluster where your Deployment will live.

    While Airflow Executor isn't explicitly stated, Worker auto-scaling is enabled and made possible by [Airflow's Celery Executor](https://airflow.apache.org/docs/apache-airflow/stable/executor/celery.html) with [KEDA](https://keda.sh/).

3. Click **Create Deployment** and give the Deployment a few moments to spin up. Within a few seconds, you'll have access to the **Settings** page of your new Deployment:

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b18e9d9-ddd9-430c-8676-e4af1541db63/Screen_Shot_2021-06-08_at_2.44.00_PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b18e9d9-ddd9-430c-8676-e4af1541db63/Screen_Shot_2021-06-08_at_2.44.00_PM.png)

4. To access the Airflow UI for your new Deployment, select **Open Airflow**.

- **Note**: Some of the settings in the Astronomer UI might not be fully functional. For more information, read [Known Limitations].
