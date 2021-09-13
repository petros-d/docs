---
sidebar_label: 'Runtime Versioning and Support'
title: 'Astronomer Runtime Versioning and Support'
id: 'runtime-support-policy'
---

## Overview

Astronomer Runtime is a Debian-based, production-ready distribution of Apache Airflow that mirrors the open source project and undergoes additional levels of rigorous testing conducted by Astronomer.

This Docker image is hosted on [Astronomer's Docker Registry](https://quay.io/repository/astronomer/astro-runtime) and allows you to run Airflow on Astronomer Cloud. All projects require that you specify an Astronomer Runtime image in your `Dockerfile`.

This document provides information on the following:

- How Astronomer Runtime is versioned
- Which versions of Astronomer Runtime are currently available
- The support schedule and end-of-support date for all versions

For guidelines on how to upgrade, read [Upgrade Astronomer Runtime](upgrade-runtime).

## Versioning Scheme

An Astronomer Runtime Docker image will be published for every major and minor version of Apache Airflow. For example, Runtime images correspond with Apache Airflow 2.0, 2.1, 2.2 etc. as they're released in the open-source project.

Runtime major version upgrades equate to upgrading Apache Airflow versions, while Runtime minor version upgrades are patch fixes for existing Airflow versions. For example, consider Runtime 3.0.0, which is Astronomer's distribution of Airflow 2.1.1. Runtime 3.1.0 would equate to using a new version of Apache Airflow, whereas Runtime 3.0.1 would include only minor fixes for Airflow 2.1.1.

## Runtime Sources

Runtime Docker images come in two variants:

- `quay.io/astronomer/astro-runtime:<version>`
- `quay.io/astronomer/astro-runtime:<version>-base`

For example, the images for Astronomer Runtime 3.0.0 would be:

- `quay.io/astronomer/astro-runtime:3.0.0`
- `quay.io/astronomer/astro-runtime:3.0.0-base`

For the smoothest, out-of-the-box Airflow experience, we strongly recommend and default to using non-`base` images. These images incorporate Docker ONBUILD commands to copy and scaffold your Airflow project directory so you can more easily pass those files to the containers running each core Airflow component.

## Available Runtime Versions

The following table contains all Astronomer Runtime images supported on Astronomer Cloud. For our platform's full collection of Docker images, reference [Astronomer on Quay.io](https://quay.io/repository/astronomer/astro-runtime?tab=tags).

| Airflow Version                                                                      | Debian-based Image                                        |
| -------------------------------------------------------------------------------------| ----------------------------------------------------------| --------------------------------------------------------------|
| [2.1.1](https://github.com/astronomer/astro-runtime/blob/main/CHANGELOG.md#301-2021-08-31)     | FROM quay.io/astronomer/astro-runtime:3.0.0   |
| [2.1.1](https://github.com/astronomer/astro-runtime/blob/main/CHANGELOG.md#301-2021-08-31)     | FROM quay.io/astronomer/astro-runtime:3.0.1   |

## Support Policy

Astronomer is committed to supporting all patch versions of Astronomer Runtime for a total of 18 months from the release date of the Docker image and Python wheel. Within the support window of each Astronomer Runtime version, the following is true:

- A set of Docker images corresponding to that version are available for download via [Quay.io](http://quay.io).
- Astronomer will regularly publish hotfixes for bug or security issues identified as high priority.
- The Astronomer Support team will offer support for paying customers running a supported version of Runtime via the [Astronomer Support Portal](https://support.astronomer.io).
- A user can create a new Airflow Deployment via the Astronomer UI, CLI, or API with any supported version of Runtime.

When a version of Airflow is not supported, the following is true:

- The Astronomer Support team is not obligated to answer questions regarding an Airflow Deployment that is running an unsupported version of Airflow or Astronomer Runtime.
- New Airflow Deployments cannot be created with a version of Runtime that is no longer supported. Deprecated versions don't render as an option in the Deployment creation process from the Astronomer UI, API, or CLI.
- The latest version of the Astronomer CLI will render a warning if a user pushes a Docker image to Astronomer that corresponds to a version of Airflow that is no longer supported.
- Users can continue to locally test versions of Runtime that are no longer supported via the Astronomer CLI.
- Service will not be interrupted for Airflow Deployments running a version of Runtime that is no longer supported.

## Support Schedule

The following table contains the exact support timeline for each published version of Astronomer Runtime. These timelines are based on an 18-month support lifecycle.

| Runtime Version | Release Date   | Support Period | End-of-Support Date |
|------------|----------------|----------------|---------------------|
| 3.0.0     | August 12, 2021   | 18 Months      | February 12, 2023 |
| 3.0.1     | August 31, 2021   | 18 Months      | February 31, 2023 |
