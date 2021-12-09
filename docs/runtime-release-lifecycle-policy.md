---
title: 'Astronomer Runtime Release and Lifecycle Policy'
sidebar_label: 'Release and Lifecycle Policy'
id: runtime-release-lifecycle-policy
description: Learn how Astronomer releases and supports Astronomer Runtime, the production-ready distribution of Apache Airflow for Astronomer Cloud.
---

## Overview

Astronomer Runtime is a Debian-based, production-ready distribution of Apache Airflow that extends the open source project to provide you with differentiated functionality that centers around reliability, efficiency, and performance.

You can use a Runtime Docker image on [Astronomer's Docker Registry](https://quay.io/repository/astronomer/astro-runtime) to run Airflow on Astronomer Cloud. A Deployment on Astronomer runs one version of Runtime, but you can use different versions of Runtime on different Deployments within a given Workspace or Cluster. All Astronomer projects require that you specify an Astronomer Runtime image in your `Dockerfile`.

This document provides information on the following:

- How Runtime is versioned
- Which versions of Runtime are currently available
- The maintenance schedule and end-of-maintenance date for all versions

For guidelines on how to upgrade, read [Upgrade Runtime](upgrade-runtime.md).

## Release Channels

To meet the unique needs of different operating environments, Astronomer Runtime versions fall into one of two release channels:

- **Stable:** Includes the latest Astronomer and Airflow features
- **Long-term Support (LTS):** Includes long-term testing, stability, and maintenance for a core set of features

For users that want the newest features from Astronomer and Apache Airflow on an incremental basis, we recommend following the stable release channel and upgrading to new versions as soon as they are made generally available. New versions of Runtime are issued regularly.

For users that want to optimize for the highest level of reliability and stability, we recommend upgrading only to LTS versions as they're made available. Release channels are not binding, so you are free to upgrade to any available version of Runtime at any time.

## Versioning Scheme

Astronomer Runtime follows [Semantic Versioning](https://semver.org/). This means that Astronomer ships Major, Minor, and Patch releases of Runtime in the format of `major.minor.patch`.

- **Major** versions are released for significant feature additions, including backward-incompatible changes to an API or DAG specification.
- **Minor** versions are released for functional changes, including backward-compatible changes to an API or DAG specification.
- **Patch** versions are released for bug and security fixes that resolve incorrect behavior.

For Runtime `4.0.6`, for example:

- Major = `4.`
- Minor = `.0`
- Patch = `.6`

An Runtime Docker image will be published for every major and minor version of Apache Airflow. For example, Runtime images that correspond with Apache Airflow 2.0, 2.1, 2.2 etc. will be available on Astronomer as they're released in the open source project.

It is considered safe to upgrade to minor and patch versions within a major version. Upgrade guidance for major and LTS versions is provided with each release. There is no relation between a Runtime release's version number and its release channel.

### Distribution

Runtime Docker images are formatted as:

- `quay.io/astronomer/astro-runtime:<version>`
- `quay.io/astronomer/astro-runtime:<version>-base`

For example, the images for Astronomer Runtime 4.0.6 would be:

- `quay.io/astronomer/astro-runtime:4.0.6`
- `quay.io/astronomer/astro-runtime:4.0.6-base`

For the smoothest, out-of-the-box Airflow experience, we strongly recommend and default to `base` images in your project's `Dockerfile`. These images incorporate Docker ONBUILD commands to copy and scaffold your Airflow project directory so you can more easily pass those files to the containers running each core Airflow component.

## Backport Policy for Bug and Security Fixes

If a major stability bug in Astronomer Runtime is identified by Astronomer, a fix will be backported to all LTS versions and only the latest stable version. For users on a stable version that is not latest, our team will recommend that you upgrade. Major issues in this category may result in significant delays in task scheduling as well as potential data loss.

If a major security issue is identified, a fix will be backported and made available as a new Runtime hotfix version for _all_ available stable and LTS releases. Major issues in this category are classified by a combination of impact and exploitability.

In rare instances, the Astronomer team may make an exception and backport a bug or security fix to a release that is beyond the commitment stated above. To submit a request for consideration, please reach out to your customer success manager.

## Astronomer Runtime Maintenance Policy

The maintenance period for an Astronomer Runtime version depends on its release channel:

| Release Channel | Maintenance Duration |
| --------------- | -------------------- |
| Stable          | 6 Months             |
| LTS             | 18 Months            |

For each `major.minor` pair, only the latest patch is supported at any given time. If you report an issue with an Astronomer Runtime patch or hot-fix version that is not latest, the Astronomer Support team will always ask that you upgrade as a first step to resolution. For example, the Support team encourages any user who reports an issue with Astronomer Runtime 4.0.2 to first upgrade to the latest 4.0.x version as soon as it's generally available.

Within the maintenance window of each Astronomer Runtime version, the following is true:

- A set of Docker images corresponding to that version are available for download via [Quay.io](http://quay.io), PyPi, and [Downloads](https://www.astronomer.io/downloads).
- Astronomer will regularly publish bug or security fixes identified as high priority.
- The Astronomer Support team will offer support for paying customers running a supported version of Runtime via the [Astronomer Support Portal](https://support.astronomer.io).
- A user can create a new Airflow Deployment via the Astronomer UI, CLI, or API with any supported version of Runtime.

When the maintenance window for a version of Runtime ends, the following is true:

- The Astronomer Support team is not obligated to answer questions regarding an Airflow Deployment that is running that version.
- New Airflow Deployments cannot be created with that version of Runtime. Unsupported versions will _not_ render as an option in the Deployment creation process from the Astronomer UI, API, or CLI.
- The latest version of the Astronomer CLI will show a warning if a user pushes a Docker image to Astronomer that corresponds to that version.

To ensure reliability, service will not be interrupted for Astronomer Deployments running a version of Runtime that is no longer supported. Unsupported versions will also continue to be available for local development and testing via the Astronomer CLI.

### End of Maintenance Date

Maintenance is discontinued the last day of the month for a given version. For example, if the maintenance window for a version of Astronomer Runtime is January - June of a given year, that version will be maintained by Astronomer until the last day of June.

## Astronomer Runtime Lifecycle Schedule

The following table contains the exact lifecycle for each published version of Astronomer Runtime. These timelines are based on the LTS and Stable release channel maintenance policies.

| Runtime Version                                                                           | Release Date   | Release Channel | Maintenance Period | End of Maintenance Date |
| ------------------------------------------------------------------------------------ | -------------- | --------------- | ------------------ | ----------------------- |
| [3.0.x](runtime-release-notes.md#astronomer-runtime-300)   | August 12, 2021   | Stable             | 6 Months          | February 2022            |
| [4.0.x](runtime-release-notes.md#astronomer-runtime-400)     | Oct 12, 2021   | LTS          | 18 Months           | April 2023          |

If you have any questions or concerns, reach out to [Astronomer Support](https://support.astronomer.io).
