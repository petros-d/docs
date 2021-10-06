---
title: 'Manage Deployment API Keys'
sidebar_label: 'Deployment API Keys'
id: 'api-keys'
---

## Overview

This guide provides instructions for how to create API keys for Deployments on Astronomer. You can use API keys to programmatically deploy DAGs to a Deployment on Astronomer.

Deployment API keys have the following properties:

- They can deploy code to Astronomer (customizable permissions coming soon).
- They are deleted permanently if the corresponding Deployment is deleted.
- By default, an API key is granted access to a Deployment via an access token that is valid for 24 hours. After 24 hours, the access token expires. To continue using an API key after 24 hours, you need to retrieve another token as described in [Refresh Access Token](api-keys#refresh-access-token).

This guide provides steps for creating and deleting Deployment API keys.

:::tip

Deployment API keys are an improved and more secure iteration of [Service Accounts](https://www.astronomer.io/docs/enterprise/v0.25/deploy/ci-cd#step-1-create-a-service-account), which are available in other Astronomer products.

:::

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

From here, you can copy the API key ID and secret for use in API calls and CI/CD pipelines. The API key ID and secret are equivalent to a username and password that last indefinitely unless explicitly changed. Make sure to save the key secret securely, as this is the only time you will have access to see it in plain text.

:::tip

If you just need to make a single API call, you can use a temporary user authentication token instead of a Deployment API key ID and secret pair. To retrieve a temporary authentication token, go to `cloud.astronomer.io/token` and copy the token that appears. This token is valid only for 24 hours.

:::

## Refresh Access Token

In order for a machine or process to deploy code to a Deployment on Astronomer, a Deployment API key ID and secret are used to generate an access token that is valid for 24 hours. This access token is what has permissions to deploy code. To continue using an API key after its creation, you need to retrieve a new access token either every 24 hours or every time you need it if longer than 24 hours. To retrieve a new access token with an existing API key ID and secret, run the following API request:

```curl
curl --location --request POST "https://auth.astronomer.io/oauth/token" \
        --header "content-type: application/json" \
        --data-raw "{
            \"client_id\": \"<api-key-id>\",
            \"client_secret\": \"<api-key-secret>\",
            \"audience\": \"astronomer-ee\",
            \"grant_type\": \"client_credentials\"}" | jq -r '.access_token'
```

Make sure to replace `api-key-id` and `api-key-secret` in this request with values that correspond to your own API key. We strongly recommend adding some form of this API request to any CI/CD pipelines that utilize Deployment API keys. For more information, see [CI/CD on Astronomer](ci-cd).

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
