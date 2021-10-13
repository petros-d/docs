---
sidebar_label: 'Astronomer Runtime'
title: 'Astronomer Runtime Release Notes'
id: 'runtime-release-notes'
---

## Overview

Astronomer Runtime is a Docker image built and published by Astronomer that extends the Apache Airflow project to provide a differentiated experience. This document provides a summary of all changes made to each available version of Astronomer Runtime.

For instructions on how to upgrade, read [Upgrade Astronomer Runtime](upgrade-runtime). For general product release notes, go to [Astronomer Cloud Release Notes](release-notes). If you have any questions or a bug to report, don't hesitate to reach out to us via Slack or [support@astronomer.io](mailto:support@astronomer.io).

## Astronomer Runtime 4.0.0

- Release date: October 12, 2021
- Airflow version: 2.2.0

### Support for Airflow 2.2.0

Astronomer Runtime 4.0.0 is a significant release that supports and enhances [Apache Airflow 2.2.0](https://airflow.apache.org/blog/airflow-2.2.0/), an exciting milestone in the open source project. Most notably, this release introduces custom timetables and Deferrable Operators.

#### Custom Timetables

Timetables represent a powerful new framework that allows Airflow users to create custom schedules using Python. In an effort to provide more flexibility and address known limitations imposed by cron, timetables use an intuitive `data_interval` that, for example, allows you to schedule a DAG to run daily on Monday through Friday, but not on the weekend. Timetables can be easily plugged into existing DAGs, which means that it's easy to create your own or use community-developed timetables in your project.

In addition to supporting the timetables framework, the team at Astronomer has built a `TradingHoursTimetable` that's ready to use in Runtime 4.0.0. You can use this timetable to run a DAG based on whether or not a particular global market is open for trade.

For more information on using timetables, read the [Apache Airflow Documentation](https://airflow.apache.org/docs/apache-airflow/stable/howto/timetable.html).

#### Deferrable Operators

[Deferrable operators](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html) are a new type of Airflow operator that promises improved performance and lower resource costs. While standard operators and sensors take up a "worker slot" even when they are waiting for an external trigger and not actually executing a task, Deferrable Operators are designed to suspend themselves and free up that "worker slot" while they wait. This is made possible by a new, lightweight Airflow component called the Triggerer.

Existing Airflow operators have to be re-written according to the Deferrable Operator framework. In addition to supporting those available in the open source project, Astronomer has built an exclusive collection of Deferrable Operators in Runtime 4.0.0. This collection includes the `DatabricksSubmitRunOperator`, the `DatabricksRunNowOperator`, and the `ExternalTaskSensor`. These are designed to be drop-in replacements for corresponding operators currently in use.

As part of supporting Deferrable Operators, the Triggerer is now available as a fully managed component on Astronomer Cloud. This means that you can start using deferrable Operators in your DAGs as soon as you're ready.
For more general information on Deferrable Operators, as well as how to use Astronomer's exclusive Deferrable Operators, read [Deferrable Operators](deferrable-operators).

## Astronomer Runtime 3.0.3

- Release date: September 22, 2021
- Airflow version: 2.1.1

### Bug fixes

- Fixed an issue where requests to Airflow's REST API with a temporary authentication token failed
- Fixed an issue introduced in Runtime 3.0.2 where `astro dev` commands in the Astronomer CLI did not execute correctly

## Astronomer Runtime 3.0.2

- Release date: September 17, 2021
- Airflow version: 2.1.1

### Bug fixes

- Fixed a series of issues that prevented task logs from appearing in the Airflow UI by implementing a custom task logging handler that does not interfere with AWS credentials or connections configured by users

## Astronomer Runtime 3.0.1

- Release date: September 1, 2021
- Airflow version: 2.1.1

### Minor improvements

- Upgraded the default Python version to `3.9.6`
- Added a link to Astronomer Cloud documentation in the Airflow UI

### Bug fixes

- Removed nonfunctional security and user profile elements from the Airflow UI
- The Airflow UI now shows the correct version of Astronomer Runtime in the footer

## Astronomer Runtime 3.0.0

- Release date: August 12, 2021
- Airflow version: 2.1.1

### Minor improvements

- The Webserver is now the only Airflow component with access to logs, which reduces the risk of exposing sensitive information in logs ([commit](https://github.com/apache/airflow/pull/16754))
- Added support for Python 3.9 ([commit](https://github.com/apache/airflow/pull/15515))
- `token` keys in connections are now marked as masked by default ([commit](https://github.com/apache/airflow/pull/16474))

### Bug fixes

- Fixed module vulnerabilities exposed by `yarn audit` ([commit](https://github.com/apache/airflow/pull/16440))
- Fixed an issue where tasks would fail when running with `run_as_user` ([commit](https://github.com/astronomer/airflow/commit/075622cbe))
- Fixed an issue where tasks would fail when running with `CeleryKubernetesExecutor` ([commit](https://github.com/astronomer/airflow/commit/90aaf3d48))
