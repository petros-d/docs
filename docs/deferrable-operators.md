---
sidebar_label: 'Deferrable Operators'
title: 'Deferrable Operators'
id: 'deferrable-operators'
---

## Overview

Deferrable or "async" Operators are a feature available starting in Airflow 2.2. Deferrable Operators differ from traditional sensors because they don't take up a Worker or Executor slot when waiting for an external signal.

This results in a significant performance improvement for Operators or Sensors that spend a long time in a deferred state, such as `S3Sensor`, `HTTPSensor` or the `DatabricksSubmitRunOperator`. Using the deferrable versions of these Operators can potentially save your cluster running costs by over 50%.

The deferring function of deferrable Operators, known as a Trigger, runs on a new, highly-available Triggerer component within Airflow. This means that deferrable Operators waiting in a deferred phase are also highly-available, which makes it easy to recover from multi-machine outages.

On Astronomer Cloud, Triggerers are automatically managed, meaning you can start using deferrable Operators in your DAGs without additional implementation steps. This guide explains how deferrable Operators work, as well as how to use them in your DAGs. Additionally, this guide contains information about each of Astronomer's own deferrable Operators.

### How It Works

Airflow 2.2 introduces a new concept called a Trigger. Triggers are designed to run in a lightweight, highly-available fashion using asynchronous Python.

Because of this, thousands of Triggers can be run in a single process, resulting in significant efficiency improvements over running sensors and Operators in a single process each.

Deferrable Operators are simply Operators that are designed around a companion Trigger. The process for running a deferrable Operator is as follows:

1. The Operator calls Airflow to determine if it should defer based on a new trigger.
2. Airflow suspends the Operator's task and starts up the Trigger.
3. If the Trigger fires, the Task is resumed and passed a small amount of state from before it suspended. From here, it can finish execution. If the trigger doesn't fire, the task stays suspended in a deferred state.

A new Airflow component called the Triggerer takes care of running triggers and signaling tasks to resume when their conditions have been met. Like the Scheduler, it is designed to be highly-available: If a machine running Triggers shuts down unexpectedly, the Triggers can be recovered and moved to any warm-standby machine also running a Triggerer.

To learn more about about this system and the low-level implementation details, read the Apache Airflow [Deferring documentation](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html).

## Using Deferrable Operators

Deferrable Operators are drop-in replacements for their traditional Operator counterparts. To use a deferrable version of an existing Operator in your DAG, you simply need to import the deferrable Operator. For example, to use Astronomer's deferrable `ExternalTaskSensor`, you would add the following line to your DAG:

```py
from astronomer.operators import ExternalTaskSensor
```

After adding this line, any instance of an `ExternalTaskSensor` in your DAG becomes deferrable.

Some additional notes about using deferrable Operators:

- Currently, not all Operators have a deferrable version. There are a few open source deferrable Operators, plus additional Operators designed and maintained by Astronomer.
- To use deferrable Operators, you must run Airflow 2.2 or higher and ensure that a Triggerer is running in addition to the Scheduler. If you are on Astronomer Cloud, this is handled automatically for you when you select an appropriate image for your DAGs to run on.
- You can write your own deferrable Operators and Triggers for custom API or service usage. Astronomer is happy to help customers with this process.

## Astronomer's Deferrable Operators

Astronomer maintains a collection of deferrable Operators available to commercial customers. These are drop-in replacements for non-deferrable Operators, meaning you only have to change the import statements in your DAGs to begin using them.

This section contains information on each available deferrable Operator, including example import statements. If there are any differences between a deferrable Operator and its non-deferrable counterpart, those changes are listed in a Notes section.

### Prerequisites

To use Operators maintained by Astronomer, you must first install the `astronomer-operator-wrappers` package.

Note that these Operators are available only in commercial Astronomer environments, such as Astronomer Cloud. The package is designed to fall back to the non-deferrable options in other environments, but the deferrable portions work only on Astronomer.

### Databricks Operators

We provide deferrable versions of both the `DatabricksSubmitRunOperator` and the `DatabricksRunNowOperator`. These Operators wait in a deferred state while waiting for their respective Databricks jobs to complete.

#### Import statement

```python
from astronomer.operators import DatabricksSubmitRunOperator, DatabricksRunNowOperator
```

### ExternalTaskSensor

This is a drop-in replacement for Airflow's [`ExternalTaskSensor`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/external_task/index.html#module-airflow.sensors.external_task), deferring itself while it waits for the given Task or DAG to complete.

#### Import statement

```python
from astronomer.operators import ExternalTaskSensor
```

#### Notes

There is one difference between the deferrable ExternalTaskSensor and the non-deferrable ExternalTaskSensor: If there are multiple matching Tasks or DAGs and any of them have failed, the deferrable sensor also fails, whereas the non-deferrable sensor freezes indefinitely.
