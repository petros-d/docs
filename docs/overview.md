---
sidebar_label: 'Overview'
title: 'Welcome to Astronomer Cloud'
id: overview
slug: /
---

## Overview

Welcome to the Private Beta Program for Astronomer Cloud. We're thrilled to have you onboard as 'Build Partners' as we launch the next generation of our product. We expect our teams to be in close communication throughout the program, and this page will serve as a home for official product documentation.

To start, Astronomer Cloud includes a game-changing deployment model that offers the self-service convenience of a fully managed Cloud service (the “Control Plane”) while respecting the need to keep data private, secure, and within corporate boundaries (the “Data Plane”).

This model optimizes for security whilst relieving your team of operational overhead. As we look beyond Private Beta to build a robust set of differentiating features, we very much look forward to hearing your feedback.

## Features

Astronomer Cloud's architecture enables a few key features, available in Private Beta:

- Support for Astronomer Cloud on AWS `us-east-1` and `us-west-2`.
- Worker auto-scaling, powered by Airflow's Celery Executor + KEDA.
- Astronomer Runtime, a new collection of Docker images set to provide a differentiated Airflow experience. Astronomer Runtime will initially support Airflow 2.1.1.
- Real-time, in-app chat support powered by Intercom.

The following diagram outlines how the control plane, data plane, and users are connected to enable these features:

<div class="text--center">
  <img src="/img/docs/architecture-overview.png" alt="High level overview of Astronomer Cloud's architecture" />
</div>

For more information on each of these features, explore the documentation links below. We will continue to make changes and release new features throughout the course of the Private Beta program with no expected disruption to your data pipelines.

## Get Started

Our team will reach out to yours to schedule an onboarding session for the initial install. From there, we recommend reading through the following docs:

- [Configure your Deployment](configure-deployment)
- [Install the Astronomer CLI (Private Beta)](install-cli)
- [Deploy Code](deploy-code)

If you have a feature request or find a bug to report, reach out to us in the in-app chat modal or drop us a note in our shared Slack Channel. You'll be connected directly with our Product team.

Once again, we sincerely appreciate your participation and can't wait to form an even deeper partnership with your team. Let's do this thing!
