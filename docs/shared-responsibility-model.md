---
sidebar_label: 'Shared Responsibility Model'
title: "Shared Responsibility Model"
id: 'shared-responsibility-model'
---

Astronomer's highest priority is the security and reliability of your tasks. As an Astronomer Cloud customer, you benefit from a fully-managed data orchestration platform that meets the requirements of the most security-sensitive organizations.

Security is a shared responsibility between Astronomer and you (the customer), as described below.

## Astronomer's Security Responsibilities

Astronomer is responsible for providing a secure and reliable managed service offering, including:

- [Control Plane](https://docs.astronomer.io/#features) and core services (Cloud UI, Cloud API, Deployment Access, Cloud Image Repository)
- Secure authentication and authorization to all interfaces (UI, API, CLI)
- Automated provisioning, scaling, and configuration management of Astronomer Cloud resources in the Data Plane
- Ongoing maintenance (currency, hardening, patching) and uptime monitoring of Astronomer Cloud [resources](https://docs.astronomer.io/resource-reference-aws) in the Data Plane
- Data encryption (at rest/in flight) of Astronomer managed components (Control and Data Planes)
- Latest production-ready and supported distribution of [Astronomer Runtime](https://docs.astronomer.io/upgrade-runtime) available for net-new and to be upgraded Deployments

## Customer Security Responsibilities  

The customer is responsible for managing certain security aspects of their Astronomer Cloud Organization and Deployments, including:

- Invite, remove, and manage roles and permissions of users and API keys within your organization and workspace(s)
- [Store and retrieve](https://docs.astronomer.io/environment-variables) API keys, connections and environment variables for your data pipelines
- Integrate with your federated identity management platform for secure single sign-on (SSO) authentication and customer managed credentials
- Develop and maintain data pipelines with security and quality coding best practices, inclusive of vulnerability management of your plugins and dependencies
- [Regularly upgrade your Deployment(s)](https://docs.astronomer.io/upgrade-runtime) to the latest Astronomer Runtime to take advantage of new functionality, as well as bug and security fixes
- [Configure and manage Deployment resource settings](https://docs.astronomer.io/configure-deployment) for your data pipeline workloads
- [Secure the network communications](https://docs.astronomer.io/install-aws#step-4-let-astronomer-complete-the-install) between your Data Plane and sensitive data resources
