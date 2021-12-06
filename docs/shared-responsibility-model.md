---
sidebar_label: 'Shared Responsibility Model'
title: "Shared Responsibility Model"
id: shared-responsibility-model
---

## Overview

Astronomer's highest priority is the security and reliability of your tasks. As an Astronomer Cloud customer, you benefit from a fully-managed data orchestration platform that meets the requirements of the most security-sensitive organizations.

Astronomer Cloud operates on a model of shared responsibility, which means that both the Astronomer team and Astronomer customers are responsible for the security of the platform. This document specifies areas of security ownership for both Astronomer customers and the Astronomer team.

## Astronomer's Security Responsibilities

Astronomer is responsible for providing a secure and reliable managed service offering, including:

- Managing the Control Plane and core services (Cloud UI, Cloud API, Deployment Access, and Cloud Image Repository).
- Securing authentication and authorization to all interfaces (UI, API, and CLI).
- Automating provisioning, scaling, and configuration management of Astronomer Cloud resources in the Data Plane.
- Completing ongoing maintenance (currency, hardening, patching) and uptime monitoring of Astronomer Cloud [resources](resource-reference-aws.md) in the Data Plane.
- Maintaining data encryption (at rest/in flight) of Astronomer managed components (Control and Data Planes).
- Consistently releasing production-ready and supported distributions of [Astronomer Runtime](upgrade-runtime.md) for net-new and to-be-upgraded Deployments.

## Customer's Security Responsibilities  

The customer is responsible for managing certain security aspects of their Astronomer Cloud Organization and Deployments, including:

- Managing roles and permissions of users and API keys within their organization and Workspace(s).
- Storing and retrieving [API keys](api-keys.md), connections, and [environment variables](environment-variables.md) for data pipelines.
- Integrating with their federated identity management platform for secure single sign-on (SSO) authentication and customer managed credentials.
- Developing and maintaining data pipelines with security and quality coding best practices, inclusive of vulnerability management of plugins and dependencies.
- Regularly [upgrading their Deployment(s)](upgrade-runtime.md) to the latest Astronomer Runtime version to take advantage of new functionality, as well as bug and security fixes.
- [Configuring and managing Deployment resource settings](configure-deployment.md) for data pipeline workloads.
- [Securing the network communications](install-aws.md#step-4-let-astronomer-complete-the-install) between their Data Plane and sensitive data resources.
