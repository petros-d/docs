---
sidebar_label: 'Known Limitations'
title: 'Known Limitations'
id: 'known-limitations'
---

## Overview

As we bring on 'Build Partners' into the Private Beta Program for Astronomer Cloud, we're fully committed to being transparent about the current limitations of the product. We're moving fast to remove them and certainly excited to work with your team to build out robust solutions that address some of these foundational questions.

The list below reflects known issues at the time of writing. It will be updated on a weekly basis.

## Known Limitations

- Assistance from our team is required to give the first user in your Organization access to Astronomer Cloud.
- When a user first creates an account, they will be asked to validate their email address. Email validation is not currently required to access Astronomer Cloud, but we encourage users to follow the process anyway as we will enforce it in the future.
- On Private Beta, your team will be limited to a single Astronomer Workspace that supports multiple users and Deployments. Support for an Astronomer "Organization" with multiple Workspaces coming soon.
- Multiple versions of Astronomer Runtime are supported, but the Astronomer UI is hard-coded to show version 2.1.1 and will not reflect your actual running version. Version awareness in the Astronomer UI, API, and CLI is coming soon.
- We do not currently support PgBouncer, but the RDS instance provisioned in your Cluster will support around 1000 connections to your database, enough to support 10-12 Deployments.
- Tasks longer than the worker termination grace period may become zombies when KEDA autoscaling is enabled.
- Requests to Apache Airflow's REST API are not currently supported.
- If a user changes Workspace roles on Astronomer, it can take a maximum of 10 minutes for corresponding Airflow permission changes to take effect.
- The Astronomer CLI is generally limited to `astro dev` commands, in addition to `astro deploy` and `astro auth`. Full functionality coming soon.
- A set of 40 example DAGs will be appear in the Airflow UI when you create a new Deployment. Corresponding DAG files should not appear in your local project directory. To remove these example DAGs at any time, set the following Environment Variable via the Astronomer UI: `AIRFLOW__CORE__LOAD_EXAMPLES=False`
- Clicking on **Refresh DAG** in the Airflow UI will redirect you to `<org-name>.astronomer.run` (Astronomer Home Page) instead of the task instance URL.

## Coming Soon

- Deployment Service Accounts.
- Support for Airflow 2.2.
- Single Sign-On.
- Full CLI functionality.
- Self-service Cluster creation.
- Support for CLI Install via Homebrew.
- Analytics.
