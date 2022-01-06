---
title: 'View Deployment Logs'
sidebar_label: 'Deployment Logs'
id: deployment-logs
description: View your Deployments' Scheduler logs directly from the Astronomer Cloud UI.
---

## Overview

Astronomer Cloud pulls Scheduler logs directly from your Airflow deployment and shows them in the **Logs** tab of the Astronomer UI. Logging is essential for troubleshooting and monitoring the health of your DAGs. This guide explains how to access and manage your Deployments' Scheduler logs via the Astronomer Cloud UI. For more information about viewing logs in a local Airflow environment, including Webserver and Worker logs, see [Access Airflow Component Logs](test-and-troubleshoot-locally#access-airflow-component-logs).

## Access Deployment Logs

You can access logs for all of your Deployments through the Logs icon in the Astronomer UI sidebar:

![Logs icon and button](/img/docs/log-location.png)

You can also access logs for a specific Deployment by clicking the Logs icon in the Deployments table or on a Deployment's information screen.

![Logs icon in the Deployments table](/img/docs/deployments-log-button.png)

## Manage Deployment Logs

The **Scheduler Logs** page shows all of a given Deployment's recorded Scheduler logs from the last 24 hours. Each log is color-coded based on its information type.

At the top of the **Scheduler Logs** page, you can filter the types of logs which appear by selecting specific log types from the dropdown log type menu:

![Log filtering menu in Scheduler Logs page](/img/docs/filter-logs.png)

To view a different Deployment's logs, click the name of the current Deployment and select a new Deployment from the dropdown menu that appears:

![Select deployment logs menu](/img/docs/select-deployment-logs.png)
