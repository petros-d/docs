---
title: 'Configure an External Secrets Backend on Astronomer Cloud'
sidebar_label: 'Configure a Secrets Backend'
id: secrets-backend
description: Configure a secret backend tool on Astronomer Cloud to store Airflow connections and variables.
---

## Overview

Airflow [connections](https://airflow.apache.org/docs/apache-airflow/stable/howto/connection.html#) and [variables](https://airflow.apache.org/docs/apache-airflow/stable/howto/variable.html) often contain sensitive information about your external systems, such as API keys, that should be kept [secret](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/secrets/index.html) in a secure, centralized location according to your organization's security requirements.

To meet these requirements, Astronomer Cloud supports integration with a variety of secret backend tools. This guide provides setup steps for configuring the following tools as secrets backends on Astronomer:

- Hashicorp Vault
- AWS SSM Parameter Store
- Google Cloud Secret Manager
- Azure Key Vault

:::info
If you enable a secrets backend on Astronomer, you can continue to define Airflow connections and variables either as environment variables or in the Airflow UI as needed. If set via the Airflow UI, connections and variables are stored as encrypted values in Airflow's metadata database.

When Airflow checks for the value of an Airflow connection or variable, it does so in the following order of precedence:

1. Secrets backend
2. Environment variable
3. Set via the Airflow UI
:::

:::info

Setting Airflow connections via secrets requires knowledge of how to generate Airflow connection URIs. If you plan to store Airflow connections on your secrets backend, read the [Apache Airflow documentation](https://airflow.apache.org/docs/apache-airflow/stable/howto/connection.html#connection-uri-format) for guidance on how to generate a connection URI.

:::

## Hashicorp Vault

This topic provides steps for how to use [Vault](https://www.vaultproject.io/) as a secrets backend for both local development and on Astronomer Cloud. To do this, you will:

1. Write a test Airflow connection as a secret to your Vault server.
2. Configure Airflow to pull the Airflow connection from Vault.
3. Test the connection in a local environment.
4. Deploy your changes to Astronomer Cloud.

### Prerequisites

To use this feature, you need:

- A [Deployment](configure-deployment.md) on Astronomer.
- [The Astronomer CLI](install-cli.md).
- A [Hashicorp Vault server](https://learn.hashicorp.com/tutorials/vault/getting-started-dev-server?in=vault/getting-started).
- An [Astronomer project](create-project.md).
- [The Vault CLI](https://www.vaultproject.io/docs/install).
- Your Vault server's [Root Token](https://www.vaultproject.io/docs/concepts/tokens#root-tokens).
- Your Vault Server's URL. If you're using a local server, this should be `http://127.0.0.1:8200/`.

If you do not already have a Vault server deployed but would like to test this feature, we'd recommend either:

- Deploying a light-weight server using [this Heroku Element](https://elements.heroku.com/buttons/pallavkothari/vault)
- Deploying a local server via the instructions in [our Airflow and Vault guide](https://www.astronomer.io/guides/airflow-and-hashicorp-vault)

### Step 1: Write an Airflow Connection or Variable to Vault

To test whether your Vault server is set up properly, create a test Airflow connection or variable to store as a secret.

To store a connection in Vault as a secret, run the following Vault CLI command:

```sh
vault kv put secret/connections/<your-connection> conn_uri=<connection-type>://<connection-login>:<connection-password>@<connection-host>:5432
```

To store an Airflow variable in Vault as a secret, run the following Vault CLI command:

```sh
vault kv put secret/variables/<your-variable-key> value=<your-variable-value>
```

To confirm that your secret was written to Vault successfully, run:

```sh
vault kv get secret/connections/<your-connection>
```

### Step 2: Set Up Vault in a Local Airflow Environment

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
If you want to deploy your project to a hosted Git repository before deploying to Astronomer, be sure to save `<your-root-token>` and `<your-vault-url>` in a secure manner, such as by adding them to your project's [`.env` file](develop-project.md#set-environment-variables-via-env-local-development-only) and specifying this file in `.gitignore`. When you deploy to Astronomer, you should set these values as secrets via the Astronomer UI.
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

with DAG('example_secrets_dags', start_date=datetime(2020, 1, 1), schedule_interval=None) as dag:

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
2. In your Astronomer project, delete the environment variables from your `Dockerfile`.
3. [Deploy your Astronomer project](https://docs.astronomer.io/cloud/deploy-code).

Now, any Airflow connection or variable that you write to your Vault server should be successfully pulled.

## AWS SSM Parameter Store

In this section, we'll walk through how to use AWS SSM Parameter Store as a secrets backend on Astronomer Cloud.

### Prerequisites

To use this feature, you need:

- A [Deployment](configure-deployment.md).
- The [Astronomer CLI](install-cli.md).
- A locally hosted [Astronomer project](create-project.md).
- A running AWS SSM Parameter Store server.
- A valid AWS Access Key ID and Secret Access Key.

### Step 1: Write an Airflow Connection or Variable to Parameter Store

To start, add an Airflow connection or variable as a secret to Parameter Store for testing. For more information on adding secrets to Parameter Store, read the [AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/param-create-cli.html).

Connections and variables should live at `/airflow/connections` and `/airflow/variables`, respectively. For example, if you're using a secret with a connection id of `smtp_default`, it should exist at `/airflow/connections/smtp_default`.

:::info
If you add a connection, it must exist as a string representing an Airflow `connection_uri`. You can read more about generating a `connection_uri` in the [Apache Airflow documentation](https://airflow.apache.org/docs/stable/howto/connection/index.html#generating-connection-uri).
:::

### Step 2: Set Up Parameter Store in a Local Airflow Environment

To test Parameter Store before deploying to Astronomer, configure it as a secrets backend in your Astronomer project by adding the following lines to your `Dockerfile`:

```text
# Make sure to replace `<your-aws-key>` and `<your-aws-secret-key>` with your own values.
ENV AWS_ACCESS_KEY_ID="<your-aws-key>"
ENV AWS_SECRET_ACCESS_KEY="<your-aws-secret-key>"
ENV AIRFLOW__SECRETS__BACKEND="airflow.contrib.secrets.aws_systems_manager.SystemsManagerParameterStoreBackend"
ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "/airflow/connections", "variables_prefix": "/airflow/variables"}'
```

This tells Airflow to look for connection information at the `airflow/connections/*` path in your Parameter Store server. In the next step, you'll test this configuration in a local Airflow environment.

To further customize what the interaction between Airflow and your SSM server looks like, reference the [full list of available kwargs for this integration](https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/_api/airflow/providers/amazon/aws/secrets/systems_manager/index.html).

:::warning
If you want to deploy your project to a hosted Git repository before deploying to Astronomer, be sure to save `<your-aws-key>` and `<your-aws-secret-key>` in a secure manner. When you deploy to Astronomer, you should set these values as secrets via the Astronomer UI.
:::

:::info
If you'd like to reference an AWS profile instead of connecting via Environment Variables, you can also [add the `profile` param to your kwargs](https://airflow.apache.org/docs/1.10.10/howto/use-alternative-secrets-backend.html).
:::

### Step 3: Test Parameter Store in a Local Airflow Environment

To test Parameter Store, write a simple DAG which calls your secret and add this DAG your project's `dags` directory. For example, you can use the following DAG to print the value of a variable to your task logs:

```py
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime
from airflow.hooks.base_hook import BaseHook

def print_var():
    my_var = Variable.get("<your-variable-key>")
    print(f'My variable is: {my_var}')

with DAG('example_secrets_dags', start_date=datetime(2020, 1, 1), schedule_interval=None) as dag:

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

### Step 4: Deploy to Astronomer

Once you've confirmed that your connections are being imported correctly locally, you're ready to set your deploy your project to Astronomer Cloud

1. In the Astronomer UI, add the same environment variables found in your `Dockerfile` to your Deployment-level [environment variables](https://docs.astronomer.io/cloud/environment-variables). Specify both both `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as **secret** ensure that your credentials are stored securely.
2. In your Astronomer project, delete the environment variables from your `Dockerfile`.
3. [Deploy your Astronomer project](https://docs.astronomer.io/cloud/deploy-code).

You should now be able to see your connection information being pulled from AWS SSM Parameter Store on Astronomer.

## Google Cloud Secret Manager

This topic provides setup steps for configuring Google Cloud [Secret Manager](https://cloud.google.com/secret-manager/docs/configuring-secret-manager) as your Airflow secrets backend.

### Prerequisites

To use Google Cloud Secret Manager as your Airflow secrets backend, you need:

- A [Deployment](configure-deployment.md).
- The [Astro CLI](install-cli.md).
- A locally hosted [Astronomer project](create-project.md).
- A Google Cloud environment with [Secret Manager](https://cloud.google.com/secret-manager/docs/configuring-secret-manager) configured.

### Step 1: Configure Secret Manager

To configure Secret Manager for use with Airflow:

1. [Create a service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) with the appropriate permissions on Google Cloud.
2. Add the [Secret Manager Secret Accessor](https://cloud.google.com/secret-manager/docs/access-control) role to the service account.
3. Create and download a [JSON service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys) for the service account.

### Step 2: Set Up Secret Manager in a Local Airflow Environment

To test Secret Manager before deploying to Astronomer, add the following lines to your Astronomer project's `Dockerfile`, making sure to paste your entire JSON service account key in place of `<your-key-file>`:

```sh
ENV AIRFLOW__SECRETS__BACKEND=airflow.providers.google.cloud.secrets.secret_manager.CloudSecretManagerBackend
ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "airflow-connections", "variables_prefix": "airflow-variables", "gcp_keyfile_dict": <your-key-file>}'
```

These environment variables tell Airflow to begin using your Secret Manager as its default secrets backend.

:::warning
If you want to deploy your project to a hosted Git repository before deploying to Astronomer, be sure to save these variables in a secure manner. When you deploy to Astronomer, you should set these values as secrets via the Astronomer UI.
:::

### Step 3: Test Secret Manager Locally

To test Secret Manager, [create a secret](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets#create) containing either an Airflow connection or variable for testing.

Once you create a test secret, write a simple DAG which calls the secret and add this DAG your project's `dags` directory. For example, you can use the following DAG to print the value of a variable to your task logs:

```py
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime
from airflow.hooks.base_hook import BaseHook

def print_var():
    my_var = Variable.get("<your-variable-key>")
    print(f'My variable is: {my_var}')

with DAG('example_secrets_dags', start_date=datetime(2020, 1, 1), schedule_interval=None) as dag:

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

Once you've confirmed that your secrets are being imported correctly to your local environment, you're ready to set configure the same feature in a Deployment on Astronomer Cloud.

1. In the Astronomer UI, add the same environment variables found in your `Dockerfile` to your Deployment-level [environment variables](https://docs.astronomer.io/cloud/environment-variables). Specify both `AIRFLOW__SECRETS__BACKEND` and `AIRFLOW__SECRETS__BACKEND_KWARGS` as **Secret** to ensure that your credentials are stored securely.
2. In your Astronomer project, delete the environment variables from your `Dockerfile`.
3. [Deploy your Astronomer project](https://docs.astronomer.io/cloud/deploy-code).

You now should be able to see your connection information being pulled from Secret Manager on Astronomer. From here, you can store any Airflow connections or variables as secrets on Secret Manager and use them in your project.

## Use Azure Key Vault as a Secrets Backend

This topic provides setup steps for configuring Azure [Key Vault](https://cloud.google.com/secret-manager/docs/configuring-secret-manager) as your Airflow secrets backend.

### Prerequisites

To use Key Vault as a secrets backend, you need:

- A [Deployment](configure-deployment.md).
- The [Astro CLI](install-cli.md).
- A locally hosted [Astronomer project](create-project.md).
- An existing Key Vault linked to a resource group ([Guide](https://docs.microsoft.com/en-us/azure/key-vault/general/quick-create-portal)).

### Step 1: Register Astronomer as an App on Azure

Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) to register a new application for Astronomer. At a minimum, you need to add a [secret](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) that Astronomer can use to authenticate to Key Vault. Note the value of the application's client ID and secret for Step 3.

### Step 2: Create an Access Policy

Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) to create a new access policy for the app that you just registered. The settings you need to configure for your policy are:

- **Configure from template**: Select `Key, Secret, & Certificate Management`.
- **Select principal**: Select the name of the app that you registered in Step 1.

### Step 3: Set Up Key Vault in a Local Airflow Environment

In your locally hosted Astronomer project, add the following line to your `requirements.txt` file:

```text
apache-airflow-providers-microsoft-azure
```

In your `Dockerfile`, add the following environment variables:

```yaml
ENV AZURE_CLIENT_ID="<your-client-id>" # Found on App page > 'Application (Client) ID'
ENV AZURE_TENANT_ID="<your-tenant-id>" # Found on Properties > 'Tenant ID'
ENV AZURE_CLIENT_SECRET="<your-client-secret>" # Found on App Registration Page > Certificates and Secrets > Client Secrets > 'Value'

ENV AIRFLOW__SECRETS__BACKEND="airflow.providers.microsoft.azure.secrets.azure_key_vault.AzureKeyVaultBackend"

# Using prefixes and default '-' separator:
ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "airflow-connections", "variables_prefix": "airflow-variables", "vault_url": "<your-vault-url>"}' # <your-vault-url> found on Key Vault overview page > 'Vault URI'
```

:::warning
If you want to deploy your project to a hosted Git repository before deploying to Astronomer, be sure to save `<your-client-id>`, `<your-tenant-id>`, and `<your-client-secret>`  in a secure manner. When you deploy to Astronomer, you should set these values as secrets via the Astronomer UI.
:::

These variables connect Airflow to your Key Vault and define how you call secrets in your Airflow code. By default, this setup requires that you prefix any secret names in Key Vault with `airflow-connections` or `airflow-variables`. If you don't want to use prefixes in your Key Vault secret names, replace the values for `"connections_prefix"` and `"connections_prefix"` with `""`.

### Step 4: Test Key Vault Locally

To test your Key Vault steup, [create a new secret](https://docs.microsoft.com/en-us/azure/key-vault/secrets/quick-create-portal#add-a-secret-to-key-vault) in Key Vault containing either a connection or a variable.

Once you create a test secret, write a simple DAG which calls the secret and add this DAG your project's `dags` directory. For example, you can use the following DAG to print the value of a variable to your task logs:

```py
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime
from airflow.hooks.base_hook import BaseHook

def print_var():
    my_var = Variable.get("<your-variable-key>")
    print(f'My variable is: {my_var}')

with DAG('example_secrets_dags', start_date=datetime(2020, 1, 1), schedule_interval=None) as dag:

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
2. In your Astronomer project, delete the environment variables from your `Dockerfile`.
3. [Deploy your Astronomer project](https://docs.astronomer.io/cloud/deploy-code).

From here, you can store any Airflow connections or variables as secrets on Key Vault and use them in your project.
