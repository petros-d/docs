---
sidebar_label: 'Astronomer Runtime'
title: 'Astronomer Runtime Release Notes'
id: 'runtime-release-notes'
---

## Overview

Astronomer runtime is a Docker image built and published by Astronomer that extends the Apache Airflow project to provide a differentiated experience. This document provides a summary of all changes made to each available version of Astronomer Runtime. For general product release notes, go to [Astronomer Cloud Release Notes](release-notes).

If you have any questions or a bug to report, don't hesitate to reach out to us via Slack or Intercom. We're here to help.

## Astronomer Runtime 4.0.0

- Release date: October 12, 2021
- Airflow version: 2.1.1

### Support for Airflow 2.2.0

Astronomer Runtime 4.0.0 includes all of the new features and fixes in Apache Airflow 2.2.0, plus additional fixes and features developed by the Astronomer team. The following are some of the most notable new features:

- **Custom Timetables:** You can now use a new Timetable expression to determine when your DAGs run. Unlike cron expressions and timedeltas, Timetables use a more flexible and intuitive  `data_interval`. They can also be plugged in to any DAG, meaning that it's easy to use community-developed and other external Timetables in your own project.

    Astronomer Runtime exclusively includes a `TradingHoursTimetable` that you can use out of the box to run your DAGs whenever a given market is open for trade.  

- **Deferrable Operators:** Deferrable operators are a special type of operator that can wait for an external signal without taking up a worker slot. To run tasks using deferrable operators, Airflow 2.2 introduces a new, lightweight, and highly available component called a Triggerer. For more information on using deferrable operators and managing the triggerer, read the [Apache Airflow documentation](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html).

    Astronomer Runtime exclusively includes several deferrable versions of existing operators. For more information about these operators, read [Astronomer's Deferrable Operators].

### Bug Fixes    

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
- Added a link to Astronomer Cloud documentation in the Runtime Airflow UI

### Bug fixes

- Removed nonfunctional security and user profile elements from the Runtime Airflow UI
- The Runtime Airflow UI now shows the correct version of Runtime in the footer

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
