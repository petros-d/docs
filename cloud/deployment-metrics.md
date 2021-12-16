---
sidebar_label: 'Deployment Metrics'
title: 'Deployment Metrics'
id: deployment-metrics
description: Monitor Deployment performance, health, and total task volume in the Astronomer UI.
---

## Overview

The Astronomer Cloud UI shows 4 high-level charts for each Deployment in your Workspace over the last 24 hours. These charts can be viewed from both the **Deployments** menu and individual Deployment pages. They include:

- DAG Runs
- Task Instances
- Worker CPU
- Worker Memory

<div class="text--center">
  <img src="/img/docs/deployment-metrics.png" alt="Metrics dashboard in the Cloud UI" />
</div>

The data in these 4 graphs is recorded hourly and is displayed in both UTC and your local browser timezone. Each bar across all graphs covers a complete hour while the entire time window for a single graph is 24 hours. For example, a single bar might represent `16:00` to `17:00` while the entire time window of the graph might represent `Nov 1 16:00` to `Nov 2 16:00`.

The data for the most recent hour will be for the hour to date. For example, if you are looking at this page at 16:30, then the bar for the `16:00-17:00` hour interval would show data for `16:00-16:30`.

These charts serve as high-level reports that are intended to be viewed at a glance. For example, you might notice failed task instances in the Astronomer Cloud UI and then open the Airflow UI to troubleshoot.

The following sections describe each of the 4 available charts from left to right.

## Deployment Performance

The **DAG** and **Tasks** charts in the Astronomer UI give you visibility into the performance of your Deployment as measured by successes and failures of both DAG runs and task instances.

### DAG Runs

The first Deployment metric records successful and failed DAG runs over hour-long intervals. A [DAG run](https://airflow.apache.org/docs/apache-airflow/stable/dag-run.html) is defined as an instantiation of a DAG at a specific point in time.

You can hover over each bar to see the corresponding hour interval displayed in both UTC and your local timezone. Below that, you can see the number of successful DAG runs and the number of failed DAG runs. If a bar is partially or fully red, it means that one or more DAG runs failed within that hour interval.

The bolded value above the graph denotes the total number of DAG runs that have been executed in the last 24 hours.

:::caution

The DAG runs metric does not record DAG run timeouts as failed runs. To see timed out DAG runs, you must go into the Airflow UI to check on the statuses of each DAG run there.

:::

### Task Instances

The **Tasks** chart records successful and failed task instances over hour-long intervals. A [task instance](https://airflow.apache.org/docs/apache-airflow/stable/concepts/tasks.html#task-instances) is defined as an instantiation of a task at a specific point in time.

You can hover over each bar to see the corresponding hour interval displayed in both UTC and your local timezone. Below that, you can see the number of successful and failed task instances. If a bar is partially or fully red, it means that one or more task instances failed within that hour interval.

The bolded value above the graph denotes the total number of tasks that have run in the last 24 hours.

## Resource Usage

The **Worker CPU** and **Worker Memory** charts in the Astronomer UI provide visibility into the resources being consumed by the Workers in your Deployment as measured by CPU and memory consumption.

:::info

The number of Celery workers per Deployment autoscales based on a combination of worker concurrency and the number of `running` and `queued` tasks, which means that the total available CPU and memory for a single Deployment may change at any given time.

:::

### Worker CPU

**Worker CPU** records the peak CPU usage by worker nodes over hour-long intervals.

Each bar in the graph shows how much CPU was being used by a single worker at the height of its usage for a given hour. This value is measured as a percentage of the total available CPU usage per worker as defined in **Worker Resources**. Hovering over a single bar in the graph can help you answer, "Did any of my workers approach 100% usage of total available CPU during this specific hour interval?"

The bolded value above the graph shows maximum CPU usage by a single worker at any point in time over the last 24 hours. This can help you answer, "Did any of my workers approach 100% usage of total available CPU in the past 24 hours?"

### Worker Memory

**Worker Memory** records the peak memory usage by worker nodes over hour-long intervals.

Each bar in the graph shows how much memory was being used by a single worker at the height of its usage for a given hour. This value is measured as a percentage of the total available memory usage per worker as defined in **Worker Resources**. Hovering over a single bar in the graph can help you answer, "Did any of my workers approach 100% usage of total available memory during this specific hour interval?"

The bolded value above the graph shows the maximum memory usage by a single worker at any point in time over the last 24 hours. This can help you answer, "Did any of my workers approach 100% usage of total available memory in the past 24 hours?"
<<<<<<< HEAD:cloud/deployment-metrics.md
=======

## Usage

Use the **Usage** tab in the Astronomer Cloud UI to review the number of successful task runs across Deployments in your Organization. Astronomer Cloud is priced based on successful task runs, so this view can help you monitor both Astronomer cost as well as Airflow usage in aggregate.

![Usage tab in the Astronomer UI](/img/docs/usage.png)

The bar chart on the left shows your Organization's total task runs per day for the past 31 days, with each day's volume sorted by Deployment. Each color in the bar chart represents a different Deployment. To see each Deployment's number of successful task runs for a given day, you can hover over the bar chart for that day with your mouse.

The legend on the right side of the menu shows the colors used for each Deployment. This legend shows each Deployment's total sum of successful task runs over the last 31 days. The daily numbers on the left bar chart add up to the monthly total per Deployment on the right.
>>>>>>> 250ebdcc7465130f0c4bbb61bbb3cfb533a87374:docs/deployment-metrics.md
