---
sidebar_label: 'Astronomer Runtime'
title: 'Astronomer Runtime Release Notes'
id: 'runtime-release-notes'
---

Astronomer runtime is a Docker image built and published by Astronomer that extends the Apache Airflow project to provide a differentiated experience. This document provides a summary of all changes made to each available version of Astronomer Runtime. For general product release notes, go to [Astronomer Cloud Release Notes](release-notes).

If you have any questions or a bug to report, don't hesitate to reach out to us via Slack or Intercom. We're here to help.

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
