---
sidebar_label: 'Deferrable Operators'
title: 'Deferrable Operators'
id: 'deferrable-operators'
---

## Overview

[Apache Airflow 2.2](https://airflow.apache.org/blog/airflow-2.2.0/) introduces [Deferrable Operators](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html), a powerful new framework for executing tasks. Available in Astronomer Runtime 4.0+, Deferrable Operators are a new type of Airflow Operator that promises improved performance and lower resource costs.

In Airflow, it's common for users to configure tasks that wait for some condition to be met before executing or triggering another task. While standard Airflow Operators and Sensors perform that function well, those tasks have historically needed to take up a Worker or Scheduler slot the entire time that they are waiting for that external condition to be met.

In an exciting effort to reduce resource consumption during that process, the Deferrable Operator framework instead allows a task to suspend itself and free up that Worker or Scheduler slot for as long as it's waiting for a condition to be met. For tasks that typically spend a long time in a deferred state, such as those using the `S3Sensor`, the `HTTPSensor`, or the `DatabricksSubmitRunOperator`, replacing them with a Deferrable Operator counterpart can result in significant per-task cost savings and performance improvements.

Tasks that use Deferrable Operators rely on a new, highly-available Airflow component called the Triggerer. The Triggerer component is supported and entirely managed on Astronomer Cloud, which means that you can start using Deferrable Operators in your DAGs as long as you're running Astronomer Runtime 4.0+. As an Astronomer customer, you additionally have exclusive access to several deferrable versions of open source operators that are easy to plug into your code.

This guide explains how Deferrable Operators work, how to implement Deferrable Operators in your DAGs, and references the set of Deferrable Operators built exclusively for Astronomer customers.

## How Deferrable Operators Work

To support Deferrable Operators, Airflow 2.2 introduces two new concepts:

- A Trigger
- The Triggerer

A Trigger is a small, asynchronous Python function that quickly and continuously evaluates a given condition. In order for an Operator to be deferrable, it must have its own Trigger code that determines when tasks should be deferred and what conditions must be met for that task to be ready for execution. Due to its design, thousands of Triggers can be run in a single process.

The Airflow Triggerer is responsible for running Triggers and signaling tasks to resume when their conditions have been met. Like the Scheduler, it is designed to be highly-available. If a machine running Triggers shuts down unexpectedly, the Triggers can be recovered and moved to another warm-standby machine also running the Triggerer.

The process for running a task using a Deferrable Operator is as follows:

1. The task is picked up by a Worker to execute an initial piece of code that initializes the task. During this time, the task will be in a "running" state.
2. The task defines a Trigger and defers the function of checking on an external condition to the Triggerer. Because all of the deferring work happens in the Triggerer, the task instance can now enter a "deferred" state. This frees the Worker slot to take on other tasks.
3. The Triggerer runs the task's Trigger periodically to check whether or not the condition has been met.
4. Once the Triggerer condition succeeds, the Task is again queued by the Scheduler. This time, the task begins executing its main function when as soon as it's picked up by a Worker.

To learn more about deferring, read the Apache Airflow [Deferring documentation](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html).

## Using Deferrable Operators

Deferrable Operators are drop-in replacements for their traditional Operator counterparts. Airflow 2.2.0 shipped with `DateTimeSensorAsync` and `TimeDeltaSensorAsync`, but other Sensors and Operators need to be written. As an Astronomer customer, you have exclusive access to an additional set of Deferrable Operators designed and maintained by our team.

If you're interested in writing and contributing a Deferrable Operator and Trigger for your own use case, we're happy to help with the process.

### Prerequisites

To use Deferrable Operators on Astronomer, you must first:

- Add the `astronomer-operator-wrappers` package to the `packages.txt` file of your Astronomer project.
- Upgrade to [Astronomer Runtime 4.0.0](release-notes#astronomer-runtime-4-0-0) as described in [Upgrade Runtime](upgrade-runtime).

### Import a Deferrable Operator

To use a deferrable version of an existing Operator in your DAG, you simply need to:

- Change your import statement
- Change your DAG to reference the Async class name

Airflow's `TimeSensorAsync`, for example, is a replacement of the non-deferrable `TimeSensor` ([source](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/time_sensor/index.html?highlight=timesensor#module-contents)). To use `TimeSensorAsync`, remove your existing `import` and replace it with the following:

```python
# Remove this import:
# from airflow.sensors.time_sensor import TimeSensor
# Replace with:
from airflow.sensors.time_sensor import TimeSensorAsync
```

Then, change any instance of an `TimeSensor` in your DAG to `TimeSensorAsync`.

## Astronomer's Deferrable Operators

Astronomer Runtime includes a collection of Deferrable Operators available exclusively to Astronomer customers. Unlike open source Deferrable Operators, these are drop-in replacements for non-Deferrable Operators that only require a change in your import statement. No other change to your DAG code needed.

To use Deferrable Operators published by Astronomer, your import statement would look like this:

```
from astronomer.operators import <astronomer-deferrable-operator>
```

This section contains information and example import statements on all Deferrable Operators available on Astronomer Runtime.

> **Note:** When Operators in `astronomer-operator-wrappers` are used in environments that don't run on Astronomer Runtime, the package falls back to using the open source, non-deferrable versions of each Operator.

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

This is a replacement for Airflow's [`ExternalTaskSensor`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/external_task/index.html#module-airflow.sensors.external_task). It defers itself while waiting for a given Task or DAG to complete.

> **Note:** There is a difference between the deferrable ExternalTaskSensor and the non-deferrable ExternalTaskSensor. If there are multiple matching Tasks or DAGs and any of them have failed, the deferrable sensor also fails, whereas the non-deferrable sensor freezes indefinitely.

#### Import statement

To run Astronomer's deferrable version of the ExternalTaskSensor, use the following import statement:

```python
from astronomer.operators import ExternalTaskSensor
```