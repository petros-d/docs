---
title: 'View Scheduler Logs'
sidebar_label: 'Scheduler Logs'
id: scheduler-logs
description: View your Deployments' Airflow Scheduler logs in the Astronomer Cloud UI.
---

## Overview

Astronomer Cloud exposes your Airflow Deployment's Scheduler logs in the **Scheduler Logs** page of the Astronomer UI. While Airflow task logs available in the Airflow UI are most critical to common troubleshooting, errors specific to the Scheduler component are often helpful to understand task failures.

This guide explains how to access your Deployments' Scheduler logs via the Astronomer Cloud UI. For more information about viewing component logs in a local Airflow environment, see [Access Airflow Component Logs](test-and-troubleshoot-locally.md#access-airflow-component-logs). For Deployments on Astronomer Cloud, logs for the Airflow Webserver, Workers, and Triggerer are not available.

## Access Scheduler Logs

You can access the **Scheduler Logs** page by clicking on the Logs icon in the Astronomer UI sidebar:

![Logs icon and button](/img/docs/log-location.png)

You can also directly access logs for a given Deployment by clicking the Logs icon in the Deployments table or on the Deployment's information screen.

![Logs icon in the Deployments table](/img/docs/deployment-log-button.png)

## Filter Scheduler Logs

The **Scheduler Logs** page shows all of a given Deployment's recorded Scheduler logs from the last 24 hours. Each log is color-coded based on its information type.

At the top of the page, you can filter the types of logs which appear by selecting specific log types (`Debug`, `Info`, `Warn`, or `Error`) from the dropdown log type menu:

![Log filtering menu in Scheduler Logs page](/img/docs/filter-logs.png)

To view a different Deployment's logs, click the name of the current Deployment and select a new Deployment from the dropdown menu that appears:

![Select Scheduler logs menu](/img/docs/select-deployment-logs.png)
