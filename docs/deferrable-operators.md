---
sidebar_label: 'Deferrable Operators'
title: 'Deferrable Operators'
id: 'deferrable-operators'
---

## Overview

Introduced in [Apache Airflow 2.2](https://airflow.apache.org/blog/airflow-2.2.0/), Deferrable Operators are a powerful type of Airflow Operator that you can use to improve the performance of your Deployments and lower your resource costs.

Tasks using standard Operators and sensors take up a Worker or Scheduler slot when checking if an external condition has been met. In comparison, Deferrable Operators suspend themselves and don't take up a Worker or Scheduler slot when they are in a deferred state or checking if a condition has been met. Using the Deferrable versions of Operators or Sensors that typically spend a long time waiting for a condition to be met, such as the `S3Sensor`, the `HTTPSensor`, or the `DatabricksSubmitRunOperator`, can result in significant per-task cost savings and performance improvements.

Deferrable Operators rely on a new, highly-available Airflow component called the Triggerer. The Triggerer is entirely managed on Astronomer Cloud, meaning that you can start using Deferrable Operators in your DAGs as long as you're running Astronomer Runtime 4.0+. As an Astronomer customer, you additionally have exclusive access to several deferrable versions of open source Operators.

This guide explains how Deferrable Operators work and how to implement them in your DAGs.

### How It Works

Airflow 2.2 introduces two new concepts to support Deferrable Operators: the Trigger and the Triggerer.

A **Trigger** is a small, asynchronous Python function that quickly and continuously evaluates a given condition. Due to its design, thousands of Triggers can be run in a single process, resulting in significant efficiency improvements over running sensors and Operators in a single process each. In order for an Operator to be deferrable, it must have its own Trigger code that determines when and how the Operator is deferred.

The **Triggerer** is responsible for running Triggers and signaling tasks to resume when their conditions have been met. Like the Scheduler, it is designed to be highly-available: If a machine running Triggers shuts down unexpectedly, the Triggers can be recovered and moved to any warm-standby machine also running a Triggerer.

The process for running a task using a Deferrable Operator is as follows:

1. The task is picked up by a Worker slot to execute an initial piece of code to initialize the task. During this time, it will be in a "running" state.
2. The task defines a Trigger and defers the function of checking on some condition to the Triggerer. Because all of the deferring work happens in the Triggerer, the task instance can now enter a "deferred" state. This frees the Worker slot to take on other tasks.
3. The Triggerer runs the task's Trigger periodically to check whether the condition has been met.
4. Once the Trigger condition succeeds, the Task is again queued by the Scheduler. This time, when the task is picked up by a Worker, it begins to complete its main function.

To learn more about deferring and implementation details, read the Apache Airflow [documentation on deferring](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html).

## Prerequisites

To use Runtime's Deferrable Operators on Astronomer Cloud, you must first:

- Add the `astronomer-operator-wrappers` package to the `packages.txt` file of your Astronomer project.
- Upgrade to [Astronomer Runtime 4.0.0](release-notes#astronomer-runtime-4-0-0) as described in [Upgrade Runtime](upgrade-runtime).

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

- In the previous example, the statement imports the Deferrable Operator class with its non-deferrable class name, meaning that you don't have to replace existing instances of non-deferrable Operators in your DAGs. If you don't include this part of the import statement, you additionally need to replace all instances of non-deferrable Operators with Deferrable Operators.
- Currently, not all Operators have a deferrable version. There are a few open source Deferrable Operators, plus additional Operators designed and maintained by Astronomer.
- You can write your own Deferrable Operators and Triggers for custom API or service usage. If you need help with writing a custom Deferrable Operator, reach out to your Astronomer representative.
- There are some scenarios where it's more appropriate to use a traditional sensor in [`reschedule`](https://github.com/apache/airflow/blob/1.10.2/airflow/sensors/base_sensor_operator.py#L46-L56) mode. If your task doesn't often defer because it needs to wait only a few seconds for a condition to be met, then we recommend using a traditional sensor instead of a Deferrable Operator.

## Astronomer's Deferrable Operators

Astronomer Runtime includes a collection of Deferrable Operators that are available exclusively to Astronomer Cloud users. These are drop-in replacements for non-Deferrable Operators, meaning that you only have to change the import statements in your DAGs to begin using them.

This section contains information and example import statements for all Deferrable Operators available exclusively on Astronomer Runtime.

> **Note:** When you use Deferrable Operators in the `astronomer-operator-wrappers` package outside of a Runtime environment, the package falls back to using the open source, non-deferrable versions of each Operator.

### Databricks Operators

Astronomer Runtime includes the following Databricks Operators:

- `DatabricksSubmitRunOperator`
- `DatabricksRunNowOperator`

These Operators wait in a deferred state while waiting for their respective Databricks job to complete.

#### Import statement

To run Astronomer's Databricks Operators, use the following import statement:

```python
from astronomer.operators import DatabricksSubmitRunOperator, DatabricksRunNowOperator
```

### ExternalTaskSensor

This is a drop-in replacement for Airflow's [`ExternalTaskSensor`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/external_task/index.html#module-airflow.sensors.external_task). It defers itself while waiting for a given Task or DAG to complete.

> **Note:** There is a difference between the deferrable ExternalTaskSensor and the non-deferrable ExternalTaskSensor: If there are multiple matching Tasks or DAGs and any of them have failed, the deferrable sensor also fails, whereas the non-deferrable sensor freezes indefinitely.

#### Import statement

To run Astronomer's deferrable version of the ExternalTaskSensor, use the following import statement:

```python
from astronomer.operators import ExternalTaskSensor
```
