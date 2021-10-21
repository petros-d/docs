---
sidebar_label: 'Known Limitations'
title: 'Known Limitations'
id: 'known-limitations'
---

## Overview

As we build and grow Astronomer Cloud, our team is committed to maintaining transparency about the current limitations of the product as well as the roadmap ahead of us.

The list below represents known issues at the time of writing. We're moving fast to address these and are excited to work with customers as we identify solutions to some of these foundational questions.

If you have questions or thoughts about any item below, don't hesitate to reach out to us.

## Known Limitations

- Assistance from our team is required to give the first user in your Organization access to Astronomer Cloud.
- When a user first creates an account, they will be asked to validate their email address. Email validation is not currently required to access Astronomer Cloud, but we encourage users to follow the process anyway as we will enforce it in the future.
- Your team will be limited to a single Astronomer Workspace that supports multiple users and Deployments. Support for an Astronomer "Organization" with multiple Workspaces is coming soon.
- If you're running Astronomer Runtime `2.1.1`, `3.0.0`, or `3.0.1`, the Astronomer Runtime field in the Astronomer UI shows `Unknown`. Once you upgrade to Runtime 3.0.2+, your Deployment's version of Runtime is correctly listed.
- We do not currently support PgBouncer, but the RDS instance provisioned in your Cluster will support around 1000 connections to your database, enough to support 10-12 Deployments.
- Tasks longer than the worker termination grace period may become zombies.
- If a user changes Workspace roles on Astronomer, it can take a maximum of 10 minutes for corresponding Airflow permission changes to take effect.
- [Requests to Airflow's REST API](airflow-api) can only be made using a temporary token. Support for long-lasting Deployment API keys is coming soon.
- The Astronomer CLI is generally limited to `astro dev` commands, in addition to `astro deploy` and `astro auth`. Full functionality is coming soon.
- A set of 40 example DAGs will be appear in the Airflow UI when you create a new Deployment. Corresponding DAG files should not appear in your local project directory. To remove these example DAGs at any time, set the following Environment Variable via the Astronomer UI: `AIRFLOW__CORE__LOAD_EXAMPLES=False`
- Clicking on **Refresh DAG** in the Airflow UI will redirect you to `<org-name>.astronomer.run` (Astronomer Home Page) instead of the task instance URL. We recommend upgrading to [Runtime 4.0](runtime-release-notes#astronomer-runtime-400), as Airflow 2.2 no longer supports this refresh button in the Airflow UI.
- Environment Variables are visible to all Workspace users in the Astronomer UI in plaintext. Support for Environment Variables treated as a secret is coming soon.
- Currently, deferrable operators are not supported in local Airflow environments created via the Astronomer CLI. To use deferrable operators, you must have a Deployment running [Runtime 4.0+](runtime-release-notes#astronomer-runtime-400).

## Coming Soon

- Long-lasting Deployment API Keys
- Support for CLI Install via Homebrew
- Environment Variables as secret
- Single Sign-On
- Full CLI functionality
- Self-service Cluster creation
- Analytics
