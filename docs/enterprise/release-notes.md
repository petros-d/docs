---
title: 'Astronomer v0.26 Release Notes'
sidebar_label: 'Release Notes'
id: release-notes-enterprise
---

## Overview

Astronomer v0.26 is the latest available minor version of Astronomer Enterprise. v0.26 is **not** part of Astronomer's long-term support (LTS) release model for Astronomer Enterprise, meaning that you do not need to run a script to upgrade from v0.25 to v0.26. For upgrade instructions, read [Upgrade to v0.26]. For instructions on how to upgrade to a patch version within the Astronomer v0.25 series, refer to [Upgrade to a Patch Version of Astronomer Enterprise](/docs/enterprise/v0.26/manage-astronomer/upgrade-astronomer-patch/).

We're committed to testing all Astronomer Enterprise versions for scale, reliability and security on Amazon EKS, Google GKE and Azure AKS. If you have any questions or an issue to report, don't hesitate to [reach out to us](https://support.astronomer.io).

## 0.26.0

Release date: October 14, 2021

### Support for Airflow 2.2.0

[Apache Airflow 2.2.0](https://airflow.apache.org/blog/airflow-2.2.0/) is an exciting milestone in the open source project. Most notably, this release introduces custom timetables and deferrable operators.

#### Custom Timetables

Timetables are a powerful new framework that you can use to create custom schedules using Python. In an effort to provide more flexibility and address known limitations imposed by cron, timetables use an intuitive `data_interval` that, for example, allows you to schedule a DAG to run daily on Monday through Friday, but not on the weekend. Timetables can be easily plugged into existing DAGs, which means that it's easy to create your own or use community-developed timetables in your project.

For more information on using timetables, read the [Apache Airflow Documentation](https://airflow.apache.org/docs/apache-airflow/stable/howto/timetable.html).

#### Deferrable Operators

Deferrable operators are a new type of Airflow operator that promises improved performance and lower resource costs. While standard operators and sensors take up a Worker or Scheduler slot even when they are waiting for an external trigger, deferrable operators are designed to suspend themselves and free up that Worker or Scheduler slot while they wait. This is made possible by a new, lightweight Airflow component called the Triggerer.

As part of supporting deferrable operators, you can provision multiple Triggerers on your Astronomer Deployments. By provisioning multiple Triggerers, you can ensure that tasks using Deferrable Operators are run even when one Triggerer goes down. For more information about configuring Triggerers and other resources, see [Configure a Deployment](enterprise/configure-deployment-enterprise).

### Minor Improvements

- Greatly improved load times for the **System Admin** page in the UI.

### Bug Fixes

- Fixed an issue where making and deploying changes to an existing Deployment via the UI would not result in a "Deployment in Progress" message
- Fixed a security vulnerability where someone could access a Registry endpoint without appropriate credentials
- Fixed an issue where you could not manually trigger a DAG on a Deployment running a OSS Airflow image that's less than v2.0.0
