---
sidebar_label: "Install the Platform"
id: install
title: Install Astronomer Cloud on AWS
---

## Overview

Welcome to Astronomer! We're excited to help you get started with the Astronomer Cloud Private Beta program on AWS. Below, you'll find instructions for how to complete the Astronomer Cloud install process, including prerequisites and the steps required for our team to provision resources within your AWS Account.

For the initial installation, Astronomer will provision a single Astronomer Cluster which hosts the resources and Apache Airflow components necessary to deploy DAGs and execute tasks. If you'd like to support more than 1 Astronomer Cluster, reach out to us.

For a complete list of the AWS resources that our team will provision in your AWS account, see [Resource Usage](resource-usage).

## Prerequisites

Before completing this setup, ensure that you have `CreateAccount` and `CreateRole` permissions on AWS.

### VPC Peering Prerequisites (Optional)

If any AWS resources are on a private network, you can choose between two options:

- Allow traffic via the public internet and use allow-lists for communication.
- Create a VPC Peering connection between the Astronomer's VPC and the VPCs for your broader network.

If you want to continue with the latter option, you'll additionally need:

- Subnet CIDRs (RFC 1918 IP Space). Make sure that these CIDRs do not overlap with existing CIDRs in use by your organization.
- VPC Name / ID for peering with Astronomer (accessible through the [AWS VPC console](https://console.aws.amazon.com/vpc/)).
- The IP addresses of your DNS servers.

## Step 1: Access Astronomer

Your Astronomer representative will kick off the beta installation by inviting you via email to the Astronomer Cloud platform.

When you first authenticate to Astronomer Cloud, you can sign in with a Google account, a GitHub account, or an email and password. Once you create an account, your authentication method cannot be changed.

<div class="text--center">
  <img src="/img/docs/login.png" alt="Astronomer Cloud login screen" />
</div>

When you first log in, you'll see a Workspace for your team named after the name of your Organization.

## Step 2: Create a New AWS Account

[Create a new account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) on your AWS cloud for Astronomer to work through. You need to configure only the minimum required details of the account, such as the account name, payment method, and contact information.

## Step 3: Share Information with Astronomer

Once your account is created, provide your Astronomer representative with:

- Your AWS Account ID
- Your preferred name for your Astronomer Cluster
- The AWS region that you want to host your Cluster (`us-east-1` or `us-west-2`).
- The preferred name for your Astronomer Cluster.

With this information, your Astronomer representative will:

- Provision an Astronomer Cluster according to the specifications above.
- Create an Astronomer Workspace for your organization.
- Invite your team to that Workspace.

## Step 4: Create an IAM Role for Astronomer

Once your Astronomer cluster has been created, your Astronomer representative will securely provide you with an External ID for connecting Astronomer to your AWS account. Save the External ID as a secret or some other secure format.

With the External ID, click [here](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/create/review?templateURL=https://astro-quickstart-us-west-2.s3.us-west-2.amazonaws.com/cloud-formation/customer-account.yaml&stackName=AstroCrossAccountIAMRole&param_AstroAccountId=406882777402) or run the following command to create an [admin IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html#getting-started_create-admin-group-console) for Astronomer in your new AWS account:

```bash
aws iam create-role --role-name astronomer-remote-management --assume-role-policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
        {
            \"Effect\": \"Allow\",
            \"Principal\": {
                \"AWS\": \"arn:aws:iam::406882777402:root\"
            },
            \"Action\": \"sts:AssumeRole\",
            \"Condition\": {
                \"StringEquals\": {
                \"sts:ExternalId\": \"$EXTERNAL_ID\"
                }
            }
        }
    ]
}"

aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AdministratorAccess --role-name astronomer-remote-management
```

The output of this command is a YAML file containing information about the role:

```yaml
{
  "Role":
    {
      "Path": "/",
      "RoleName": "astronomer-remote-management",
      "RoleId": "AROAZZTAM6QSYIFGCB37R",
      "Arn": "arn:aws:iam::673438299173:role/astronomer-remote-management",
      "CreateDate": "2021-06-30T17:47:39+00:00",
      "AssumeRolePolicyDocument":
        {
          "Version": "2012-10-17",
          "Statement":
            [
              {
                "Effect": "Allow",
                "Principal": { "AWS": "arn:aws:iam::406882777402:root" },
                "Action": "sts:AssumeRole",
                "Condition": { "StringEquals": { "sts:ExternalId": "" } },
              },
            ],
        },
    },
}
```

## Step 5: Begin the Installation

Let your Astronomer representative know that you completed the role creation step. From there, they'll configure all of the resources and connections on your cloud necessary for running Airflow.

This process can take some time. Wait for confirmation that the installation was successful before proceeding to the next step.

> **Note** If you need to VPC peer with Astronomer, additionally provide the following information to your Astronomer representative:
>
>- Subnet CIDRs (RFC 1918 IP Space).
>- VPC Name/ID and region for peering with Astronomer. This is accessible through the [AWS VPC console](https://console.aws.amazon.com/vpc/).
>- The IPs of your DNS servers.
>
> You then need to accept a VPC peering request from Astronomer after Astronomer Cloud is installed. To accept the request, follow [Creating and accepting a VPC peering connection](https://docs.aws.amazon.com/vpc/latest/peering/create-vpc-peering-connection.html) in AWS documentation.

## Step 6: Verify the Installation

Once your Astronomer representative has notified you that your Cluster has been created, you are ready to start deploying DAGs. Log in to Astronomer and create a new Deployment. If the installation was successful, your new Cluster will be selectable in **Deployment Location**:

<div class="text--center">
  <img src="/img/docs/deployment-loacation.png" alt="Astronomer UI New Deployment screen" />
</div>

## Next Steps

After installing the Astronomer beta, read the following to learn how to start deploying DAGs to your managed cloud:

- [Install CLI (Beta)](install-cli)
- [Deploy Code](deploy-code)
- [Configure Deployments](configure-deployments)
