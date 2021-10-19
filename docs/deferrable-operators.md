---
sidebar_label: 'Deferrable Operators'
title: 'Deferrable Operators'
id: 'deferrable-operators'
---

## Overview

[Apache Airflow 2.2](https://airflow.apache.org/blog/airflow-2.2.0/) introduces [Deferrable Operators](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html), a powerful type of Airflow Operator that promises lower resource costs and improved performance.

In Airflow, it's common to use [Sensors](https://airflow.apache.org/docs/apache-airflow/stable/concepts/sensors.html) and some [Operators](https://airflow.apache.org/docs/apache-airflow/stable/concepts/operators.html) to configure tasks that wait for some external condition to be met before executing or triggering another task. While tasks using standard Operators and Sensors take up a Worker or Scheduler slot when checking if an external condition has been met, Deferrable Operators suspend themselves during that process. This releases the Worker to take on other tasks. Using the Deferrable versions of Operators or Sensors that typically spend a long time waiting for a condition to be met, such as the `S3Sensor`, the `HTTPSensor`, or the `DatabricksSubmitRunOperator`, can result in significant per-task cost savings and performance improvements.

Deferrable Operators rely on a new Airflow component called the Triggerer. The Triggerer is highly available and entirely managed on Astronomer Cloud, meaning that you can start using Deferrable Operators in your DAGs as long as you're running Astronomer Runtime 4.0+. As an Astronomer customer, you additionally have exclusive access to several deferrable versions of open source Operators.

This guide explains how Deferrable Operators work and how to implement them in your DAGs.

### How It Works

Airflow 2.2 introduces two new concepts to support Deferrable Operators: the Trigger and the Triggerer.

A **Trigger** is a small, asynchronous Python function that quickly and continuously evaluates a given condition. Because of its design, thousands of Triggers can be run at once in a single process. In order for an Operator to be deferrable, it must have its own Trigger code that determines when and how Operator tasks are deferred.

The **Triggerer** is responsible for running Triggers and signaling tasks to resume when their conditions have been met. Like the Scheduler, it is designed to be highly-available. If a machine running Triggers shuts down unexpectedly, Triggers can be recovered and moved to another machine also running a Triggerer.

The process for running a task using a Deferrable Operator is as follows:

1. The task is picked up by a Worker, which executes an initial piece of code that initializes the task. During this time, the task is in a "running" state and takes up a Worker slot.
2. The task defines a Trigger and defers the function of checking on some condition to the Triggerer. Because all of the deferring work happens in the Triggerer, the task instance can now enter a "deferred" state. This frees the Worker slot to take on other tasks.
3. The Triggerer runs the task's Trigger periodically to check whether the condition has been met.
4. Once the Trigger condition succeeds, the task is again queued by the Scheduler. This time, when the task is picked up by a Worker, it begins to complete its main function.

For implementation details on Deferrable Operators, read the [Apache Airflow documentation](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html).

## Prerequisites

To use Deferrable Operators on Astronomer Cloud, you must first upgrade to [Astronomer Runtime 4.0+](release-notes#astronomer-runtime-4-0-0) as described in [Upgrade Runtime](upgrade-runtime).

To use Deferrable Operators available exclusively on Astronomer Runtime, you must additionally add the `astronomer-operator-wrappers` package to the `packages.txt` file of your Astronomer project.

## Using Deferrable Operators

To use a deferrable version of an existing Operator in your DAG, you only need to replace the import statement for the existing Operator.

For example, Airflow's `TimeSensorAsync` is a replacement of the non-deferrable `TimeSensor` ([source](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/time_sensor/index.html?highlight=timesensor#module-contents)). To use `TimeSensorAsync`, remove your existing `import` and replace it with the following:

```python
# Remove this import:
# from airflow.operators.sensors import ExternalTaskSensor
# Replace with:
from airflow.sensors.time_sensor import TimeSensorAsync as TimeSensor
```

Some additional notes about using Deferrable Operators:

- For open source Operators, we recommend importing the Deferrable Operator class as its non-deferrable class name. If you don't include this part of the import statement, you need to replace all instances of non-deferrable Operators in your DAGs. In the above example, that would require replacing all instances of `TimeSensor` with `TimeSensorAsync`.
- Currently, not all Operators have a deferrable version. There are a few open source Deferrable Operators, plus additional Operators designed and maintained by Astronomer.
- If you're interested in the deferrable version of an Operator that is not generally available, you can write your own and contribute these to the open source project. If you need help with writing a custom Deferrable Operator, reach out to your Astronomer representative.
- There are some use cases where it can be more appropriate to use a traditional Sensor instead of a Deferrable Operator. For example, if your task needs to wait only a few seconds for a condition to be met, we recommend using a Sensor in [`reschedule`](https://github.com/apache/airflow/blob/1.10.2/airflow/sensors/base_sensor_operator.py#L46-L56] mode to avoid unnecessary resource overhead.

## Astronomer's Deferrable Operators

Astronomer maintains a collection of Deferrable Operators that are available exclusively on Astronomer Runtime. These Operators are drop-in replacements for non-Deferrable Operators, meaning that you only have to change the import statements in your DAGs to begin using them.

This section contains information and example import statements for all Deferrable Operators written by Astronomer.

> **Note:** When you use Deferrable Operators in the `astronomer-operator-wrappers` package outside of an Astronomer Runtime environment, the package falls back to using the open source, non-deferrable versions of each Operator.

### Databricks Operators

Astronomer Runtime includes the following Databricks Operators:

- `DatabricksSubmitRunOperator`
- `DatabricksRunNowOperator`

Tasks using these Operators remain in a deferred state while waiting for their respective Databricks job to complete.

#### Import statement

To run Astronomer's Databricks Operators, use the following import statement:

```python
from astronomer.operators import DatabricksSubmitRunOperator, DatabricksRunNowOperator
```

### ExternalTaskSensor

This is a drop-in replacement for Airflow's [`ExternalTaskSensor`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/external_task/index.html#module-airflow.sensors.external_task). It defers itself while waiting for a given task or DAG to complete.

> **Note:** There is a difference between the deferrable ExternalTaskSensor and the non-deferrable ExternalTaskSensor. If the Sensor is checking a task or DAG that fails, the deferrable Sensor also fails, whereas the non-deferrable Sensor freezes indefinitely.

#### Import statement

To run Astronomer's deferrable version of the ExternalTaskSensor, use the following import statement:

```python
from astronomer.operators import ExternalTaskSensor
```
