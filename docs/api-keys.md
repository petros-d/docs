---
title: 'Manage Deployment API Keys'
sidebar_label: 'Deployment API Keys'
id: 'api-keys'
---

## Overview

This guide provides instructions for how to create API keys for your Astronomer Deployments. You can use Deployment API keys to programmatically deploy DAGs to a given Deployment on Astronomer, or to programmatically update a Deployment's Airflow environment via the Airflow API.

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

From here, you can copy the API Key and Secret for use in your API calls.

Alternatively, you can use a temporary access key. To retrieve a temporary access key, go to `cloud.astronomer.io/token` and copy the key that appears. This key is valid only for 24 hours.

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
<    /div>
