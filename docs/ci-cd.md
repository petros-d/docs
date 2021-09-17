---
sidebar_label: 'CI/CD'
title: 'Configure CI/CD Pipelines for Deployments'
id: 'ci-cd'
---

## Overview

There are many benefits to deploying DAGs and other changes to Airflow via a CI/CD workflow. Specifically, you can:

- Deploy new and updated DAGs in a way that streamlines the development process amongst team members.
- Decrease the maintenance cost of integrating changes, allowing your team to quickly respond in case of an error or failure.
- Enforce continuous, automating testing, which increases code quality and protects your DAGs in production.

This guide provides setup steps for configuring a CI/CD pipeline to deploy DAGs on Astronomer Cloud.

## Prerequisites

To set up CI/CD for a given Deployment, you need:

- A [Deployment API key and secret](deployment-api-keys)
- An Organization ID. To find this, go to **Settings** > **Organization** in the Astronomer UI and copy the Organization ID that appears
- A Deployment ID. To find this, open your Deployment in the Astronomer UI and click **Open Airflow**. The Deployment ID is the unique string in the URL for the Airflow UI. (e.g. `dpru1b0d` is the ID in `https://mycompany.astronomer.run/dpru1b0d/home`).
- A CI/CD management tool, such as GitHub actions
- An Airflow project directory hosted in a place that your CI/CD tool can access
- Docker
- curl

## Workflow Overview

This section provides a high level overview of how CI/CD scripts connect to the Astronomer registry and push DAGs. Regardless of what CI/CD tool you use, your pipeline needs to complete these key steps.

You can also use this section to manually test the API calls that will complete these steps in your script.

At a high level, your CI/CD script will:

1. Log in to your Astronomer registry for your Deployment using a Deployment API key.
2. Build your Airflow project into a Docker image.
3. Deploy the image to your Deployment.

This workflow is equivalent to the following API calls:

1. Log in to the Astronomer registry:

    ```sh
    ## API call
    $ curl --location --request POST 'https://auth.astronomer.io/oauth/token' \
    --header 'content-type: application/json' \
    --data-raw '{
        "client_id": "${API_KEY_ID}",
        "client_secret": "${API_KEY_SECRET}",
        "audience": "astronomer-ee",
        "grant_type":"client_credentials"
    }'

    ## Expected response
    {
    	"access_token": "${ACCESS_TOKEN}",
    	"scope": "deployment:${DEPLOYMENT_ID}",
    	"expires_in": 86400,
    	"token_type": "Bearer"
    }
    ```

2. Build the Docker image:

    ```sh
    ## API call
    $ curl --location --request POST 'https://api.astronomer.io/hub/v1' \
    --header 'Authorization: Bearer ${ACCESS_TOKEN}' \
    --header 'Content-Type: application/json' \
    --data-raw '{"query":"mutation imageCreate(\n    $input: ImageCreateInput!\n) {\n    imageCreate (\n    input: $input\n) {\n    id\n    tag\n    repository\n    digest\n    env\n    labels\n    deploymentId\n  }\n}","variables":{"input":{"deploymentId":"${DEPLOYMENT_ID}","tag":"${DEPLOYMENT_TAG}"}}}'
    ```

3. Deploy the Docker image:

    ```sh
    ##  API call
    curl --location --request POST 'https://api.astronomer.io/hub/v1' \
    --header 'Authorization: Bearer ${ACCESS_TOKEN}' \
    --header 'Content-Type: application/json' \
    --data-raw '{"query":"mutation imageDeploy(\n    $input: ImageDeployInput!\n  ) {\n    imageDeploy(\n      input: $input\n    ) {\n      id\n      deploymentId\n      digest\n      env\n      labels\n      name\n      tag\n      repository\n    }\n}","variables":{"input":{"id":"${IMAGE_ID}","tag":"${DEPLOYMENT_TAG}","repository":"images.astronomer.cloud/${ORGANIZTION_ID}/${DEPLOYMENT_ID}"}}}'
    ```

## CI/CD Templates

The following section provides basic templates for configuring single CI/CD pipelines using popular CI/CD tools. Each template can be implemented as-is to produce a simple CI/CD pipeline, but they can also be reconfigured to manage any number of branches or Deployments based on your needs. More templates are coming soon.

### GitHub Actions

Use this GitHub Action in a repository that:

- Hosts a single Airflow project created with `astro dev init`.
- Has your Deployment API key information stored in [GitHub secrets](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).

```yaml
name: CI - deploy

on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      ORGANIZATION_ID: <organization-id>
      DEPLOYMENT_ID: <deployment-id>
    steps:
    - name: Get current date
      id: date
      run: echo "::set-output name=date::$(date +'%Y-%m-%d-%HT%M-%S')"
    - uses: actions/checkout@v1
    - name: Publish to Astronomer.io
      uses: elgohr/Publish-Docker-Github-Action@2.6
      with:
        name: ${{ env.ORGANIZATION_ID }}/${{ env.DEPLOYMENT_ID }}:deploy-${{ steps.date.outputs.date }}
        username: ${{ secrets.KEY_ID }}
        password: ${{ secrets.KEY_SECRET }}
        registry: images.astronomer.cloud

    - name: Get auth token
      id: token
      run: |
        token=$( curl --location --request POST 'https://auth.astronomer.io/oauth/token' \
        --header 'content-type: application/json' \
        --data-raw '{ "client_id": "${{ secrets.KEY_ID }}","client_secret": "${{ secrets.KEY_SECRET }}","audience": "astronomer-ee","grant_type":"client_credentials"}' | jq -r '.access_token' )
        echo "::set-output name=auth_token::$token"

    - name: Create image
      id: image
      run: |
        image=$( curl --location --request POST 'https://api.astronomer.io/hub/v1' \
        --header 'Authorization: Bearer ${{ steps.token.outputs.auth_token }}' \
        --header 'Content-Type: application/json' \
        --data-raw '{"query":"mutation imageCreate(\n    $input: ImageCreateInput!\n) {\n    imageCreate (\n    input: $input\n) {\n    id\n    tag\n    repository\n    digest\n    env\n    labels\n    deploymentId\n  }\n}","variables":{"input":{"deploymentId":"${{ env.DEPLOYMENT_ID }}","tag":"deploy-${{ steps.date.outputs.date }}"}}}' | jq -r '.data.imageCreate.id')
        echo "::set-output name=image_id::$image"

    - name: Deploy image
      run: |
        curl --location --request POST 'https://api.astronomer.io/hub/v1' \
        --header 'Authorization: Bearer ${{ steps.token.outputs.auth_token }}' \
        --header 'Content-Type: application/json' \
        --data-raw '{"query":"mutation imageDeploy(\n    $input: ImageDeployInput!\n  ) {\n    imageDeploy(\n      input: $input\n    ) {\n      id\n      deploymentId\n      digest\n      env\n      labels\n      name\n      tag\n      repository\n    }\n}","variables":{"input":{"id":"${{ steps.image.outputs.image_id }}","tag":"deploy-${{ steps.date.outputs.date }}","repository":"images.astronomer.cloud/${{ env.ORGANIZATION_ID }}/${{ env.DEPLOYMENT_ID }}"}}}'
```
