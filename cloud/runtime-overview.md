---
sidebar_label: "Overview"
title: "Astronomer Runtime Overview"
id: runtime-overview
description: Learn about the various components that make up Astronomer Runtime.
---

## Overview

Astronomer Runtime is a Docker image built and published by Astronomer that extends the Apache Airflow project to provide a differentiated data orchestration experience. It is the base image for all Airflow Deployments on Astronomer Cloud.

This guide provides reference information for the building blocks of Astronomer Runtime, as well as information on its release and distribution.

## Distribution

Astronomer Runtime is distributed as a Debian-based Docker image. This image includes:

- A robust testing suite that covers performance benchmarking and end-to-end functionality and upgrade testing for Runtime environments.
- A built-in directory of example DAGs that demonstrate Airflow's most powerful features.
- A collection of Airflow functions, such as deferrable operators and custom timetables, that are exclusive to Astronomer customers.

The Dockerfiles for all supported Astronomer Runtime images can be found in [Astronomer's quay.io repository](quay.io/astronomer/astro-runtime).

## Provider Packages

Astronomer Runtime includes provider packages that are utilized in some background processes, as well as packages which are commonly used by the Airflow community:

- [amazon](https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/index.html)
- [celery](https://airflow.apache.org/docs/apache-airflow-providers-celery/stable/index.html)
- [cncf.kubernetes](https://airflow.apache.org/docs/apache-airflow-providers-cncf-kubernetes/stable/index.html)
- [postgres](https://airflow.apache.org/docs/apache-airflow-providers-postgres/stable/index.html)
- [redis](https://airflow.apache.org/docs/apache-airflow-providers-redis/stable/index.html)

## System Dependencies

Astronomer Runtime includes a number of OS-level dependencies for running basic system processes:

- [apt-utils](https://packages.debian.org/bullseye/apt-utils)
- [gosu](https://packages.debian.org/bullseye/gosu)
- [curl](https://packages.debian.org/bullseye/curl)
- [libffi-dev](https://packages.debian.org/bullseye/libffi-dev)
- [libpq5](https://packages.debian.org/bullseye/libpq5)
- [libssl1.1](https://packages.debian.org/bullseye/libssl1.1)
- [locales](https://packages.debian.org/bullseye/locales)
- [netcat](https://packages.debian.org/bullseye/netcat)
- [sudo](https://packages.debian.org/bullseye/sudo)
- [tini](https://packages.debian.org/bullseye/tini)
- [postgresql-client](https://packages.debian.org/bullseye/postgresql-client)

## Commercial Airflow Support

Astronomer Runtime includes a number of Airflow functions available exclusively to Astronomer customers. This topic includes a list of all additional Airflow functions available in Runtime.

### Deferrable Operators

Astronomer maintains a number of deferrable operators available exclusively through Runtime. For a full list of these operators and guidance on how to use them, read [Astronomer's Deferrable Operators](deferrable-operators.md#astronomers-deferrable-operators).

### Timetables

Astronomer maintains a custom [timetable](https://airflow.apache.org/docs/apache-airflow/stable/howto/timetable.html) called `TradingHoursTimetable` available out of the box in Runtime. You can use this timetable to run a DAG based on whether or not a particular global market is open for trade. More custom timetables will be made available in future releases of Runtime.

### Monitoring DAG

Astronomer Runtime includes a monitoring DAG that is pre-installed in the Docker image and enabled for all customers. In addition to existing Deployment health and metrics functionality, this DAG allows the Astronomer team to better monitor the health of your Data Plane by enabling real-time visibility into whether your Workers are healthy and tasks are running.

The `astronomer_monitoring_dag` runs a simple bash task every 5 minutes to ensure that your Airflow Scheduler and Workers are functioning as expected. If the task fails twice in a row or is not scheduled within a 10-minute interval, Astronomer support receives an alert and will work with you to troubleshoot.

## Extras

Astronomer Runtime includes a few packages that don't have a corresponding provider. These packages are used for basic system functions or optional Airflow functionality. The following list contains all extra packages built into Astronomer Runtime by default:

- `password`: Adds support for user password hashing
- `statsd`: Adds support for sending metrics to StatsD
- `virtualenv`: Adds support for running Python tasks in local virtual environments

## Version Compatibility Reference

Astronomer Runtime is compatible with specific versions of key system components. Additionally, each version of Astronomer Runtime has a lifecycle as described in [Runtime Versioning and Lifecycle Policy](runtime-version-lifecycle-policy.md).

The following table lists all version compatibility requirements and key lifecycle dates for each major version of Astronomer Runtime:

| Runtime Version                                          | Release Date    | Python | System Distribution  | End of Maintenance Date |
| -------------------------------------------------------- | --------------- | ------ | -------------------- | ----------------------- |
| [3.0.x](runtime-release-notes.md#astronomer-runtime-300) | August 12, 2021 | 3.8    | Debian 11 (Bullseye) | February 2022           |
| [4.0.x](runtime-release-notes.md#astronomer-runtime-400) | Oct 12, 2021    | 3.9    | Debian 11 (Bullseye) | April 2022              |

If you have any questions or concerns, reach out to [Astronomer Support](https://support.astronomer.io).
