---
sidebar_label: 'Overview'
title: 'Astronomer Cloud Documentation'
id: overview
slug: /
description: Run Apache Airflow on Astronomer Cloud. Scale data pipelines in your network, no infrastructure management required.
---

## Overview

Astronomer Cloud is a next generation software service that offers a managed Apache Airflow experience in your network. Astronomer Cloud is the easiest way to deploy, manage, and monitor data pipelines.

The Astronomer Cloud deployment model offers the self-service convenience of a fully managed data orchestration service powered by a Control Plane, while respecting the need to keep data private and secure within a Data Plane that runs in your network and corporate boundaries. This model optimizes for security whilst relieving your team of operational overhead.

## Features

Astronomer Cloud's architecture enables a few key features, available today:

- Easy-to-create Deployments of Apache Airflow
- Worker auto-scaling, powered by Airflow's Celery Executor + KEDA
- Support for a multi-tenant data plane hosted in your organization's network on AWS. Available in many regions
- Astronomer Runtime, a collection of Docker images that provides a differentiated data orchestration experience. Astronomer Runtime includes timely support for the latest major, minor, and patch versions of Airflow
- Role-based access control (RBAC) for configurable and secure user management
- Single Sign-On (SSO) solution that integrates with a variety of identity providers, including Azure Active Directory (Azure AD) and Okta
- An observability experience that gives you insight into the health and resource consumption of your tasks and pipelines in real-time

The following diagram outlines how the control plane, data plane, and users are connected to enable these features:

<div class="text--center">
  <img src="/img/docs/architecture-overview.png" alt="High level overview of Astronomer Cloud's architecture" />
</div>

## Get Started

The Astronomer team will schedule an onboarding session for your initial install. From there, we recommend reading through the following docs:

- [Install the Astronomer CLI](install-cli)
- [Develop Project](develop-project)
- [Configure your Deployment](configure-deployment.md)

If you have a feature request or a bug to report, reach out to [Astronomer Support](https://support.astronomer.io). We're here to help.

To check on the operational status of Astronomer Cloud, visit our [status page](https://cloud-status.astronomer.io). You can subscribe to updates by clicking on **Subscribe to Updates** on the top-right of the page and entering your email address.
