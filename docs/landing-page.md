---
sidebar_position: 1
slug: /
sidebar_label: 'Overview'
id: landing-page
---

# Overview

Welcome to Astronomer Cloud. This private beta showcases a major feature coming soon to Astronomer: Fully managed Airflow clusters, running entirely on your organization's cloud.

## How it works

Astronomer manages a Kubernetes cluster on your organization's cloud. This is the "Data Plane" of Astronomer: the subset of resources on your cloud which run Airflow and host your DAGs.

This cluster is managed by a "Control Plane" stack hosted by Astronomer. Through the Astronomer API, services on the Control Plane fully manage the security, maintenance, deployment, and all other day-to-day operations for the Airflow clusters on your cloud.

You can see how these two different planes interact with each other in the following diagram:

[Insert diagram here]

## Features

This new split-plane architecture enables a few key features for the next generation of Astronomer Cloud:

- KEDA autoscaling and intelligent sizing for all resources and Executor types
- Operator pattern for deployment and Day-2 resilience
- Downtime-free Airflow upgrades & patches

## About the Beta

Your beta installation of Astronomer Cloud will be continually updated as we make changes to the user experience and fix bugs based on your feedback. We anticipate delivering a new version of the beta every X weeks. Your beta installation will be automatically upgraded to these new versions without downtime or intervention.

To stay up-to-date on the latest changes to Beta, read the [Changelog] and [Known Issues]
