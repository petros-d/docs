---
sidebar_label: 'Deployment Metrics'
title: 'Deployment Metrics'
id: deployment-metrics
---

## Overview

The Astronomer Cloud UI shows high level metrics for each Deployment in your Workspace. These metrics can be viewed from both the **Deployments** menu and individual Deployment pages.

This guide provides information about each available Deployment metric in Astronomer Cloud.

## Deployment Performance

You can view metrics related to a Deployment's performance directly in the Astronomer Cloud UI. Metrics are recorded and updated at the start of each hour in UTC.

<div class="text--center">
  <img src="/img/docs/deployment-metrics.png" alt="Metrics dashboard in the Cloud UI" />
</div>

These metrics serve as high level reports on Deployment performance to be viewed at a glance. For example, you might notice failed task runs in the Astronomer Cloud UI and then open the Airflow UI to troubleshoot.

The following sections describe each of these metrics from left to right.

### DAG Runs

The first Deployment metric records successful and failed DAG runs over hour-long intervals. A [DAG run](https://airflow.apache.org/docs/apache-airflow/stable/dag-run.html) is defined as an instantiation of a DAG in time.

Each bar in the graph covers a complete hour in UTC. If a bar is partially or fully red, it means that one or multiple DAG runs failed within that hour interval.

You can hover over each bar to see the specific hour interval, the number of successful DAG runs, and the number of failed DAG runs.

The bolded value denotes the total number of DAGs that the metric is checking. The metric checks only unpaused DAGs for DAG runs, so this number might be less than the total number of DAGs in your Deployment.

::: caution

The DAG runs metric does not record DAG run timeouts as failed runs. To see timed out DAG runs, you must go into the Airflow UI to check on the statuses of each DAG run there.

:::

### Task Runs

The second Deployment metric records successful and failed task runs over hour-long intervals. Each bar in the graph covers a complete hour in UTC (for example, `16:00 to 17:00`). If a bar is partially or fully red, it means that one or multiple task runs failed within that hour interval.

You can hover over each bar to see the specific hour interval, the number of successful task runs, and the number of failed task runs.

The bolded value denotes the total number of tasks that the metric is checking. The metric checks only unpaused DAGs for task runs, so this number might be less than the total number of tasks in your Deployment.

### Worker CPU

The third Deployment metric records the peak CPU usage by worker nodes over hour-long intervals. Each bar in the graph shows how much CPU was being used across workers at the height of their usage for a given hour in UTC.

This value is measured as a percentage of the maximum allowed CPU usage for a Deployment. The number of Celery workers per Deployment auto-scales based on worker concurrency, which means that the maximum allowed CPU for a single Deployment may change at any given time.

You can hover over each bar to see the specific hour interval and the specific percentage of maximum CPU that was used during peak usage.

The value above the graph shows the peak CPU usage over the last 24 hours.

### Worker Memory

The third Deployment metric records the peak memory usage by worker nodes over hour-long intervals. Each bar in the graph shows how much memory workers were using at the height of their usage for a given hour in UTC. This value is measured as a percentage of the maximum allowed memory usage for a Deployment.

You can hover over each bar to see the specific hour interval and the specific percentage of maximum memory that was used during peak usage.

The value above the graph shows the memory usage over the last 24 hours.
