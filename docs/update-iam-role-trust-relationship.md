---
sidebar_label: 'Update IAM Role Trust Relationship'
title: "Update IAM Role Trust Relationship"
id: 'update-iam-role-trust-relationship'
---

Astronomer Cloud supports multi-cluster deployments through an update to the trust relationship of the existing IAM Role created in [Step 3](https://docs.astronomer.io/install-aws#step-3-create-an-iam-role-for-astronomer) of the install guide.

To update the IAM Role Trust Relationship, follow the steps below.

1. Navigate to the [Identity and Access Management (IAM) console](https://console.aws.amazon.com/iamv2/home?#/home) on AWS
2. Under Access management > Roles, search for **astronomer-remote-management**
3. Under Trust relationships tab, click Edit trust relationship
4. If you only have 1 Cluster deployed, you will see:
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
5. Add the External ID for the new Cluster, as per example below:
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
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::406882777402:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "<my-2nd-ExternalID>"
        }
      }
    }
  ]
}
```
6. Click Update Trust Policy to apply the new trust relationship
7. Astronomer will now complete the install and configuration of your new Cluster
