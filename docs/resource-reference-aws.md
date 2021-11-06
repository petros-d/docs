---
sidebar_label: "AWS Resource Reference"
title: "Resources Required for Astronomer Cloud on AWS"
id: resource-reference-aws
---

## Overview

Unless otherwise specified, new Clusters on Astronomer Cloud are created with a set of default AWS resources that our team has deemed appropriate for most use cases.

Read the following document for a reference of our default resources as well as supported Cluster configurations that you can request at any time, including **AWS Region** and **Node Instance Type**.

## Defaults

| Resource                                                                                             | Description                                                                                                                                                                                                                     | Quantity / Default Size |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| [EKS Cluster](https://aws.amazon.com/eks)                                                            | An EKS cluster is required to run the Astronomer Cloud Data Plane, which hosts the resources and data required to execute Airflow tasks.                                                                                        | 1x                      |
| [EC2 Instances](https://aws.amazon.com/ec2/instance-types/)                                          | EC2 instances (nodes) power the system and Airflow components (Webserver, Scheduler, Workers). EC2 instances auto-scale for additional Airflow Deployments.                                            | 2x m5.xlarge          |
| [RDS for PostgreSQL Instance](https://aws.amazon.com/rds/)                                           | The RDS instance is the primary database of the Astronomer Cloud Data Plane. It hosts a metadata database for each Airflow Deployment hosted on the EKS cluster.                                                       | 1x db.r5.large        |
| [Elastic IPs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)     | Elastic IPs are required for connectivity with the Control Plane, and other public services.                                                                                                                                    | 2x                      |
| [Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)                         | Subnets are provisioned in 2 different [Availability Zones (AZs)](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) for redundancy, with 1 public and 1 private subnet per AZ. Public subnets are required for the NAT and Internet gateways, while private subnets are required for EC2 nodes.          | 2x /26 and 2x /22       |
| [Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html)       | Required for connectivity with the Control Plane and other public services.                                                                                                                                                    | 1x                      |
| [NAT Gateways](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)                | NAT Gateways translate outbound traffic from private subnets to public subnets.                                                                                                                                                 | 2x                      |
| [Routes](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html#route-table-routes)  | Routes are necessary to direct network traffic from the subnets and gateways.                                                                                                                                                   | 2x                      |
| [Route Tables](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)               | Home for the routes.                                                                                                                                                                                                            | 2x                      |
| [VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)                      | Virtual network for launching and hosting AWS resources.                                                                                                                                                                        | 1x /19                  |

## Supported Cluster Configurations

Depending on the needs of your team, you may be interested in modifying certain configurations of a new or existing Cluster on Astronomer Cloud. This section provides a reference for which configuration options are supported.

To create a new Cluster on Astronomer Cloud with a specified configuration, read [Install on AWS](install-aws) or [Create a Cluster](create-cluster). For instructions on how to make a change to an existing Cluster, read [Modify a Cluster](modify-cluster).

### AWS Region

Astronomer Cloud supports the following AWS regions:

- `us-east-1`
- `us-east-2`
- `us-west-`
- `ca-central-1`

### Node Instance Type

Astronomer Cloud supports a variety of AWS EC2 instance types. Instance types comprise of varying combinations of CPU, memory, storage, and networking capacity. All system and Airflow components within a single Cluster are powered by the nodes specified during the Cluster creation or modification process.

For detailed information on each instance type, reference [AWS documentation](https://aws.amazon.com/ec2/instance-types/). If you're interested in a node type that is not on this list, reach out to [Astronomer Support](https://support.astronomer.io).

:::info

Currently, a single Cluster on Astronomer Cloud cannot be configured with more than one node instance type. In early 2022, we expect to introduce support for Worker Queues, which will allow you to run Airflow Workers of varying node types and sizes within a single Deployment. If this is something your team is interested in, reach out to us - we'd love to hear from you.

:::

**m5**
   - m5.large
   - m5.xlarge
   - m5.2xlarge
   - m5.4xlarge (*default*)
   - m5.8xlarge
   - m5.12xlarge
   - m5.16xlarge
   - m5.24xlarge
   - m5.metal

**m5d**
   - m5d.large
   - m5d.xlarge
   - m5d.2xlarge
   - m5d.4xlarge
   - m5d.8xlarge
   - m5d.12xlarge
   - m5d.16xlarge
   - m5d.24xlarge
   - m5d.metal

**t2**
   - t2.xlarge

**t3**
   - t3.nano
   - t3.micro
   - t3.small
   - t3.medium
   - t3.large
   - t3.2xlarge

:::tip

With the exception of `m5d` nodes, all suppported node types have a maximum of 20GB of storage per node. If you need more than 20GB of storage, we recommend modifying your cluster to run `m5d` nodes, which Astronomer provisions with NVMe SSDs out-of-the-box.

Keep in mind that passing significant ephemeral storage is not recommended and can be a risk to infrastructure resilience. If you need to pass significant data between Airflow tasks, we recommend using an [XCom backend](https://airflow.apache.org/docs/apache-airflow/stable/concepts/xcoms.html) such as AWS S3 or Google Cloud Storage (GCS). For more information and best practices, read our Airflow Guide on [Passing Data Between Airflow Tasks](https://www.astronomer.io/guides/airflow-passing-data-between-tasks).

:::
