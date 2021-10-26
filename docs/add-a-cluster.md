---
sidebar_label: 'Add a Cluster'
title: "Add a New Cluster to Your Astronomer Installation"
id: 'update-iam-role-trust-relationship'
---

On Astronomer Cloud, you can configure multiple Clusters for hosting and running your data pipelines. By default, each Astronomer installation starts with 1 Cluster. This guide provides instructions for provisioning additional Clusters on your Astronomer installation.

## Prerequisites

To complete this setup, you need to have completed your Astronomer Cloud installation as described in [Install on AWS](install-aws).

## Setup

To add a new Cluster to your Astronomer installation:

1. Reach out to your Astronomer representative and request a new Cluster. For each new Cluster that you want to provision, your Astronomer representative will ask for the following information:

    - Your AWS Account ID
    - Your preferred name for the Cluster
    - The AWS region that you want to host the Cluster in (us-east-1 or us-west-2)

    For each new Cluster, your Astronomer representative will provide you with a unique External ID. Make note of this value for the next step.

2. In the AWS IAM console, [edit the `astronomer-remote-management` trust relationship](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/edit_trust.html) to include trust policies for your new Clusters.

    If you only have 1 Cluster deployed, you will see the following under **Policy Document**:

    ```yaml
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::406882777402:root"
          },
          "Action": "sts:AssumeRole",
          "Condition": {
            "StringEquals": {
              "sts:ExternalId": "<my-1st-ExternalID>"
            }
          }
        }
      ]
    }
    ```

    Add the trust policy for your new Cluster(s) below your existing Cluster. The trust policy should be the same as the policy for your existing cluster, but with a different External ID. For example, your complete policy document might look like the following:

    ```yaml
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::406882777402:root"
          },
          "Action": "sts:AssumeRole",
          "Condition": {
            "StringEquals": {
              "sts:ExternalId": "<your-1st-ExternalID>"
            }
          }
        },
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::406882777402:root"
          },
          "Action": "sts:AssumeRole",
          "Condition": {
            "StringEquals": {
              "sts:ExternalId": "<your-2nd-ExternalID>"
            }
          }
        }
      ]
    }
    ```

3. Click **Update Trust Policy** to apply the new trust relationship.
4. Notify Astronomer that you finished configuring the trust policy. From here, an Astronomer representative will finalize the Cluster installation and notify you when it's complete. Once the installation is complete, you should be able to select your new Cluster as a **Deployment Location** when [creating a new Deployment](configure-deployment).
