---
sidebar_label: 'Resilience'
title: "Resilience"
id: resilience
---

The Astronomer Cloud Control and Data planes are architected and deployed on major public clouds to take advantage of their resilient and highly available regions. Regions provide multiple physically separated and isolated Availability Zones (AZs), which are connected through low-latency, high-throughput, and highly redundant networking within a geographic region. Additionally, each AZ has independent power, cooling, and physical security.

Astronomer Cloud leverages AZs for both the Control (three AZs in one region) and Data planes (two AZs in one region). Control and Data planes are also segregated by Cloud providers, with plans to support more public clouds for the Data Plane. As a result, both planes are expected to survive and recover from an AZ outage, though may experience some degradation until the impacted resources are re-provisioned/promoted to a non-impacted AZ.

In the case of a full region failure of the Control plane, the services and data would be recovered in an alternate region (by Astronomer). Astronomer may pursue an always-on multi-region strategy in the future. As for the Data plane, Clusters impacted by a full regional outage will be restored to an alternate region (see Disaster Recovery for details).

Astronomer Cloud also provides DDoS protection, with always-on traffic monitoring and detection, and automatic attack mitigations.
