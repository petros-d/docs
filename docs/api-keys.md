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
- By default, a new API key is granted access to a Deployment via a token for 24 hours. After 24 hours, the token expires. To continue using an API key after 24 hours, you need to retrieve another token as described in [Reauthorize an API Key](api-keys#reauthorize-an-api-key).

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

## Reauthorize an API Key

By default, a new API key is granted access to a Deployment via a token for 24 hours. To continue using the API key after its cretion, you need to retrieve a new token at least every 24 hours. You can retrieve a new token using the following API call:

```curl
curl --location --request POST "https://auth.astronomer.io/oauth/token" \
        --header "content-type: application/json" \
        --data-raw "{
            \"client_id\": \"<deployment-key-id>\",
            \"client_secret\": \"<deployment-key-secret>\",
            \"audience\": \"astronomer-ee\",
            \"grant_type\": \"client_credentials\"}" | jq -r '.access_token'
```

We strongly recommend adding some form of this API call to any CI/CD pipelines that utilize Deployment API keys.

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
