---
sidebar_label: 'Astronomer Cloud'
title: 'Astronomer Cloud Release Notes'
id: 'release-notes'
---

## Overview

Astronomer is committed to continuous development during the Private Beta Program. As you grow with us, expect to see bug fixes and improved functionality on a daily basis. To keep your team updated, this document will provide a weekly summary of all changes made and released to Astronomer Cloud during the Private Beta Program.

If you have any questions or a bug to report, don't hesitate to reach out to us via Slack or Intercom. We're here to help.

**Latest Runtime Version**: 3.0.3 ([Release notes](runtime-release-notes))
**Latest CLI Version**: 0.2.9-beta ([Release notes](cli-release-notes))

## September 28, 2021

### Minor Improvements

- In the UI, a new element on the Deployment information screen shows the health status of a Deployment. Currently, a Deployment is considered unhealthy when its Webserver is down.
- You no longer need a password to access Astronomer Cloud documentation.

### Bug Fixes

- Fixed an issue where the Astronomer UI Deployment information screen showed an incorrect Astronomer Runtime version number.

## September 17, 2021

### Support for Deployment API Keys

Astronomer Cloud now officially supports Deployment API keys, which you can use to automate code pushes to Astronomer and integrate your environment with a CI/CD tool such as GitHub Actions. For more information on creating and managing Deployment API keys, see [Deployment API keys](api-keys). For more information on using Deployment API keys to programmatically deploy code, see [CI/CD](ci-cd). Support making requests to Airflow's REST API using API keys is coming soon.

## September 3, 2021

### Bug Fixes

- Added new protections to prevent S3 remote logging connections from breaking
- Fixed an issue where environment variables with extra spaces could break a Deployment
- Fixed an issue where Deployments would occasionally persist after being deleted via the UI
- In the UI, the **Organization** tab in **Settings** is now hidden from non-admin users
- In the UI, the table view of Deployments no longer shows patch information in a Deployment's **Version** value

## August 27, 2021

### Minor Improvements

- You can now remain authenticated to Astronomer across multiple active browser tabs. For example, if your session expires and you re-authenticate to Astronomer Cloud on one tab, all other tabs running Astronomer Cloud will be automatically updated without refreshing.
- If you try to access a given page on Astronomer Cloud while unauthenticated and reach the login screen, logging in now brings you to the original page you requested.

### Bug Fixes

- Fixed an issue where an incorrect total number of team members would appear in the **People** tab.

## August 20, 2021

### Support for the Airflow REST API

You can now programmatically trigger DAGs and update your Airflow Deployments on Astronomer by making requests to Airflow's [REST API](https://airflow.apache.org/docs/apache-airflow/stable/stable-rest-api-ref.html). Currently this feature works only with temporary tokens, which are available at `cloud.astronomer.io/token`. Support for Deployment API keys is coming soon. For more information on using this feature, read [Airflow API](airflow-api).

### Minor Improvements

- Set `AIRFLOW_HOME = 'usr/local/airflow'` as a permanent global environment variable.
- In the Astronomer UI, long environment variable keys and values now wrap to fit the screen.
- Added links for the Astronomer Registry and certification courses to the left-hand navbar.
- Moved the **Teams** and **People** tabs into the **Settings** page of the UI.
- Added **Cluster** information to the metadata section of a Deployment's information page in the UI.
- Renamed various UI elements to better represent their functionality.
- Increased the maximum **Worker Termination Grace Period** from 600 minutes (10 hours) to 1440 minutes (24 hours).

### Bug Fixes

- The left-hand navbar in the UI is no longer cut off when minimized on smaller screens.
- Fixed an issue where you could not delete a Workspace via the UI.
- Fixed an issue where expired tokens would occasionally appear on `cloud.astronomer.io/token`.
- Fixed an issue where the UI would initially load an inaccurate number of team members on the **Access** page.
- Fixed alphabetical sorting by name in the **People** tab in the UI.
- Removed placeholder columns from various tables in the UI.

## August 6, 2021

### Improvements

- Informational tooltips are now available on the **New Deployment** page.

### Bug Fixes

- Fixed an issue where adding a user to a Workspace and then deleting the user from Astronomer made it impossible to create new Deployments in that Workspace.
- Improved error handling in the Airflow UI in cases where a user does not exist or does not have permission to view a Deployment.

## July 30, 2021

### Improvements

- Increased the limit of **Worker Resources** from 30 AU to 175 AU (17.5 CPU, 65.625 GB RAM). If your tasks require this many resources, reach out to us to make sure that your Cluster is sized appropriately.
- Collapsed the **People** and **Teams** tabs on the left-hand navigation bar into a single **Access** tab.
- Added a **Cluster** field to the Deployments tab in the Astronomer UI. Now, you can reference which Cluster each of your Deployments is in.
- Replaced our white "A" favicon to one that supports color mode.
- Informational tooltips now available in **Deployment Configuration**.

### Bug Fixes

- Fixed an issue where a deleted user could not sign up to Astronomer Cloud again.
- Removed Deployment-level user roles from the Astronomer UI. Support for them coming soon.
- Fixed an issue where a newly created Deployment wouldn't show up on the list of Deployments in the Workspace.
