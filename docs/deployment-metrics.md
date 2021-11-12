---
sidebar_label: 'Deployment Metrics'
title: 'Deployment Metrics'
id: deployment-metrics
---

## Overview

The Astronomer Cloud UI shows high level metrics for each Deployment in your Workspace over the past 24 hours. These metrics can be viewed from both the **Deployments** menu and individual Deployment pages.

This guide provides information about each available Deployment metric in Astronomer Cloud.

## Deployment Performance

You can view metrics related to a Deployment's performance directly in the Astronomer Cloud UI. Metrics are recorded and updated at the start of each hour, shown in both UTC and your local browser timezone. Each bar in all graphs covers a complete hour. For example, `16:00` to `17:00`.

<div class="text--center">
  <img src="/img/docs/deployment-metrics.png" alt="Metrics dashboard in the Cloud UI" />
</div>

These metrics serve as high-level reports on Deployment performance to be viewed at a glance. For example, you might notice failed task instances in the Astronomer Cloud UI and then open the Airflow UI to troubleshoot.

The following sections describe each of these metrics from left to right.

### DAG Runs

The first Deployment metric records successful and failed DAG runs over hour-long intervals. A [DAG run](https://airflow.apache.org/docs/apache-airflow/stable/dag-run.html) is defined as an instantiation of a DAG at a specific point in time.

You can hover over each bar to see the corresponding hour interval displayed in both UTC and your local timezone. Below that, you can see the number of successful DAG runs and the number of failed DAG runs. If a bar is partially or fully red, it means that one or more DAG runs failed within that hour interval.

The bolded value above the graph denotes the total number of DAGs that the metric is checking. The metric checks only unpaused DAGs for DAG runs, so this number might be less than the total number of DAGs in your Deployment.

::: caution

The DAG runs metric does not record DAG run timeouts as failed runs. To see timed out DAG runs, you must go into the Airflow UI to check on the statuses of each DAG run there.

:::

### Task Instances

The second Deployment metric records successful and failed task instances over hour-long intervals. A [task instance](https://airflow.apache.org/docs/apache-airflow/stable/concepts/tasks.html#task-instances) is defined as an instantiation of a task at a specific point in time.

You can hover over each bar to see the corresponding hour interval displayed in both UTC and your local timezone. Below that, you can see the number of successful and failed task instances. If a bar is partially or fully red, it means that one or more task instances failed within that hour interval.

The bolded value above the graph denotes the total number of tasks that the metric is checking. The metric checks only unpaused DAGs for task instances, so this number might be less than the total number of tasks in your Deployment.

## Resource Usage

The third and fourth Deployment metrics in the Astronomer UI provide visibility into the resources being consumed by the Celery Workers in your Deployment. The third is specific to worker CPU, and the fourth is specific to worker memory.

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