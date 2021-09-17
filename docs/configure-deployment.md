---
sidebar_label: 'Configure a Deployment'
title: 'Configure a Deployment'
id: 'configure-deployment'
---

## Overview

A Deployment on Astronomer Cloud is an instance of Astronomer Runtime that is powered by Apache Airflow's core components - a metadata database, a Webserver, one or more Schedulers, and one or more Workers. Every Deployment is hosted on a single Astronomer Cluster, has an isolated set of resources, and operates with a dedicated Postgres metadata database.

This guide walks you through the process of creating and configuring an Airflow Deployment.

## Configure a Workspace

When you first sign up for Astronomer Cloud, you can expect to be invited to a Workspace created for your team. Within a Workspace, you can create Deployments and push DAGs to any Deployment from the Astronomer CLI or from a CI/CD process. You're free to invite other users to that Workspace and create as many Deployments as you'd like.

## Create a Deployment

To create an Airflow Deployment on Astronomer Cloud:

1. Log in to the [Astronomer UI](https://cloud.astronomer.io) and go to the **Deployments** tab on the left navigation bar.
2. On the top right-hand side of the Deployments page, click **New Deployment**.
3. Set the following:
    - **Name**
    - **Astronomer Runtime**: For Private Beta, Astronomer Runtime 3.0.2 (based on Airflow 2.1.1) is available.
    - **Description**
    - **Deployment Location**: The Astronomer Cluster in which you want to create this Deployment.

3. Click **Create Deployment** and give it a few moments to spin up. Within a few seconds, you should see the following:

    <div class="text--center">
    <img src="/img/docs/deployment-configuration.png" alt="Astronomer UI Deployment Configuration" />
    </div>

4. To access the Airflow UI, select **Open Airflow** on the top right. This page may take a few minutes to load.

## Configure Resource Settings

Once you've created a Deployment with default resources, you can always configure these settings to best fit your use case. For reference, Astronomer Cloud supports the `AU` as the primary resource unit. In this context,

- 1 AU = 0.1 CPU, .375 GB Memory
- 10 AU = 1 CPU, 3.75 GB Memory

As we progress through the Private Beta Program, this is subject to change. Read below for guidelines on how to configure each resource component.

### Worker Resources

Task execution on Astronomer Cloud is powered by [Airflow's Celery Executor](https://airflow.apache.org/docs/apache-airflow/stable/executor/celery.html) with [KEDA](https://www.astronomer.io/blog/the-keda-autoscaler), which enables Workers to auto-scale between 0 and 10 depending on real-time workload.

For the Private Beta Program, all Celery Workers assume the same resources. If you set Worker Resources to 10 AU, for example, your Deployment may scale up to 3 Celery Workers at any given time using 10 AU each for a total of 30 AU (3 CPU, 11.25 GB Memory). We recommend 10 AU as the default.

The ability to set minimum and/or maximum number of Workers is coming soon.

### Worker Grace Period

Celery Workers are forced to restart upon every change to Environment Variables and every code deploy to your Deployment. This is to make sure that Workers are executing with the most up-to-date code. To minimize disruption to task execution, however, Astronomer supports the ability to set a **Worker Grace Period**.

If a deploy is triggered while a Celery Worker is executing a task and Worker Grace Period is set, the Worker will continue to process that task up to a certain number of minutes before restarting itself. By default, the grace period is 10 minutes.

### Scheduler

The [Airflow Scheduler](https://airflow.apache.org/docs/apache-airflow/stable/concepts/scheduler.html) is responsible for monitoring task execution and triggering downstream tasks once dependencies have been met. By adjusting the **Scheduler Count** slider in the Astronomer UI, you can configure up to 4 Schedulers, each of which will be provisioned with the AU specified in **Scheduler Resources**.

For example, if you set Scheduler Resources to 10 AU and Scheduler Count to 2, your Airflow Deployment will run with 2 Airflow Schedulers using 10 AU each.

If you experience delays in task execution, which you can track via the Gantt Chart view of the Airflow UI, we recommend increasing the AU allocated towards the Scheduler. The default resource allocation is 10 AU.

## Set Environment Variables

Environment Variables can be used to set [Airflow configurations](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html) and custom values, both of which can be applied to your Deployment. For example, you can configure Airflow Parallelism or a secrets backend to manage Airflow Connections.

To set Environment Variables, add them to the corresponding section of the Astronomer UI or in your project's `Dockerfile`. If you're developing locally, they can also be added to a local `.env` file.

For more information on configuring Environment Variables, read [Environment Variables on Astronomer](https://www.astronomer.io/docs/cloud/stable/deploy/environment-variables).
