---
title: 'Make Requests to the Apache Airflow API'
sidebar_label: 'Airflow API'
id: 'airflow-api'
---

## Overview

You can use Airflow's [REST API](https://airflow.apache.org/docs/apache-airflow/stable/stable-rest-api-ref.html) to automate various Airflow workflows in your Deployments.

If you're looking to externally trigger DAG runs without needing to access your Airflow Deployment directly, for example, you can make an HTTP request (in Python, cURL etc.) to the corresponding endpoint in Airflow's API.

## Prerequisites

To make an Airflow API request, you need:

- A Deployment on Astronomer Cloud
- [cURL](https://curl.se/)

## Step 1: Retrieve Access Token and URL

Before making an Airflow API request, you need to retrieve a few key pieces of information from Astronomer Cloud. Specifically, you need:

- An API key.
- A base Deployment URL.

### Retrieve an Access Token

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

### Retrieve a Deployment URL

To retrieve your Deployment URL, open your Deployment in the Astronomer UI and click **Open Airflow**. The base URL for the Airflow UI is your base Deployment URL. It includes your organization's URL, followed by a short Deployment ID (For example: `https://mycompany.astronomer.run/dhbhijp0`).

## Step 2: Make an Airflow API Request

With the information from Step 1, you can now run `GET` or `POST` requests to any supported endpoints in Airflow's [Rest API Reference](https://airflow.apache.org/docs/stable/rest-api-ref.html). For example, to retrieve a list of all DAGs in a Deployment, you can run:

```sh
curl -X GET <base-deployment-url>/api/v1/dags -H 'Accept: application/json' -H 'Cache-Control: no-cache' -H "Authorization: Bearer <api-key>"
```

Below, we'll walk through an example request via cURL to Airflow's "Trigger DAG" endpoint and an example request via Python to the "Get all Pools" endpoint.

## Example Requests

Use the following example API requests to begin automating your own Airflow actions. For more examples, see Airflow's [Rest API Reference](https://airflow.apache.org/docs/stable/rest-api-ref.html).

### Trigger a DAG

If you'd like to externally trigger a DAG run, you can start with a generic cURL command to Airflow's POST endpoint:

```
POST /airflow/api/v1/dags/<DAG_ID>/dag_runs
```

The command for your request should look like this:

```
curl -v -X POST
<base-deployment-url>/api/v1/dags/<dag-id>/dag_runs
-H 'Authorization: Bearer <api-key> ’
-H ‘Cache-Control: no-cache’
-H ‘content-type: application/json’ -d ‘{}’
```

This will trigger a DAG run for your desired DAG with an `execution_date` value of `NOW()`, which is equivalent to clicking the **Play** button in the main **DAGs** view of the Airflow UI.

#### Specify Execution Date

If you have a specific `execution_date` (i.e. start timestamp) to trigger your DAG on, you can pass that in with the data parameter's JSON value `("-d'{}')`.

The string needs to be in the following format (in UTC):

```
“YYYY-MM-DDTHH:MM:SS”
```

Where, `YYYY`: Year, `MM`: Month, `DD`: Day, `HH`: Hour, `MM`: Minute, `SS`: Second.

For example:

```
“2019-11-16T11:34:00”
```

Here, your request becomes:

```
curl -v -X POST
<base-deployment-url>/api/v1/dags/<dag-id>/dag_runs
-H ‘Authorization: <api-key>’
-H ‘Cache-Control: no-cache’
-H ‘content-type: application/json’ -d ‘{“execution_date”:“2019-11-16T11:34:00”}’
```

### Get All Pools

If you want to get all existing Pools from your Deployment, you can start with a generic Python command to Airflow's `GET` endpoint:

```
GET /api/v1/pools
```

Here, your request would look like this:

```python
python
import requests
token="<api-key>"
base_url="<base-deployment-url>"
resp = requests.get(
   url=base_url + "<base-deployment-url>/api/v1/pools",
   headers={"Authorization": token},
   data={}
)
print(resp.json())
>>>>  [{'description': 'Default pool', 'id': 1, 'pool': 'default_pool', 'slots': 128}]
```
