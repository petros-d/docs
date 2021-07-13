---
sidebar_label: 'Install on AWS'
title: 'Install Astronomer Cloud on AWS'
id: 'install-aws'
---

## Overview

We're excited to help you get started with the Private Beta Program for Astronomer Cloud on AWS. Below, you'll find instructions for how to complete the Astronomer Cloud install process, including prerequisites and the steps required for our team to provision resources in your network.

At a high-level, we'll ask that you come prepared with a new AWS account. From there, you can expect to:
- Create an account on Astronomer.
- Share AWS account information with our team.
- Create an IAM role that Astronomer can assume within your new AWS account.

Astronomer will then create a Cluster within your AWS account that hosts the resources and Apache Airflow components necessary to deploy DAGs and execute tasks. If you'd like to support more than 1 Astronomer Cluster, reach out to us.

For a complete list of the AWS resources that our team will provision in your AWS account, see [Resource Usage](resource-reference-aws).

## Prerequisites

Before completing this setup, you will need:

- A new AWS account.
- A user that has `CreateAccount` and `CreateRole` permissions on that account.

For instructions, follow [AWS documentation](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). Once your AWS account is created, proceed to Step 1.

### VPC Peering Prerequisites (Optional)

If any AWS resources are on a private network, you can choose between two options:

- Allow traffic via the public internet and use allow-lists for communication.
- Create a VPC Peering connection between Astronomer's VPC and the VPCs for your broader network.

If you want to continue with the second option, you'll additionally need:

- Subnet CIDRs (RFC 1918 IP Space). Make sure that these CIDRs do not overlap with existing CIDRs in use by your organization.
- VPC Name / ID for peering with Astronomer (accessible through the [AWS VPC console](https://console.aws.amazon.com/vpc/)).
- The IP addresses of your DNS servers.

## Step 1: Access Astronomer

To begin the Astronomer Cloud install process, first create an account at https://beta.astronomer.io/.

When you first authenticate to Astronomer Cloud, you can sign in with a Google account, a GitHub account, or an email and password. Once you create an account, your authentication method cannot be changed.

<div class="text--center">
  <img src="/img/docs/login.png" alt="Astronomer Cloud login screen" />
</div>

Once you log in, you'll see a screen that says: "Welcome to Astronomer Cloud Private Beta! Please contact your Workspace Admin to be added to the system."

If you're the first person from your team to authenticate, the Astronomer team will add you as a Workspace Admin to a new Workspace named after your Organization. From there, you'll be able to add other team members to that Workspace without Astronomer's assistance.

## Step 2: Share Information with Astronomer

For the AWS account you created as a prerequisite, provide Astronomer with:

- Your AWS Account ID.
- Your preferred Astronomer Cluster name.
- The AWS region that you want to host your Cluster in (`us-east-1` or `us-west-2`).

From here, our team will provision an Astronomer Cluster according to the specifications above.

## Step 3: Create an IAM Role for Astronomer

Once your Astronomer Cluster has been created, an Astronomer team member will provide you with an [External ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) that will allow Astronomer to connect to your AWS account. Save the External ID as a secret or in an otherwise secure format.

Depending on your desired AWS region, click on one of the following links to create an [admin IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html#getting-started_create-admin-group-console) for Astronomer in your new AWS account:

- [us-west-2](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/create/review?templateURL=https://astro-quickstart-us-west-2.s3.us-west-2.amazonaws.com/cloud-formation/customer-account.yaml&stackName=AstroCrossAccountIAMRole&param_AstroAccountId=406882777402)
- [us-east-1](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://astro-quickstart-us-east-1.s3.us-east-1.amazonaws.com/cloud-formation/customer-account.yaml&stackName=AstroCrossAccountIAMRole&param_AstroAccountId=406882777402)

Alternatively, run the following AWS CLI command:

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

## Step 4: Let Astronomer Complete the Install

Let our team know once you've created the admin IAM role for Astronomer. From there, we will finish creating an Astronomer Cluster in your AWS account that supports Apache Airflow environments.

This process can take some time. Wait for confirmation that the installation was successful before proceeding to the next step.

> **Note**: If you need to VPC peer with Astronomer, additionally provide the following information to your Astronomer representative:
>
>- Subnet CIDRs (RFC 1918 IP Space).
>- VPC Name/ID and region for peering with Astronomer. This is accessible through the [AWS VPC console](https://console.aws.amazon.com/vpc/).
>- The IPs of your DNS servers.
>
> You then need to accept a VPC peering request from Astronomer after Astronomer Cloud is installed. To accept the request, follow [Creating and accepting a VPC peering connection](https://docs.aws.amazon.com/vpc/latest/peering/create-vpc-peering-connection.html) in AWS documentation.

## Step 5: Create a Deployment

Once our team confirms that your Astronomer Cluster has been created, you are ready to create a Deployment and start deploying DAGs. Log in to [the Astronomer UI](https://beta.astronomer.io) again and create a new Deployment. If the installation was successful, your new Astronomer Cluster will be listed as an option in the **Deployment Location**:

<div class="text--center">
  <img src="/img/docs/deployment-location.png" alt="Astronomer UI New Deployment screen" />
</div>

## Next Steps

Now that you have an Astronomer Cluster up and running, take a look at the docs below for information on how to install the Astronomer CLI, configure your Deployment, and start deploying DAGs.

- [Install CLI (Private Beta)](install-cli)
- [Configure Deployments](configure-deployment)
- [Deploy Code](deploy-code)
