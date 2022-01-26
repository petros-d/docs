---
sidebar_label: 'Astronomer Concepts'
title: 'Astronomer Cloud Concepts'
id: concepts
description: Lear about the concepts and components that comprise Astronomer Cloud.
---

## Overview

This reference guide explains various concepts and components which are essential for understanding and managing the Astronomer platform.

## General Concepts

This section includes the highest level concepts and terms that comprise the Astronomer platform.

### Astronomer Cloud

Astronomer Cloud is a managed Apache Airflow service. It is based on a hybrid deployment model where a Control Plane is hosted by Astronomer and a Data Plane is hosted in your cloud environment. Both of these planes are fully managed by Astronomer.

### Data Plane

The Data Plane is a high level component of Astronomer Cloud that's hosted in your cloud and managed by the Astronomer team. It is responsible for running Airflow environments and executing DAGs in your Deployments.

### Control Plane

The Control Plane is a high level component of Astronomer Cloud that's hosted and managed by the Astronomer team. It includes all features and dashboards accessible from the Astronomer UI, including:

- User management.
- Workspace management.
- [Deployment management](configure-deployment.md).
- [Metrics](deployment-metrics.md).
- Authentication.

Some settings in the Control Plane are used to manage the Data Plane. For example, adjusting resource usage for a Deployment will adjust the resource usage of its associated Airflow environment in the Data Plane.

### Astronomer UI

The Astronomer UI is the primary interface for accessing and managing the Control Plane. It is accessible via `cloud.astronomer.io`.

### AstroCloud CLI

The AstroCloud CLI is the command line interface for the Control Plane. There are a number of actions you can complete in both the CLI and the Astronomer UI, such as configuring Deployments or authenticating to a Workspace.

Besides directly calling the API via CI/CD, the Astronomer CLI's `astro deploy` command is the only method available for deploying Astronomer project code to Astronomer Cloud.

### Astronomer Runtime

Astronomer Runtime is Astronomer's image-based distribution of Apache Airflow. It has been optimized for Astronomer Cloud through the addition of provider packages, dependencies, and rigorous testing. Additionally, Astronomer Runtime includes Astronomer-developed operators, DAGs, and other development tools not available in the base Apache Airflow image.

## Organizational Concepts

This section includes all terms related to organizing and managing users and code on Astronomer Cloud.

### Organization

The organization is the highest level user-based entity on the Astronomer platform. An organization includes all users, clusters, and Workspaces under the same billing account. All Astronomer users must belong to at least one organization.

### Workspace

A Workspace is a collection of Deployments belonging to a specific subset of users in an organization. User members of the Workspace can create new Deployments or view existing Deployments within the Workspace.

### Deployment

A Deployment is a Control Plane-based interface for managing a single Astronomer project on the Data Plane.

### User

The user is the most specific entity in Astronomer Cloud. User accounts can complete actions on Astronomer Cloud depending on their individual permissions.

## Development Concepts

This section includes all terms related to developing and deploying an Astronomer project.

### Astronomer Project

An Astronomer project is a collection of files that are required to run Airflow both locally and on Astronomer Cloud. This set of files is generated when you run `astro dev init` via the AstroCloud CLI.

### Locally Hosted Astronomer Project/ Environment

When a document refers to a "locally hosted Astronomer project", it is referring to a version of an Astronomer project that is hosted somewhere other than a Deployment. This local project can be deployed to Astronomer Cloud, or it can be run in a local environment.

A local Airflow environment is an instance of Airflow that runs outside of Astronomer Cloud. You can create a local environment by running `astro dev start` in the directory of a locally hosted Astronomer project.

### Airflow UI

The Airflow UI is the primary interface for managing an Astronomer project's DAG runs and task runs. The Airflow UI for a locally running Airflow environment is accessible via `http://localhost:8080/`. The Airflow UI for a Deployment on Astronomer Cloud is accessible via the Deployment's **Open Airflow** button in the Astronomer UI.

### Deploy Code

[Deploying code](deploy-code.md) is the process of bundling a locally hosted Astronomer project into an image and pushing that image to a Deployment on Astronomer Cloud.

### Cluster

A cluster is the highest level structure in the Data Plane. Each cluster:

- Exists in a specific region on your cloud.
- Contains a set of resources and configurations for running Airflow.
- Contains and runs Airflow code from Deployments that are hosted on the cluster.

When you create a new Deployment, you must choose a cluster to run the Deployment on.
