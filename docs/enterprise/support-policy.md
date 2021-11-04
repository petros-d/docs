---
title: 'Astronomer Certified Versioning and Support'
sidebar_label: 'Versioning and Support Policy'
id: support-policy
---

## Overview

Astronomer Certified (AC) is a Debian-based, production-ready distribution of Apache Airflow that mirrors the open source project and undergoes additional levels of rigorous testing conducted by our team.

This Docker image is hosted on [Astronomer's Docker Registry](https://quay.io/repository/astronomer/ap-airflow?tab=tags) and allows you to run Airflow on Astronomer. All projects require that you specify an Astronomer Certified image in your `Dockerfile`.

This document provides information on the following:

- How Astronomer Certified is versioned
- Which versions of Astronomer Certified are currently available
- The support schedule and end-of-support date for all versions

For guidelines on how to upgrade, read [Upgrade Apache Airflow on Astronomer](enterprise/manage-airflow-versions).

## Versioning Scheme

An Astronomer Certified (AC) Docker image will be published for every major and minor version of Apache Airflow. For example, AC images correspond with Apache Airflow 2.0, 2.1, 2.2 etc. as they're released in the open-source project.

AC Docker images come in two variants:

- `quay.io/astronomer/ap-airflow:<version>-buster-onbuild`
- `quay.io/astronomer/ap-airflow:<version>-buster`

For example, the images for Astronomer Certified 2.1.0 would be:

- `quay.io/astronomer/ap-airflow:2.1.0-buster`
- `quay.io/astronomer/ap-airflow:2.1.0-buster-onbuild`

For the smoothest, out-of-the-box Airflow experience, we strongly recommend and default to `buster-onbuild` images in your project's `Dockerfile`. These images incorporate Docker ONBUILD commands to copy and scaffold your Airflow project directory so you can more easily pass those files to the containers running each core Airflow component.

For complex use cases that require customizing AC base image, read [Customize your Airflow Image on Astronomer](https://www.astronomer.ioenterprise/customize-image).

### Hotfix Versions

In addition to supporting the latest versions of open source Airflow on Astronomer Certified, our team regularly ships bug and security fixes to AC images in hotfix releases.

The format for AC hotfix versions is `<base-version>-<hotfix-version>`. For example, the second hotfix release for AC 2.1.0 was `2.1.0-2`.

All hotfix releases have a [corresponding changelog](https://github.com/astronomer/ap-airflow/blob/master/2.1.0/CHANGELOG.md) which specifies the date the hotfix was released and all individual changes made to it. Bugs that are reported by the wider Airflow community are often fixed in Astronomer Certified before they are fixed in the subsequent open source release.

For information on how to upgrade to the latest hotfix release, read [Upgrade to an AC Patch Version](manage-airflow-versions#patch-versions-of-astronomer-certified).

## Available Versions

The following table contains all Astronomer Certified images supported on Astronomer Enterprise. For our platform's full collection of Docker images, reference [Astronomer on Quay.io](https://quay.io/repository/astronomer/ap-airflow?tab=tags). For more information on Alpine and Debian as distinct system distributions, read [Migrate from Alpine to Debian](manage-airflow-versions#migrate-from-alpine-to-debian).

| Airflow Version                                                                      | Debian-based Image                                        | Alpine-based Image                                            |
| -------------------------------------------------------------------------------------| ----------------------------------------------------------| --------------------------------------------------------------|
| [1.10.10](https://github.com/astronomer/ap-airflow/blob/master/1.10.10/CHANGELOG.md) | FROM quay.io/astronomer/ap-airflow:1.10.10-buster-onbuild | FROM quay.io/astronomer/ap-airflow:1.10.10-alpine3.10-onbuild |
| [1.10.12](https://github.com/astronomer/ap-airflow/blob/master/1.10.12/CHANGELOG.md) | FROM quay.io/astronomer/ap-airflow:1.10.12-buster-onbuild | FROM quay.io/astronomer/ap-airflow:1.10.12-alpine3.10-onbuild |
| [1.10.14](https://github.com/astronomer/ap-airflow/blob/master/1.10.14/CHANGELOG.md) | FROM quay.io/astronomer/ap-airflow:1.10.14-buster-onbuild | N/A                                                           |
| [1.10.15](https://github.com/astronomer/ap-airflow/blob/master/1.10.15/CHANGELOG.md) | FROM quay.io/astronomer/ap-airflow:1.10.15-buster-onbuild | N/A                                                           |
| [2.0.0](https://github.com/astronomer/ap-airflow/blob/master/2.0.0/CHANGELOG.md)     | FROM quay.io/astronomer/ap-airflow:2.0.0-buster-onbuild   | N/A                                                           |
| [2.0.2](https://github.com/astronomer/ap-airflow/blob/master/2.0.2/CHANGELOG.md)     | FROM quay.io/astronomer/ap-airflow:2.0.2-buster-onbuild   | N/A                                                           |
| [2.1.0](https://github.com/astronomer/ap-airflow/blob/master/2.1.0/CHANGELOG.md)     | FROM quay.io/astronomer/ap-airflow:2.1.0-buster-onbuild   | N/A                                                           |
| [2.1.1](https://github.com/astronomer/ap-airflow/blob/master/2.1.1/CHANGELOG.md)     | FROM quay.io/astronomer/ap-airflow:2.1.1-buster-onbuild   | N/A                                                           |
| [2.1.3](https://github.com/astronomer/ap-airflow/blob/master/2.1.3/CHANGELOG.md)     | FROM quay.io/astronomer/ap-airflow:2.1.3-buster-onbuild   | N/A                                                           |
| [2.1.4](https://github.com/astronomer/ap-airflow/blob/master/2.1.4/CHANGELOG.md)     | FROM quay.io/astronomer/ap-airflow:2.1.4-buster-onbuild   | N/A                                                           |
| [2.2.0](https://github.com/astronomer/ap-airflow/blob/master/2.2.0/CHANGELOG.md)             | 9.6+     | 8.0+      | 3.6, 3.7, 3.8, 3.9 | Debian 10 (Buster)              | 0.18.6, 0.18.7, 0.19.0 | 6.2.1 | 4.4.7  |

## Support Policy

Astronomer is committed to supporting all patch versions of Astronomer Certified (AC) for a total of 18 months from the release date of the Docker image and Python wheel. Within the support window of each Astronomer Certified version, the following is true:

- A Python wheel and set of Docker images corresponding to that version are available for download via [Quay.io](http://quay.io), PyPi and [Downloads](https://www.astronomer.io/downloads).
- Astronomer will regularly publish hotfixes for bug or security issues identified as high priority.
- The Astronomer Support team will offer support for paying customers running a supported version of AC via the [Astronomer Support Portal](https://support.astronomer.io).
- A user can create a new Airflow Deployment via the Astronomer UI, CLI, or API with any supported version of AC.

When a version of Airflow is not supported, the following is true:

- The Astronomer Support team is not obligated to answer questions regarding an Airflow Deployment that is running an unsupported version of Airflow or Astronomer Certified.
- New Airflow Deployments cannot be created with a version of AC that is no longer supported. Deprecated versions will *not* render as an option in the Deployment creation process from the Astronomer UI, API, or CLI.
- The latest version of the Astronomer CLI will render a warning if a user pushes a Docker image to Astronomer that corresponds to a version of Airflow that is no longer supported.
- Users can continue to locally test versions of AC that are no longer supported via the Astronomer CLI.
- Service will not be interrupted for Airflow Deployments running a version of AC that is no longer supported.

## Support Schedule

The following table contains the exact support timeline for each published version of Astronomer Certified. These timelines are based on an 18-month support lifecycle.

| AC Version | Release Date   | Support Period | End-of-Support Date |
|------------|----------------|----------------|---------------------|
| 1.10.5     | Sep 4, 2019    | 18 Months      | March 4, 2021       |
| 1.10.7     | Dec 20, 2019   | 18 Months      | June 20, 2021       |
| 1.10.10    | April 23, 2020 | 18 Months      | Oct 23, 2021        |
| 1.10.12    | Sep 30, 2020   | 18 Months      | March 30, 2022      |
| 1.10.14    | Dec 10, 2020   | 18 Months      | June 10, 2022       |
| 1.10.15    | March 19, 2021 | 18 Months      | Sep 19, 2022        |
| 2.0.0      | Dec 17, 2020   | 18 Months      | June 17, 2022       |
| 2.0.2      | April 26, 2021 | 18 Months      | Oct 26, 2022        |
| 2.1.0      | May 21, 2021   | 18 Months      | Nov 21, 2022        |
| 2.1.1      | July 2, 2021   | 18 Months      | Jan 2, 2023         |
| 2.1.3      | Aug 23, 2021   | 18 Months      | Feb 23, 2023        |
| 2.1.4      | Sep 19, 2021   | 18 Months      | March 19, 2023      |
| 2.2.0      | Oct 13, 2021   | 18 Months      | April 13, 2023      |
