---
sidebar_label: 'Overview'
title: 'Welcome to Astronomer Cloud'
id: overview
slug: /
---

## Overview

Welcome to Astronomer Cloud. We're thrilled to have you onboard as we launch the next generation of our product. This page will serve as a home for official product documentation for Astronomer Cloud.

To start, Astronomer Cloud includes a game-changing deployment model that offers the self-service convenience of a fully managed Cloud service (the “control plane”) while respecting the need to keep data private, secure, and within corporate boundaries (the “data plane”).

This model optimizes for security whilst relieving your team of operational overhead. We have a strong foundation available today and look forward to hearing your feedback as we build a robust set of differentiating features.

## Features

Astronomer Cloud's architecture enables a few key features, available today:

- A secure control plane managed by Astronomer
- Support for a multi-tenant data plane hosted in your organization's network on AWS 
- Worker auto-scaling, powered by Airflow's Celery Executor + KEDA
- Astronomer Runtime, a new collection of Docker images set to provide a differentiated Airflow experience

The following diagram outlines how the control plane, data plane, and users are connected to enable these features:

<div class="text--center">
  <img src="/img/docs/architecture-overview.png" alt="High level overview of Astronomer Cloud's architecture" />
</div>

For more information on each of these features, explore the documentation links below. We will continue to make changes and release new features with no expected disruption to your data pipelines.

## Get Started

Our team will reach out to yours to schedule an onboarding session for the initial install. From there, we recommend reading through the following docs:

- [Install the Astronomer CLI](install-cli)
- [Develop Locally](develop-locally)
- [Configure your Deployment](configure-deployment)

If you have a feature request or find a bug to report, reach out to us at support@astronomer.io or drop our team a note in our shared Slack Channel. You'll be connected directly with our Product team.
