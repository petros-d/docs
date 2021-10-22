---
sidebar_label: 'Shared Responsibility Model'
title: "Shared Responsibility Model"
id: 'shared-responsibility-model'
---

Astronomer Cloud security and reliability of customer tasks is the highest priority. As an Astronomer Cloud customer, you benefit from a fully-managed data orchestration platform, that is built to meet the requirements of the most security-sensitive organizations.

Security is a shared responsibility between Astronomer and you (the customer), as described below.

**Security of the Astronomer Cloud** - Astronomer is responsible for providing a secure and reliable managed service offering, inclusive of:

- [Control Plane](https://docs.astronomer.io/#features) and core services (Cloud UI, Cloud API, Deployment Access, Cloud Image Repository)
- Secure authentication and authorization to all interfaces (UI, API, CLI)
- Automated provisioning, scaling, and configuration management of Astronomer Cloud resources in the Data Plane
- Ongoing maintenance (currency, hardening, patching) and uptime monitoring of Astronomer Cloud resources in the Data Plane
- Data encryption (at rest/in flight) of Astronomer managed components
- Latest production-ready and supported distribution of [Astronomer Runtime](https://docs.astronomer.io/upgrade-runtime) available for net-new and to be upgraded Deployments

**Security in the Astronomer Cloud** - The customer is responsible for configuration and consumption of their Astronomer Cloud Organization and Deployments, inclusive of:

- Invite, remove, and manage roles and permissions of users and API keys within your organization and workspace(s)
- [Store and retrieve API keys, connections and environment variables for your data pipelines](https://docs.astronomer.io/environment-variables)
- Enforce strong password policies for Astronomer Cloud users or integrate with your federated identity management platform
- Develop and maintain data pipelines with security and quality coding best practices, inclusive of vulnerability management of your plugins and dependencies
- [Regularly upgrade your Deployment(s) to the latest Astronomer Runtime to take advantage of new functionality, as well as bug and security fixes](https://docs.astronomer.io/upgrade-runtime)
- [Configure and manage Deployment resource settings for your data pipeline workloads](https://docs.astronomer.io/configure-deployment)
- Secure the network communications between your Data Plane and sensitive data resources
