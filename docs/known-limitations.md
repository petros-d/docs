---
sidebar_position: 3
sidebar_label: 'Known Limitations'
title: Known Limitations
id: known-limitations
---

- If a User is invited to a Workspace on Astronomer, manual approval is needed.
- CLI functionality is generally limited.
- Beta installations are limited to one Workspace.
- Astro CLI gets installed in `.astro` folder locally instead of globally on your machine.
- Airflow 2.1 is the only version of Airflow that's fully supported.
- Once a Cluster is created, the System Admin is unable to see Cloud Provider + Account ID.
- Task logs are only available in the Airflow UI after task completion.
- When you upgrade your Airflow version by inserting a new Docker image into your Dockerfile, the UI will not reflect the upgrade. No protection is enabled against downgrades currently.
- We do not currently support PgBouncer, but your `db.r4.large` RDS instance should support 1000 connections to your Airflow Metadata DB, more than enough for 10-12 Deployments.

## Coming Soon

- Service Accounts.
- Metrics.
- Single Sign-On.
- Support for Airflow 2.0.

## Report an Issue
