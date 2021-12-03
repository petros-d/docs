---
sidebar_label: 'Disaster Recovery'
title: "Disaster Recovery"
id: disaster-recovery
description: Learn how Astronomer handles disaster recovery scenarios and how to best prepare your own Clusters for potential disasters.
---

## Overview

Astronomer Cloud Data plane is designed to withstand and survive in-region Availability Zone (AZ) degradations and outages as described in [Resilience](resilience).

To withstand a full region outage and achieve near real-time recovery, Astronomer recommends provisioning and running secondary clusters in an alternate region pre-disaster. From here, we recommend deploying all changes to both primary and secondary cluster(s) to keep them in sync.

Astronomer plans to invest in cluster and deployment syncing strategies in 2022 to simplify and offload the responsibility from the customer. Please submit feedback to [Astronomer Support](https://support.astronomer.io/) if interested.

## Full-Region Outages

In the case of a full region outage, Astronomer will re-provision your Cluster(s) and all Deployments in an alternate region. The re-provisioning includes:

- Cluster (nodes, worker queues).
- VPC.
- VPC Peering (customer will need to re-accept peering request).
- Deployments with Pipelines.
- Environment Variables.
- API Keys.
- Alert Emails.

Astronomer will not be able to restore:

- VPC Routes configured via AWS console.
- VPC Security Group rules configured via AWS console.
- DAG history and Task logs.
- XComs.
- Airflow configurations (Variables, Connections, Pools) *— unless they are part of a DAG image*.

Please note that Organization settings, Workspace settings, and user/team management configured in the Control Plane will be unaffected by a region failure of a Data plane.

Astronomer plans to address gaps in restoration as part of our 2022 roadmap. Please submit feedback to [Astronomer Support](https://support.astronomer.io/) if you are interested in joining the conversation.
