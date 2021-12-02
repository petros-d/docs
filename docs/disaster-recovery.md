---
sidebar_label: 'Disaster Recovery'
title: "Disaster Recovery"
id: disaster-recovery
---

Astronomer Cloud Data plane is designed to withstand and survive in-region AZ degradations/outages as described in the Resilience doc.

To withstand a full region outage and achieve near real-time recovery, Astronomer recommends provisioning (pre-disaster) and running a secondary cluster(s) in an alternate region. It is important, to deploy all changes and configurations to both primary and secondary cluster(s) to keep them in sync.

Astronomer plans to invest in cluster and deployment syncing strategies in 2022 to simplify and offload the responsibility from the customer. Please submit feedback to [Astronomer Support](https://support.astronomer.io/) if interested.

In the case of a full region outage, Astronomer will re-provision your cluster(s) and all deployments in an alternate region (region pair), as configured via the Cloud UI/API. This is inclusive of:

- Cluster (nodes, worker queues)
- VPC
- VPC Peering (customer will need to re-accept peering request)
- Deployments with Pipelines
- Environment Variables
- API Keys
- Alert Emails

Astronomer will not be able to restore:

- VPC Routes (configured by customer via AWS console)
- VPC Security Group rules (configured by customer via AWS console)
- DAG history and Task logs
- XComs
- Airflow configurations (Variables, Connections, Pools) *— unless part of DAG image*

Please note, organization and workspace settings, and user/team management configured in the Control plane will be unaffected by a region failure of a Data plane.

Astronomer plans to address the gaps in restoration as part of our 2022 roadmap. Please submit feedback to [Astronomer Support](https://support.astronomer.io/) if interested.
