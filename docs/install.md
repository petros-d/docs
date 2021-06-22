---
sidebar_position: 1
sidebar_label: 'Installation'
id: install
---

# Install Astronomer Cloud on AWS

This guide provides all of the setup required to run Astronomer Cloud.

## Prerequisites:

Before completing this setup, make sure you have:

- A dedicated AWS account for Astronomer to provision resources (`us-east-1` or `us-west-2`).
- `CreateAccount` and `CreateRole` permissions on AWS.

Assuming 2 Astronomer Clusters, we will provision the following within your AWS account:

- 4 EC2 Instances (1 node per zone)
- 2 EKS clusters
- 2 Elastic IPs
- 4 subnets (2 public, 2 private).
- 1 Internet Gateway
- 2 NAT gateways
- 2 routes
- 2 route tables
- 1 VPC

If any of these AWS resources are on a private network, we can provide a VPC Peer option. To do so, you'll need to provide:

- Subnet CIDRs (RFC 1918 IP Space) that do not overlap with Subnet CIDRs currently in use by your organization.
- VPC Name / ID for peering with Astronomer (accessible through the [AWS VPC console](https://console.aws.amazon.com/vpc/)).
- The IP addresses of your DNS servers.

## Step 1: Get an AWS External ID from Astronomer

Astronomer will formally kick off your beta installation process by providing you with an external ID that allows us to connect to an AWS account in your environment.

In the next step, you'll use this external ID to provide Astronomer access with permission to provision resources within your cloud.

## Step 2: Create an AWS account and IAM role for Astronomer

First, follow [Amazon documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_create.html) to create a new AWS account for Astronomer within your organization.

With the external ID provided by Astronomer, create a new [admin IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html#getting-started_create-admin-group-console) for Astronomer. In the trust policy for this role, specify the external ID as described in [Amazon's documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).

## Step 3: Provide Cloud Information to Astronomer

Once your role is created, share the following information with Astronomer:

- The AWS region you want to host your first Astronomer cluster (`us-east-1` or `us-west-2`).
- The preferred name for your Astronomer cluster.
- Role ARN for the Astronomer role you created in AWS.

If any of your AWS resources are not accessible via a public network, additionally provide:

- Subnet CIDRs (RFC 1918 IP Space) that Astronomer can use. Ensure that these CIDRs do not overlap with existing CIDRs in use by your organization.
- VPC Name / ID for peering with Astronomer (Optional for VPC peering, accessible through the [AWS VPC console](https://console.aws.amazon.com/vpc/)).
- The IPs of your DNS servers so that Airflow tasks can resolve addresses for your resources.

Astronomer uses this information to access your AWS resources and provision one or more Astronomer clusters, as well as to create an initial Astronomer Workspace for your organization. These clusters manage and run all of the components necessary to create Deployments and execute Apache Airflow tasks.

## Step 4: Access Astronomer

Once your Astronomer cluster has been successfully provisioned in your environment, access Astronomer Cloud at https://hub.astronomer.io.

To authenticate, you can select Google or GitHub OAuth or input your email address and password. Once you create an account, your authentication method cannot be changed.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ba52eece-9c52-40e3-a2e7-6e4cdd57160e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ba52eece-9c52-40e3-a2e7-6e4cdd57160e/Untitled.png)

From here, you can log in to and begin testing out what Astronomer Cloud has to offer. When you first log in, you'll see your organization's initial Workspace. When you create a new Airflow Deployment in this Workspace, you'll see your newly-provisioned cluster as a selectable **Deployment Location**.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/93b9247e-9a7d-4fd2-a4c5-57c3c94a5dd4/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/93b9247e-9a7d-4fd2-a4c5-57c3c94a5dd4/Untitled.png)

For more information on changes and what to look out for, read [Gen2 Overview] and [Known Issues].

## Step 4a: Accept VPC peering request from Astronomer

If your organization has AWS resources that are not accessible through the public internet, you need to accept a VPC peering request from Astronomer after your representative has installed the platform. To accept Astronomer's VPC peering request, follow the steps in [this Amazon guide](https://docs.aws.amazon.com/vpc/latest/peering/create-vpc-peering-connection.html) to accept the request.

### Step 4b: Create new clusters

To create a new Kubernetes cluster for use on Astronomer Cloud, reach out to Astronomer. If you want to provision the cluster on the same AWS account, Astronomer will already have permission to complete this for you.

Once created, your new cluster will appear in the **Deployment Location** option when creating a new Deployment.

## Step 5: Install the Astronomer CLI

You'll need a specific beta version of the Astronomer CLI to begin deploying DAGs to your beta environment. In an empty directory on your local machine, run one of the following commands depending on your OS:

**macOS**

```bash
curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.1-gen2_darwin_amd64/astro -o astro && chmod +x astro
```

**Windows(powershell)**

```powershell
Invoke-WebRequest -Uri https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.1-gen2_windows_amd64/astro.exe -OutFile astro.exe
```

**Linux**

```bash
curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.1-gen2_linux_amd64/astro -o astro && chmod +x astro
```

This will download the beta version of the Astronomer CLI as an executable. Unlike with the publicly released CLI, commands must be run directly from your project directory (e.g. `/users/.../astro deploy`). To make running commands easier, we recommend adding the path to the executable to your [$PATH](https://linuxize.com/post/how-to-add-directory-to-path-in-linux/) environment variable.
