---
sidebar_label: 'Deferrable Operators'
title: 'Deferrable Operators'
id: 'deferrable-operators'
---

## Overview

Deferrable (often called "Async") Operators are a feature that first became available in Airflow 2.2. They allow Operators or Sensors that have a long idle period - where they're waiting on an external system or event - to free up worker space ("defer") during that time.

If you run an Airflow installation that spends a significant amount of time in these kinds of operators or sensors - for example, `S3Sensor`, `HTTPSensor` or the `DatabricksSubmitRunOperator`, then moving to Deferrable Operators will give you significant savings in terms of your cluster running costs - potentially over 50%.

In addition, the deferred part of Deferrable Operators runs on a new, highly-available "trigger" system within Airflow - meaning that operators waiting in this *deferred* phase of execution are themselves highly-available and able to recover from multi-machine outages, unlike the traditional non-deferrable operators.

## Using Deferrable Operators

Deferrable Operators do have a different underlying implementation to traditional Operators, and so each operator that you'd like to defer needs two pieces of work:

- There needs to be a deferrable version of the Operator or Sensor written
- You need to swap in this version in your DAGs

You will also need to be using Airflow 2.2 or higher, and ensure that a `triggerer` process is running in addition to the `scheduler`. If you are on Astronomer Cloud, this will be handled automatically for you when you select an appropriate image for your DAGs to run on.

Astronomer maintains an ever-growing selection of Deferrable Operators available to our commercial customers that are drop-in replacements for existing operators; all you need to do is change a single import line in your DAGs to take advantage of them.

You also have the option of writing your own Deferrable Operators and Triggers for custom API or service usage - we are happy to help Astronomer customers with this process.

## Technical Details

Behind the scenes, the way this works is a new feature in Airflow 2.2 called Triggers. Triggers are an alternative *workload* type from tasks, that are designed to be run in a lightweight, highly-available fashion using asynchronous Python.

The result of this is that thousands of triggers can be run in a single process, allowing very significant efficiency improvements over the traditional pattern of running these sensors and operators in a single process each.

Deferrable Operators are simply Operators that are designed around a companion Trigger. At some point in its execution, the Operator calls Airflow to ask it to defer based on a new trigger, and Airflow will suspend that Task and start up the trigger. Once the trigger fires, the Task is resumed, passed a small amount of state that it persisted before it suspended, and it can finish execution.

A new Airflow component called the `triggerer` takes care of running triggers and signalling Tasks to resume when their conditions have been met, and like the modern scheduler, is designed to be highly-available; if a machine running triggers dies, they will automatically be recovered and moved to a warm-standby machine if multiple `triggerers` are running.

If you want to read more about this system and the low-level implementation details, you can refer to Airflow's [Concepts: Deferring](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html) documentation.

## Available Astronomer Operators

To use these operators, you must first install the `astronomer-operator-wrappers` package, and then change your imports as mentioned below.

Note that these operators are **only available in commercial Astronomer environments**, such as our Cloud product. The package is designed to fall back to the non-deferrable options in other environments, so your DAGs will still run everywhere, but the deferrable portions will only work on our platforms.

### Databricks Operators

We provide deferrable versions of both the `DatabricksSubmitRunOperator` and the `DatabricksRunNowOperator`:

```python
from astronomer.operators import DatabricksSubmitRunOperator, DatabricksRunNowOperator
```

They are entirely API-compatible with the Airflow operators with matching names, and will defer while waiting for their job to complete.

### External Task Sensor

```python
from astronomer.operators import ExternalTaskSensor
```

This is a drop-in replacement for Airflow's [`ExternalTaskSensor`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/external_task/index.html#module-airflow.sensors.external_task), deferring itself while it waits for the given Task or DAG to complete.

There is one slight change of behavior - if there are multiple matching Tasks or DAGs, and any of them have failed, this sensor will also fail, rather than hanging forever like the open-source version does.
