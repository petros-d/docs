---
sidebar_label: 'Deployment Metrics'
title: 'Deployment Metrics'
id: deployment-metrics
---

## Overview

The Astronomer Cloud UI shows 4 high-level metrics for each Deployment in your Workspace over the last 24 hours. These metrics can be viewed from both the **Deployments** menu and individual Deployment pages. They include:

- DAG Runs
- Task Instances
- Worker CPU
- Worker Memory

<div class="text--center">
  <img src="/img/docs/deployment-metrics.png" alt="Metrics dashboard in the Cloud UI" />
</div>

Metrics are recorded and updated at the start of each hour, which is displayed in both UTC and your local browser timezone. Each bar across all graphs covers a complete hour while the entire time window for a single graph is 24 hours. For example, a single bar might represent `16:00` to `17:00` while the entire time window of the graph might represent `Nov 1 16:00` to `Nov 2 16:00`.

These metrics serve as high-level reports that are intended to be viewed at a glance. For example, you might notice failed task instances in the Astronomer Cloud UI and then open the Airflow UI to troubleshoot.

The following sections describe each of the 4 available metrics from left to right.

## Deployment Performance

The first and second Deployment metrics in the Astronomer UI give you visibility into the performance of your Deployment as measured by successes and failures of both DAG runs and task instances.

### DAG Runs

The first Deployment metric records successful and failed DAG runs over hour-long intervals. A [DAG run](https://airflow.apache.org/docs/apache-airflow/stable/dag-run.html) is defined as an instantiation of a DAG at a specific point in time.

You can hover over each bar to see the corresponding hour interval displayed in both UTC and your local timezone. Below that, you can see the number of successful DAG runs and the number of failed DAG runs. If a bar is partially or fully red, it means that one or more DAG runs failed within that hour interval.

The bolded value above the graph denotes the total number of DAG runs that have been executed in the last 24 hours.

:::caution

The DAG runs metric does not record DAG run timeouts as failed runs. To see timed out DAG runs, you must go into the Airflow UI to check on the statuses of each DAG run there.

:::

### Task Instances

The second Deployment metric records successful and failed task instances over hour-long intervals. A [task instance](https://airflow.apache.org/docs/apache-airflow/stable/concepts/tasks.html#task-instances) is defined as an instantiation of a task at a specific point in time.

You can hover over each bar to see the corresponding hour interval displayed in both UTC and your local timezone. Below that, you can see the number of successful and failed task instances. If a bar is partially or fully red, it means that one or more task instances failed within that hour interval.

The bolded value above the graph denotes the total number of tasks that have run in the last 24 hours.

## Resource Usage

The third and fourth Deployment metrics in the Astronomer UI provide visibility into the resources being consumed by the Workers in your Deployment as measured by CPU and memory consumption.

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