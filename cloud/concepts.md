---
sidebar_label: 'Astronomer Concepts'
title: 'Astronomer Cloud Concepts'
id: concepts
description: Lear about the concepts and components that comprise Astronomer Cloud.
---

## Overview

Astronomer Cloud enables companies to run Airflow at scale through additional functionality and infrastructure. This reference guide explains various concepts and components which are essential for understanding and managing the Astronomer platform.

## General Concepts

This section includes the highest level concepts and terms that comprise the Astronomer platform.

### Astronomer Cloud

Astronomer Cloud is a managed Apache Airflow service. It is based on a hybrid deployment model where a Control Plane is hosted by Astronomer and a Data Plane is hosted in your cloud environment. Both of these planes are fully managed by Astronomer.

### Control Plane

The Control Plane is a component of Astronomer Cloud that's hosted and managed by the Astronomer team. It is comprised of all features and dashboards accessible from the Astronomer UI, including:

- User management.
- Workspace/ Deployment management.
- Metrics.
- Authentication.

### Data Plane

The Data Plane is a component of Astronomer Cloud that's hosted in your cloud and managed by the Astronomer team. It is responsible for running Airflow environments and executing DAGs in your Deployments.

### Astronomer UI

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

### Deployment

### User

## Development Concepts

This section includes all terms related to writing and deploying code.

### Cluster

A cluster is the highest level structure in the Data Plane. Each cluster:

- Exists in a specific region on your cloud.
- Contains a set of resources and configurations for running Airflow.
- Contains and runs Airflow code from Deployments that are hosted on the cluster.

When you create a new Deployment, you must choose a cluster to run the Deployment on.

### Local Project/ Environment

### Astronomer Project

### Airflow UI

### Deploy Code
