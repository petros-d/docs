---
title: 'Manage Deployment API Keys'
sidebar_label: 'Deployment API Keys'
id: 'api-keys'
---

## Overview

This guide provides instructions for how to create API keys for your Astronomer Deployments. You can use Deployment API keys to programmatically deploy DAGs to a given Deployment on Astronomer.

Deployment API keys have the following properties:

- They can deploy code to Astronomer (customizable permissions coming soon).
- They are deleted permanently if the corresponding Deployment is deleted.
- By default, a new API Key is granted access to a Deployment for 24 hours. As long as it's used within that period, the API Key will automatically refresh and be valid for another 24 hours after the moment it was used.

:::info

Deployment API keys are an improved and more secure version of [Service Accounts](https://www.astronomer.io/docs/enterprise/v0.25/deploy/ci-cd#step-1-create-a-service-account), which are available in other Astronomer products.

:::

This guide provides steps for creating and deleting Deployment API keys.

## Create an API Key

To create an API key for a Deployment:

1. In the Astronomer UI, open your Deployment.
2. In the **API Keys** menu, click **Add API Key**:

    <div class="text--center">
      <img src="/img/docs/add-api-key.png" alt="Add API Key button" />
    </div>

3. Give the key a name and description, then click **Create API Key**:

    <div class="text--center">
      <img src="/img/docs/create-api-key.png" alt="Create API Key button" />
    </div>

From here, you can copy the API key ID and secret for use in API calls and CI/CD pipelines. Make sure to save this key secret securely, as this is the only time you will have access to see it in plain text.

:::tip

If you just need to make a single API call, you can use a temporary access token instead of a key secret. To retrieve a temporary access key, go to `cloud.astronomer.io/token` and copy the key that appears. This key is valid only for 24 hours.

:::

## Delete an API Key

To delete a Deployment API Key:

1. In the Astronomer UI, open your Deployment.
2. In the menu for the API key you want to delete, click **Edit**:

    <div class="text--center">
      <img src="/img/docs/edit-api-key.png" alt="Edit API Key button" />
    </div>

3. Click **Delete API Key**, then follow the onscreen prompt to finalize the deletion:

    <div class="text--center">
      <img src="/img/docs/delete-api-key.png" alt="Delete API Key button" />
    </div>
