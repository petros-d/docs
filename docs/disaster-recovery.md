---
sidebar_label: 'Disaster Recovery'
title: "Disaster Recovery"
id: disaster-recovery
description: Learn how Astronomer handles disaster recovery scenarios and how to best prepare your environment.
---

## Overview

The Astronomer Cloud Data Plane is designed to withstand and survive in-region Availability Zone (AZ) degradations and outages as described in [Resilience](resilience.md).

To withstand a full region outage and achieve near real-time recovery, Astronomer recommends provisioning at least two Astronomer clusters in alternate regions. For example, one cluster in AWS `us-east-1` and another in `us-west-2`. To ensure that both the primary and secondary clusters are in sync, we recommend deploying all changes to both.

To simplify the responsibility of maintaining two clusters, Astronomer plans to invest in cluster and Deployment syncing strategies in 2022. If you're interested in this functionality, please reach out and share feedback with [Astronomer Support](https://support.astronomer.io/).

## Full-Region Outages

In the case of a full region outage, Astronomer will re-provision your cluster(s) and all Deployments in an alternate region. The re-provisioning includes:

- Cluster, including all nodes and most cluster-level configuration.
- VPC.
- VPC Peering. Customers will need to re-accept peering request.
- Deployments and data pipelines.
- Environment Variables.
- API Keys.
- Alert Emails.

Astronomer will not be able to restore:

- VPC Routes configured by customers via AWS console.
- VPC Security Group rules configured by customers via AWS console.
- DAG history and task logs.
- XComs.
- Airflow configurations (Variables, Connections, Pools) *— unless they are part of a DAG image*.

Organization settings, Workspace settings, and user management configured in Astronomer's Control Plane will be unaffected by a region failure in the Data Plane.

Astronomer plans to address gaps in restoration as part of our 2022 roadmap. Please submit feedback to [Astronomer Support](https://support.astronomer.io/) if you are interested in joining the conversation.
