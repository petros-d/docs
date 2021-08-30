---
sidebar_label: 'Astronomer Runtime'
title: 'Astronomer Runtime Release Notes'
id: 'runtime-release-notes'
---

This document provides a summary of all changes made to the Astronomer Runtime, which is Astronomer's Docker image-based distribution of Apache Airflow. For general product release notes, go to [Astronomer Cloud Release Notes](release-notes).

If you have any questions or a bug to report, don't hesitate to reach out to us via Slack or Intercom. We're here to help.

## Astronomer Runtime 3.0.0

- Release date: August 12, 2021
- Airflow version: 2.1.1

### Minor improvements

- The Webserver is now the only Airflow component with access to logs, which reduces the risk of exposing sensitive information in logs
- Added support for Python 3.9
- `token` keys in connections are now marked as masked by default
- Refactored code surrounding imports

### Bug fixes

- Fixed module vulnerabilities discovered by `yarn audit`
- Fixed an issue where tasks would fail when running with `run_as_user`
- Fixed an issue where tasks would fail when running with `CeleryKubernetesExecutor`
