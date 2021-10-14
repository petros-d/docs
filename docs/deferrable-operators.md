---
sidebar_label: 'Deferrable Operators'
title: 'Deferrable Operators'
id: 'deferrable-operators'
---

## Overview

Apache Airflow 2.2 introduces the concept of [deferring](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=177050929), which is a powerful new framework for executing tasks. This framework is implemented through Deferrable Operators, which are a new type of Airflow Operator that promises improved performance and lower resource costs compared to standard Operators.

While standard Operators and sensors take up a Worker or Scheduler slot when they are waiting for an external condition to be met, Deferrable Operators suspend themselves and free up that slot when in a deferred state. This results in a significant performance improvement for tasks using operators or sensors that spend a long time in a deferred state, such as the `S3Sensor`, the `HTTPSensor`, and the `DatabricksSubmitRunOperator`.

Deferred tasks using these Operators run on a new, highly-available Triggerer component within Airflow. This means that Deferrable Operators waiting in a deferred phase are also highly-available, which makes it easy to recover from multi-machine outages.

On Astronomer Cloud, Triggerers are automatically managed by Astronomer Cloud, meaning you can start using Deferrable Operators in your DAGs without additional implementation steps. Additionally, you have access to several deferrable versions of open source operators that are available only on Astronomer.

This guide explains how Deferrable Operators work, how to implement Deferrable Operators in your DAGs, and how Astronomer's own Deferrable Operators differ from their non-deferrable counterparts.

### How It Works

Airflow 2.2 introduces a new concept called a Trigger. A Trigger is a small, asynchronous Python function that quickly and continuously evaluates a given condition. In order for an Operator to be deferrable, it must have its own Trigger code that determines when and how the Operator is deferred.

Because of this, thousands of Triggers can be run in a single process, resulting in significant efficiency improvements over running sensors and Operators in a single process each.

Deferrable Operators are simply Operators that are designed around a companion Trigger. The process for running a task using a Deferrable Operator is as follows:

1. The task is picked up by a Worker slot to execute an initial piece of code to initialize the task. During this time, it will be in a "running" state.
2. The task defines a Trigger and defers some condition checking work to the Triggerer. Because all of the deferring work happens in the Triggerer, the task instance can now enter a "deferred" state. This frees the Worker slot to take on other tasks.
3. The Triggerer runs the task's Trigger periodically to evaluate whether the condition is met.
4. Once the Trigger condition succeeds, the Task is again queued by the Scheduler. This time, when the task is picked up by a Worker, it begins to complete its main function.

A new Airflow component called the Triggerer takes care of running Triggers and signaling tasks to resume when their conditions have been met. Like the Scheduler, it is designed to be highly-available: If a machine running Triggers shuts down unexpectedly, the Triggers can be recovered and moved to any warm-standby machine also running a Triggerer.

To learn more about deferring and implementation details, read the Apache Airflow [Deferring documentation](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html).

## Prerequisites

To use Runtime's Deferrable Operators, you must first install the `astronomer-operator-wrappers` package. To do so, add the package to the `packages.txt` file of your Astronomer project. You also need to upgrade to [Astronomer Runtime 4.0.0](release-notes#astronomer-runtime-4-0-0) as described in [Upgrade Runtime](upgrade-runtime).

Note that these Operators are available only in commercial Astronomer environments, such as Astronomer Cloud. The package is designed to fall back to the non-deferrable options in other environments, but the deferrable portions work only on Astronomer.

## Using Deferrable Operators

Deferrable Operators are drop-in replacements for their traditional Operator counterparts. To use a deferrable version of an existing Operator in your DAG, you simply need to import the Deferrable Operator. For example, to use Astronomer's deferrable `ExternalTaskSensor`, you only need to remove your existing `import` and replace it:

```python
# Remove this import:
# from airflow.operators.sensors import ExternalTaskSensor
# Replace with:
from astronomer.operators import ExternalTaskSensor
```

After you import the Deferrable `ExternalTaskSensor`, any instance of an `ExternalTaskSensor` in your DAG becomes deferrable.

Some additional notes about using Deferrable Operators:

- Currently, not all Operators have a deferrable version. There are a few open source Deferrable Operators, plus additional Operators designed and maintained by Astronomer.
- You can write your own Deferrable Operators and Triggers for custom API or service usage. Astronomer is happy to help customers with this process.

## Astronomer's Deferrable Operators

Astronomer Runtime includes a collection of Deferrable Operators available exclusively to Astronomer Cloud users. These are drop-in replacements for non-Deferrable Operators, meaning you only have to change the import statements in your DAGs to begin using them.

This section contains information on each available Deferrable Operator, including example import statements. If there are any differences between a Deferrable Operator and its non-deferrable counterpart, those changes are listed in a Notes section.

### Databricks Operators

We provide deferrable versions of both the `DatabricksSubmitRunOperator` and the `DatabricksRunNowOperator`. These Operators wait in a deferred state while waiting for their respective Databricks jobs to complete.

### Import statement

```python
from astronomer.operators import DatabricksSubmitRunOperator, DatabricksRunNowOperator
```

### ExternalTaskSensor

This is a drop-in replacement for Airflow's [`ExternalTaskSensor`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/external_task/index.html#module-airflow.sensors.external_task). It defers itself while waiting for a given Task or DAG to complete.

> **Note:** There is a difference between the deferrable ExternalTaskSensor and the non-deferrable ExternalTaskSensor: If there are multiple matching Tasks or DAGs and any of them have failed, the deferrable sensor also fails, whereas the non-deferrable sensor freezes indefinitely.

### Import statement

```python
from astronomer.operators import ExternalTaskSensor
```
