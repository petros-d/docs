---
title: 'Configure an External Secrets Backend on Astronomer Cloud'
sidebar_label: 'Configure a Secrets Backend'
id: secrets-backend
description: Configure a secrets backend tool on Astronomer Cloud to store Airflow connections and variables in a centralized place.
---

## Overview

Airflow [connections](https://airflow.apache.org/docs/apache-airflow/stable/howto/connection.html#) and [variables](https://airflow.apache.org/docs/apache-airflow/stable/howto/variable.html) often contain sensitive information about your external systems, such as API keys, that should be kept [secret](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/secrets/index.html) in a secure, centralized location according to your organization's security requirements.

While secret values of Airflow connections and variables are encrypted in the Airflow Metadata Database of every Deployment, Astronomer Cloud supports and recommends an integration with a variety of secret backend tools. Integrating a secrets backend tool on Astronomer has important benefits:

- Stores Airflow connections and variables in a centralized location alongside secrets from other tools and systems used by your team, including Kubernetes secrets and AWS IAM
- Compliance with internal security postures and policies that protect your organization
- Ease of recovery in the case of an incident
- Automatically pull Airflow connections and variables that are already stored in your secrets backend instead when you create a new Deployment

To meet these requirements, Astronomer Cloud supports integration with a variety of secret backend tools. This guide provides setup steps for configuring the following tools as secrets backends on Astronomer:

- Hashicorp Vault
- AWS Systems Manager Parameter Store
- Google Cloud Secret Manager
- Azure Key Vault

:::info

If you enable a secrets backend on Astronomer, you can continue to define Airflow connections and variables either as environment variables or in the Airflow UI as needed. If set via the Airflow UI, connections and variables are stored as encrypted values in Airflow's metadata database.

When Airflow checks for the value of an Airflow variable or connection, it does so in the following order of precedence:

1. Secrets backend
2. Environment variable
3. Set via the Airflow UI

:::

:::tip

Setting Airflow connections via secrets requires knowledge of how to generate Airflow connection URIs. If you plan to store Airflow connections on your secrets backend, read the [Apache Airflow documentation](https://airflow.apache.org/docs/apache-airflow/stable/howto/connection.html#connection-uri-format) for guidance on how to generate a connection URI.

:::

## Hashicorp Vault

This topic provides steps for how to use [Vault](https://www.vaultproject.io/) as a secrets backend for both local development and on Astronomer Cloud. To do this, you will:

1. Write a test Airflow variable or connection as a secret to your Vault server.
2. Configure your Astronomer project to pull the secret from Vault.
3. Test the backend in a local environment.
4. Deploy your changes to Astronomer Cloud.

### Prerequisites

To use this feature, you need:

- A [Deployment](configure-deployment.md) on Astronomer.
- [The Astronomer CLI](install-cli.md).
- A [Hashicorp Vault server](https://learn.hashicorp.com/tutorials/vault/getting-started-dev-server?in=vault/getting-started).
- An [Astronomer project](create-project.md) with the [Hashicorp Airflow provider](https://airflow.apache.org/docs/apache-airflow-providers-hashicorp/stable/index.html) installed.
- [The Vault CLI](https://www.vaultproject.io/docs/install).
- Your Vault server's [Root Token](https://www.vaultproject.io/docs/concepts/tokens#root-tokens).
- Your Vault Server's URL. If you're using a local server, this should be `http://127.0.0.1:8200/`.

If you do not already have a Vault server deployed but would like to test this feature, we recommend that you either:

- Sign up for a Vault trial on [Hashicorp Cloud Platform (HCP)](https://cloud.hashicorp.com/products/vault).
- Deploy a local Vault server via the instructions in [our Airflow Guide](https://www.astronomer.io/guides/airflow-and-hashicorp-vault)

### Step 1: Write an Airflow Variable or Connection to Vault

To test whether your Vault server is set up properly, create a test Airflow variable or connection to store as a secret.

To store an Airflow variable in Vault as a secret, run the following Vault CLI command with your own values:

```sh
vault kv put secret/variables/<your-variable-key> value=<your-variable-value>
```

To store a connection in Vault as a secret, run the following Vault CLI command with your own values:

```sh
vault kv put secret/connections/<your-connection-id> conn_uri=<connection-type>://<connection-login>:<connection-password>@<connection-host>:5432
```

To confirm that your secret was written to Vault successfully, run:

```sh
# For variables
$ vault kv get secret/variables/<your-variable-key>
# For connections
$ vault kv get secret/connections/<your-connection>
```

### Step 2: Set Up Vault for Local Testing

To test Vault before deploying to Astronomer, configure it as a secrets backend in your Astronomer project by adding the following lines to your `Dockerfile`:

```text
# Make sure to replace `<your-aws-key>` and `<your-aws-secret-key>` with your own values.
ENV VAULT__ROOT_TOKEN="<your-root-token>"
ENV VAULT__URL="<your-vault-url>"
ENV AIRFLOW__SECRETS__BACKEND="airflow.contrib.secrets.hashicorp_vault.VaultBackend"
ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"url":$VAULT__URL,"token": $VAULT__ROOT_TOKEN,"connections_path": "connections","variables_path": "variables","kv_engine_version":1}'
```

This tells Airflow to look for connection and variable information at the `secret/connections/*` and `secret/variables/*` paths in your Vault server. In the next step, you'll test this configuration in a local Airflow environment.

:::warning

If you want to deploy your project to a hosted Git repository before deploying to Astronomer, be sure to save `<your-root-token>` and `<your-vault-url>` securely. We recommend adding them to your project's [`.env` file](develop-project.md#set-environment-variables-via-env-local-development-only) and specifying this file in `.gitignore`.

When you deploy to Astronomer Cloud in Step 4, you can set these values as secrets via the Astronomer UI.

:::

:::info
By default, Airflow uses `"kv_engine_version": 2`, but we've written this secret using v1. You can change this to accommodate how you write and read your secrets.
:::

For more information on the Airflow provider for Hashicorp Vault and how to further customize your integration, read the [Apache Airflow documentation](https://airflow.apache.org/docs/apache-airflow-providers-hashicorp/stable/_api/airflow/providers/hashicorp/hooks/vault/index.html).

### Step 3: Test Vault in a Local Airflow Environment

To test Vault, write a simple DAG which calls your test secret and add this DAG your project's `dags` directory. For example, you can use the following DAG to print the value of a variable to your task logs:

```py
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime
from airflow.hooks.base_hook import BaseHook

def print_var():
    my_var = Variable.get("<your-variable-key>")
    print(f'My variable is: {my_var}')

with DAG('example_secrets_dags', start_date=datetime(2022, 1, 1), schedule_interval=None) as dag:

  test_task = PythonOperator(
      task_id='test-task',
      python_callable=print_var,
)
```

Once you've added this DAG to your project:

1. Run `astro dev stop` followed by `astro dev start` to push your changes to your local Airflow environment.
2. In the Airflow UI (`http://localhost:8080/admin/`), trigger your new DAG.
3. Click on `test-task` > **View Logs**.  If you ran the example DAG above, you should should see the contents of your secret in the task logs:

    ```text
    {logging_mixin.py:109} INFO - My variable is: my-test-variable
    ```

Once you confirm that the setup was successful, you can delete this example DAG.

### Step 4: Set Up Vault on Astronomer Cloud

Once you've confirmed that the integration with Vault works locally, you can complete a similar set up with a Deployment on Astronomer Cloud.

1. In the Astronomer UI, add the same environment variables found in your `Dockerfile` to your Deployment-level [environment variables](https://docs.astronomer.io/cloud/environment-variables). Specify both `VAULT__ROOT_TOKEN` and `VAULT__URL` as **secret** to ensure that your Vault credentials are stored securely.

  :::info

  Make sure to strip the quotations (`"`) from your environment variable values. If you add these values with the quotation marks included in your Dockerfile, your configuration will not work on Astronomer Cloud.

  :::

2. In your Astronomer project, delete the environment variables from your `Dockerfile`.
3. [Deploy your changes](https://docs.astronomer.io/cloud/deploy-code) to Astronomer Cloud.

Now, any Airflow connection or variable that you write to your Vault server can be successfully accessed and pulled by any DAG in your Deployment on Astronomer Cloud.

## AWS Systems Manager Parameter Store

In this section, we'll walk through how to use [AWS Systems Manager (SSM) Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) as a secrets backend on Astronomer Cloud.

### Prerequisites

To use this feature, you need:

- A [Deployment](configure-deployment.md).
- The [Astronomer CLI](install-cli.md).
- An [Astronomer project](create-project.md).
- Access to AWS SSM Parameter Store.
- A valid AWS Access Key ID and Secret Access Key.

### Step 1: Write an Airflow variable or connection to Parameter Store

To start, add an Airflow connection or variable as a secret to Parameter Store for testing. For instructions, read AWS documentation on how to do so via the [AWS Systems Manager Console](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-create-console.html), the [AWS CLI](https://docs.aws.amazon.com/systems-manager/latest/userguide/param-create-cli.html), or [Tools for Windows PowerShell](https://docs.aws.amazon.com/systems-manager/latest/userguide/param-create-ps.html).

Variables and connections should live at `/airflow/variables` and `/airflow/connections`, respectively. For example, if you're setting a secret variable with the key `my_secret`, it should exist at `/airflow/connections/my_secret`.

### Step 2: Set Up AWS Parameter Store to Test Locally

To test Parameter Store before deploying to Astronomer, configure it as a secrets backend in your Astronomer project by adding the following lines to your `Dockerfile`:

```text
# Make sure to replace `<your-aws-key>` and `<your-aws-secret-key>` with your own values.
ENV AWS_ACCESS_KEY_ID="<your-aws-key>"
ENV AWS_SECRET_ACCESS_KEY="<your-aws-secret-key>"
ENV AIRFLOW__SECRETS__BACKEND="airflow.contrib.secrets.aws_systems_manager.SystemsManagerParameterStoreBackend"
ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "/airflow/connections", "variables_prefix": "/airflow/variables"}'
```

In the next step, you'll test this configuration in a local Airflow environment.

To further customize the integration between Airflow and AWS SSM, reference Airflow documentation with the [full list of available kwargs](https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/_api/airflow/providers/amazon/aws/secrets/systems_manager/index.html).

:::warning
If you want to deploy your project to a hosted Git repository before deploying to Astronomer, be sure to save `<your-aws-key>` and `<your-aws-secret-key>` in a secure manner. When you deploy to Astronomer, you should set these values as secrets via the Astronomer UI.
:::

:::info

If you'd like to reference an AWS profile, you can also [add the `profile` param to `ENV AIRFLOW__SECRETS__BACKEND_KWARGS`](https://airflow.apache.org/docs/apache-airflow/2.2.3/security/secrets/secrets-backend/index.html).

:::

### Step 3: Run an Example DAG to Test AWS Paramater Store Locally

To test Parameter Store, write a simple DAG which calls your secret and add this DAG your project's `dags` directory. For example, you can use the following DAG to print the value of a variable to your task logs:

```py
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime
from airflow.hooks.base_hook import BaseHook

def print_var():
    my_var = Variable.get("<your-variable-key>")
    print(f'My variable is: {my_var}')

with DAG('example_secrets_dags', start_date=datetime(2022, 1, 1), schedule_interval=None) as dag:

  test_task = PythonOperator(
      task_id='test-task',
      python_callable=print_var,
)
```

To test your changes:

1. Run `astro dev stop` followed by `astro dev start` to push your changes to your local Airflow environment.
2. In the Airflow UI (`http://localhost:8080/admin/`), trigger your new DAG.
3. Click on `test-task` > **View Logs**. If you ran the example DAG above, you should should see the contents of your secret in the task logs:

    ```text
    {logging_mixin.py:109} INFO - My variable is: my-test-variable
    ```

### Step 4: Deploy to Astronomer Cloud

Once you've confirmed that your connections are being imported correctly locally, you're ready to set your deploy your project to Astronomer Cloud

1. In the Astronomer UI, add the same environment variables found in your `Dockerfile` to your Deployment-level [environment variables](https://docs.astronomer.io/cloud/environment-variables). Specify both `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as **secret** ensure that your credentials are stored securely.

  :::info

  Make sure to strip the quotations (`"`) from your environment variable values. If you add these values with the quotation marks included in your Dockerfile, your configuration will not work on Astronomer Cloud.

  :::

2. In your Astronomer project, delete the environment variables from your `Dockerfile`.
3. [Deploy your changes](https://docs.astronomer.io/cloud/deploy-code) to Astronomer Cloud.

Now, any Airflow variable or connection that you write to AWS SSM Parameter Store can be automatically pulled by any DAG in your Deployment on Astronomer Cloud.

## Google Cloud Secret Manager

This topic provides setup steps for configuring [Google Cloud Secret Manager](https://cloud.google.com/secret-manager/docs/configuring-secret-manager) as a secrets backend on Astronomer Cloud.

### Prerequisites

To use Google Cloud Secret Manager as your Airflow secrets backend, you need:

- A [Deployment](configure-deployment.md).
- The [Astronomer CLI](install-cli.md).
- An [Astronomer project](create-project.md).
- A Google Cloud environment with [Secret Manager](https://cloud.google.com/secret-manager/docs/configuring-secret-manager) configured.
- A [service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) with the [Secret Manager Secret Accessor](https://cloud.google.com/secret-manager/docs/access-control) role on Google Cloud.
- A [JSON service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys) for the service account.

### Step 1: Configure Secret Manager

To start, add an Airflow variable or connection as a secret to Parameter Store for testing. Airflow variables and connection IDs should be prefixed with `airflow-variables` and `airflow-connections` respectively. For example, to add an Airflow variable with the ID `my-secret`, you would run the following in the gcloud CLI:

```sh
gcloud secrets create secret-id \
    --replication-policy="automatic"
```

For more information on creating secrets, read the [Google Cloud documentation](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets#create).

### Step 2: Set Up Secret Manager in a Local Airflow Environment

To test Secret Manager before deploying to Astronomer, add the following lines to your Astronomer project's `Dockerfile`, making sure to paste your entire JSON service account key in place of `<your-key-file>`:

```sh
ENV AIRFLOW__SECRETS__BACKEND=airflow.providers.google.cloud.secrets.secret_manager.CloudSecretManagerBackend
ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "airflow-connections", "variables_prefix": "airflow-variables", "gcp_keyfile_dict": <your-key-file>}'
```

:::warning

If you want to deploy your project to a hosted Git repository before deploying to Astronomer, be sure to save `<your-key-file>` securely. We recommend adding it to your project's [`.env` file](develop-project.md#set-environment-variables-via-env-local-development-only) and specifying this file in `.gitignore`. When you deploy to Astronomer, you should set these values as secrets via the Astronomer UI.

:::

### Step 3: Test Secret Manager Locally

To test Secret Manager, [create a secret](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets#create) containing either an Airflow variable or connection for testing.

Once you create a test secret, write a simple DAG which calls the secret and add this DAG your project's `dags` directory. For example, you can use the following DAG to print the value of a variable to your task logs:

```py
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime
from airflow.hooks.base_hook import BaseHook

def print_var():
    my_var = Variable.get("<your-variable-key>")
    print(f'My variable is: {my_var}')

with DAG('example_secrets_dags', start_date=datetime(2022, 1, 1), schedule_interval=None) as dag:

  test_task = PythonOperator(

      task_id='test-task',
      python_callable=print_var,
)
```

To test your changes:

1. Run `astro dev stop` followed by `astro dev start` to push your changes to your local Airflow environment.
2. In the Airflow UI (`http://localhost:8080/admin/`), trigger your new DAG.
3. Click on `test-task` > **View Logs**. If you ran the example DAG above, you should should see the contents of your secret in the task logs:

    ```text
    {logging_mixin.py:109} INFO - My variable is: my-test-variable
    ```

Once you confirm that the setup was successful, you can delete this DAG.

### Step 4: Deploy to Astronomer

Once you've confirmed that the integration with Google Cloud Secret Manager works locally, you can complete a similar set up with a Deployment on Astronomer Cloud.

1. In the Astronomer UI, add the same environment variables found in your `Dockerfile` to your Deployment-level [environment variables](https://docs.astronomer.io/cloud/environment-variables). Specify both `AIRFLOW__SECRETS__BACKEND` and `AIRFLOW__SECRETS__BACKEND_KWARGS` as **Secret** to ensure that your credentials are stored securely.

  :::info

  Make sure to strip the quotations (`"`) from your environment variable values. If you add these values with the quotation marks included in your Dockerfile, your configuration will not work on Astronomer Cloud.

  :::

2. In your Astronomer project, delete the environment variables from your `Dockerfile`.
3. [Deploy your changes](https://docs.astronomer.io/cloud/deploy-code) to Astronomer Cloud.

You now should be able to see your connection information being pulled from Secret Manager on Astronomer. From here, you can store any Airflow connections or variables as secrets on Secret Manager and use them in your project.

## Microsoft Azure Key Vault

This topic provides setup steps for configuring [Azure Key Vault](https://cloud.google.com/secret-manager/docs/configuring-secret-manager) as a secrets backend on Astronomer Cloud.

### Prerequisites

To use Key Vault as a secrets backend, you need:

- A [Deployment](configure-deployment.md).
- The [Astronomer CLI](install-cli.md).
- An [Astronomer project](create-project.md).
- An existing Key Vault linked to a resource group.

If you do not already have Key Vault configured, read [Microsoft Azure documentation](https://docs.microsoft.com/en-us/azure/key-vault/general/quick-create-portal).

### Step 1: Register Astronomer as an App on Azure

Follow the [Microsoft Azure documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) to register a new application for Astronomer.

At a minimum, you need to add a [secret](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) that Astronomer can use to authenticate to Key Vault.

Note the value of the application's client ID and secret for Step 3.

### Step 2: Create an Access Policy

Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) to create a new access policy for the application that you just registered. The settings you need to configure for your policy are:

- **Configure from template**: Select `Key, Secret, & Certificate Management`.
- **Select principal**: Select the name of the application that you registered in Step 1.

### Step 3: Set Up Key Vault in a Local Airflow Environment

In your Astronomer project, add the following line to your `requirements.txt` file:

```text
apache-airflow-providers-microsoft-azure
```

In your `Dockerfile`, add the following environment variables:

```yaml
ENV AZURE_CLIENT_ID="<your-client-id>" # Found on App page > 'Application (Client) ID'
ENV AZURE_TENANT_ID="<your-tenant-id>" # Found on Properties > 'Tenant ID'
ENV AZURE_CLIENT_SECRET="<your-client-secret>" # Found on App Registration Page > Certificates and Secrets > Client Secrets > 'Value'
ENV AIRFLOW__SECRETS__BACKEND="airflow.providers.microsoft.azure.secrets.azure_key_vault.AzureKeyVaultBackend"
ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "airflow-connections", "variables_prefix": "airflow-variables", "vault_url": "<your-vault-url>"}' # <your-vault-url> found on Key Vault overview page > 'Vault URI'
```

This tells Airflow to look for connection information at the `airflow/connections/*` path in Azure Key Vault and variable information at the `airflow/variables/*`. In the next step, you'll run an example DAG to test this configuration locally.

:::tip
By default, this setup requires that you prefix any secret names in Key Vault with `airflow-connections` or `airflow-variables`. If you don't want to use prefixes in your Key Vault secret names, replace the values for `"connections_prefix"` and `"connections_prefix"` with `""`.
:::

:::warning

If you want to deploy your project to a hosted Git repository before deploying to Astronomer, be sure to save `<your-client-id>`, `<your-tenant-id>`, and `<your-client-secret>`  in a secure manner. When you deploy to Astronomer, you should set these values as secrets via the Astronomer UI.

:::

### Step 4: Test Key Vault Locally

To test your Key Vault setup on Astronomer locally, [create a new secret](https://docs.microsoft.com/en-us/azure/key-vault/secrets/quick-create-portal#add-a-secret-to-key-vault) in Key Vault containing either a variable or a connection.

Once you create a test secret, write a simple DAG which calls the secret and add this DAG your project's `dags` directory. For example, you can use the following DAG to print the value of a variable to your task logs:

```py
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime
from airflow.hooks.base_hook import BaseHook

def print_var():
    my_var = Variable.get("<your-variable-key>")
    print(f'My variable is: {my_var}')

with DAG('example_secrets_dags', start_date=datetime(2022, 1, 1), schedule_interval=None) as dag:

  test_task = PythonOperator(
      task_id='test-task',
      python_callable=print_var,
)
```

To test your changes:

1. Run `astro dev stop` followed by `astro dev start` to push your changes to your local Airflow environment.
2. In the Airflow UI (`http://localhost:8080/admin/`), trigger your new DAG.
3. Click on `test-task` > **View Logs**. If you ran the example DAG above, you should should see the contents of your secret in the task logs:

    ```text
    {logging_mixin.py:109} INFO - My variable is: my-test-variable
    ```

Once you confirm that the setup was successful, you can delete this DAG.

### Step 5: Push Changes to Astronomer

Once you've confirmed that your secrets are being imported correctly to your local environment, you're ready to set configure the same feature in a Deployment on Astronomer Cloud.

1. In the Astronomer UI, add the same environment variables found in your `Dockerfile` to your Deployment-level [environment variables](https://docs.astronomer.io/cloud/environment-variables). Specify the `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET` variables as **Secret** to ensure that your credentials are stored securely.

  :::info

  Make sure to strip the quotations (`"`) from your environment variable values. If you add these values with the quotation marks included in your Dockerfile, your configuration will not work on Astronomer Cloud.

  :::

2. In your Astronomer project, delete the environment variables from your `Dockerfile`.
3. [Deploy your changes](https://docs.astronomer.io/cloud/deploy-code) to Astronomer Cloud.

From here, you can store any Airflow connections or variables as secrets on Key Vault and use them in your project.
