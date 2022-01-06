---
title: 'Configure an External Secrets Backend on Astronomer Cloud'
sidebar_label: 'Configure a Secrets Backend'
id: secrets-backend
description: Configure a secret backend tool on Astronomer Cloud to store Airflow connections and variables.
---

You can manage and sync Airflow connections and variables as [secrets](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/secrets/index.html) from a variety of external secrets backend tools, including [Hashicorp Vault](https://www.vaultproject.io/), [AWS SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html), and [GCP Secret Manager](https://cloud.google.com/secret-manager). Storing connections and variables as secrets makes Airflow more secure and reliable: DAG authors can focus on authoring data pipelines without the risk of touching sensitive code that's essential to running your Deployments.

This guide provides setup steps for configuring the following tools as secrets backends on Astronomer:

- Hashicorp Vault
- AWS SSM Parameter Store
- Google Cloud Secret Manager

## Use Hashicorp Vault as a Secrets Backend

This topic provides steps for how to use Vault as a secrets backend for both local development and on Astronomer Cloud. To do this, you'll:

1. Write a test Airflow connection as a secret to your Vault.
2. Configure Airflow to use the Vault on your Astronomer project.
3. Test the connection in a local environment.
4. Deploy your changes to Astronomer Cloud.

### Prerequisites

To use this feature, you need:

- A [Deployment](configure-deployment.md) on Astronomer.
- [The Astro CLI](install-cli.md).
- A running Hashicorp Vault server.
- [The Vault CLI](https://www.vaultproject.io/docs/install).
- Your Vault server's [Root Token](https://www.vaultproject.io/docs/concepts/tokens#root-tokens).
- Your Vault Server's URL (if you're using a local server, this should be `http://127.0.0.1:8200/`).

If you do not already have a Vault server deployed but would like to test this feature, we'd recommend either:

- Deploying a light-weight server using [this Heroku Element](https://elements.heroku.com/buttons/pallavkothari/vault)
- Deploying a local server via the instructions in [our Airflow and Vault guide](https://www.astronomer.io/guides/airflow-and-hashicorp-vault)

### Step 1: Write a Connection to Vault

To start, you first need to write an [Airflow connection URI](https://airflow.apache.org/docs/stable/howto/connection/index.html#generating-connection-uri) to your Vault server. This can be any new or existing connection in your local Airflow project.

To write the connection to your Vault server as a secret key/value pair, run:

```
vault kv put secret/connections/<your-connection> conn_uri=<connection-type>://<connection-login>:<connection-password>@<connection-host>:5432
```

To confirm that the secret was written successfully, run the following command:

```
vault kv gt secret/connections/<your-connection>
```

For example, if you set an SMTP connection, the output of this command would look like the following:

```
    sh vault kv get secret/connections/smtp_default
    ====== Metadata ======
    Key              Value
    ---              -----
    created_time     2020-03-26T14:43:50.819791Z
    deletion_time    n/a
    destroyed        false
    version          1

    ====== Data ======
    Key         Value
    ---         -----
    conn_uri    smtps://user:host@relay.example.com:465
```

### Step 2: Set Connection Locally

To use Vault with Airflow, you first need to configure your `Dockerfile` to use the Vault server as the default secrets backend for your local Airflow project. Following this section, we'll set these variables on a Deployment.

To configure Airflow to use the secrets backend:

1. Add the following environment variables to the `.env` file in your project directory:

    ```sh
    VAULT__ROOT_TOKEN="<your-root-token>"
    VAULT__URL="<your-vault-url>"
    ```

   This keeps your connection to the Vault server secure. Be sure to keep your `.env` in your `.gitignore` when you deploy these changes to your project if they contain sensitive credentials.

2. Add the following lines to your `Dockerfile` to set Airflow's `AIRFLOW__SECRETS__BACKEND` configuration via environment variables:

    ```sh
    ENV VAULT__ROOT_TOKEN=$VAULT__ROOT_TOKEN
    ENV VAULT__URL=$VAULT__URL
    ENV AIRFLOW__SECRETS__BACKEND="airflow.contrib.secrets.hashicorp_vault.VaultBackend"
    ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"url":$VAULT__URL,"token": $VAULT__ROOT_TOKEN,"connections_path": "connections","variables_path": "variables","kv_engine_version":1}'
    ```

    This tells Airflow to look for connection information at the `secret/connections/*` path in your Vault server.

:::info
By default, Airflow uses `"kv_engine_version": 2`, but we've written this secret using v1. You can change this to accommodate how you write and read your secrets.
:::

If you'd like to further customize what the interaction between Airflow and Vault server will look like, read [the full list of available kwargs for this integration](https://airflow.apache.org/docs/stable/_api/airflow/contrib/secrets/hashicorp_vault/index.html).

### Step 3: Test Your Connection

To test your connection to Vault in a local Airflow environment, add the following code as a new DAG in your `/dags` directory. This DAG prints your connection information to the task logs, confirming that your connection has been successfully established.

```python
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime
from airflow.hooks.base_hook import BaseHook


def get_secrets(**kwargs):
    conn = BaseHook.get_connection(kwargs['my_conn_id'])
    print(f"Password: {conn.password}, Login: {conn.login}, URI: {conn.get_uri()}, Host: {conn.host}")

with DAG('example_secrets_dags', start_date=datetime(2020, 1, 1), schedule_interval=None) as dag:


    test_task = PythonOperator(
        task_id='test-task',
        python_callable=get_secrets,
        op_kwargs={'my_conn_id': 'smtp_default'},
 )
```

Once you've added this DAG to your project:

1. Run `astro dev stop` and `astro dev start`  to rebuild your image locally
2. Trigger your new DAG via the Airflow UI at `http://localhost:8080/admin/`
3. Click on `test-task` > **View Logs**
4. Confirm your `smtp_default` connection information is being printed in the task logs:

    ![Airflow Logs for Vault](https://assets2.astronomer.io/main/docs/secrets-backends/logs.png)

This works because we set the `connections_path` in our `AIRFLOW__SECRETS__BACKEND_KWARGS` to be `connections`. You can change this path name if you'd prefer to access variables from a different Vault directory.

:::tip
If you've written other secrets to your Vault server's `/connections` path, you should be able to test those here as well just by changing the `my_conn_id` value in the DAG code above.
:::

### Step 4: Deploy to Astronomer

Once you've confirmed that your connections are being imported correctly in a local environment, you're ready to set configure the same feature in a Deployment on Astronomer Cloud.

1. In the Astronomer UI, open your **Deployment** and click **Add Variables**.
2. Set `VAULT__ROOT_TOKEN` and `VAULT__URL` to the same values as in your `.env` file.
3. Click **Save Variables** to save and publish your changes.
4. Deploy your project to Astronomer by running `astro deploy` in your project directory.

You now should be able to see your connection information being pulled from Vault on Astronomer. From here, you can store any Airflow connections or variables as secrets on Vault and use them in your project. Read the following topics about how to do this with Vault.

### Set Airflow Connections as Secrets in Vault

To write an Airflow connection to your Vault server as a secret key/value pair, run:

```sh
vault kv put secret/connections/<your-connection> conn_uri=<connection-type>://<connection-login>:<connection-password>@<connection-host>:5432
```

This syntax applies to all connections. For example, to make an SMTP connection secret you would run something like the following:

```sh
vault kv put secret/connections/smtp_default conn_uri=smtps://user:host@relay.example.com:465
```

:::info
We recommend setting the path to `secret/connections/<your-connection>` to keep all of your Airflow connections organized in the `connections` directory of the mount point.
:::

### Set Airflow Variables as Secrets in Vault

While this setup used an Airflow connection as an example secret, you can also pull Airflow variables from Vault. To do so, add your variable to vault using the following syntax:

```sh
vault kv put airflow/variables/<secret-name> value=<secret-value>
```

This syntax assumes that you set the `variables_path` in `AIRFLOW__SECRETS__BACKEND_KWARGS` to be `variables`. You can change this path name if you'd prefer to access variables from a different Vault directory.

## AWS SSM Parameter Store

In this section, we'll walk through how to use AWS SSM Parameter Store as a secrets backend on Astronomer Cloud.

### Prerequisites

To use this feature, you need:

- A [Deployment](configure-deployment.md).
- The [Astro CLI](install-cli.md).
- A running AWS SSM Parameter Store instance.
- A valid AWS Access Key ID and Secret Access Key.

### Step 1: Add Secrets to Parameter Store

To start, add an Airflow connection or variable as a secret to Parameter Store for testing. For more information on adding secrets to Parameter Store, read the [AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/param-create-cli.html).

Connections and variables should live at `/airflow/connections` and `/airflow/variables`, respectively. For example, if you're using a secret with a connection id of `smtp_default`, it should exist at `/airflow/connections/smtp_default`.

:::info
If you add a connection, it must exist as a string representing an Airflow `connection_uri`. You can read more about generating a `connection_uri` in the [Apache Airflow documentation](https://airflow.apache.org/docs/stable/howto/connection/index.html#generating-connection-uri).
:::

### Step 2: Set your Secrets Backend in a Local Environment

Now that you have a secret saved for testing, you can configure your Astronomer project to use your Parameter Store instance server as a secrets backend in a locally running Airflow environment:

1. Add the following environment variables to the `.env` file in your project directory to be used in your _local_ Airflow instance:

    ```text
    AWS_ACCESS_KEY_ID="YOUR-AWS-KEY"
    AWS_SECRET_ACCESS_KEY="YOUR-AWS-SECRET-KEY"
    ```

   This will keep your connection to the Parameter Store server secure, though make sure to keep your `.env` file in `.gitignore` when you deploy these changes to your project. We'll set these variables separately on Astronomer.

2. Add the following lines to your `Dockerfile` to set Airflow's `AIRFLOW__SECRETS__BACKEND` configuration via environment variables:

    ```text
    ENV AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID
    ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY
    ENV AIRFLOW__SECRETS__BACKEND="airflow.contrib.secrets.aws_systems_manager.SystemsManagerParameterStoreBackend"
    ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "/airflow/connections", "variables_prefix": "/airflow/variables"}'
    ```

    This tells Airflow to look for connection information at the `airflow/connections/*` path in your Parameter Store server.

To further customize what the interaction between Airflow and your SSM server looks like, reference the [full list of available kwargs for this integration](https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/_api/airflow/providers/amazon/aws/secrets/systems_manager/index.html).

> **Note:** If you'd like to reference an AWS profile instead of connecting via Environment Variables, you can also [add the `profile` param to your kwargs](https://airflow.apache.org/docs/1.10.10/howto/use-alternative-secrets-backend.html).

### Step 3: Test Your Connection

To test the connection to AWS SSM Parameter Store, call the `get_conn_uri` or `get_variable` method in your DAG and pass it the connection ID or variable ID, respectively, of the secret you uploaded to your Parameter Store server.

To test your changes run locally, run `astro dev stop` followed by `astro dev start` in your project directory.

### Step 4: Deploy to Astronomer

Once you've confirmed that your connections are being imported correctly locally, you're ready to set your deploy your project to Astronomer Cloud

1. In the Astronomer UI, open your Deployment **Deployment** and click **Add Variables**.
2. Set your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to the same values as in your your `.env` file.
3. Click **Save Variables** to save and publish your changes.
4. Deploy to Astronomer by running `astro deploy`.

You should now be able to see your connection information being pulled from AWS SSM Parameter Store on Astronomer.

## Google Cloud Secret Manager

This topic provides setup steps for configuring Google Cloud [Secret Manager](https://cloud.google.com/secret-manager/docs/configuring-secret-manager) as your Airflow secrets backend.

### Prerequisites

To use Google Cloud Secret Manager as your Airflow secrets backend, you need:

- A [Deployment](configure-deployment.md).
- The [Astro CLI](install-cli.md).
- A Google Cloud environment with [Secret Manager](https://cloud.google.com/secret-manager/docs/configuring-secret-manager) configured.

### Step 1: Configure Secret Manager

To configure Secret Manager for use with Airflow:

1. [Create a service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) with the appropriate permissions on Google Cloud.
2. Add the [Secret Manager Secret Accessor](https://cloud.google.com/secret-manager/docs/access-control) role to the service account.
3. Create and download a [JSON service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys) for the service account.

### Step 2: Test Secret Manager in a Local Airflow Environment

1. In your Astronomer project folder, set the following environment variables in your `.env` file, making sure to paste your entire JSON service account key in place of `<your-key-file>`:

    ```sh
    AIRFLOW__SECRETS__BACKEND=airflow.providers.google.cloud.secrets.secret_manager.CloudSecretManagerBackend
    AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "airflow-connections", "variables_prefix": "airflow-variables", "gcp_keyfile_dict": <your-key-file>}'
    ```

2. Using the gcloud CLI, [create a secret](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets#create) containing either an Airflow connection or variable.
3. Write a simple DAG that prints the contents of your secret to your task logs. For example, your DAG might include the following logic:

    ```py
    from airflow.models import Variable

    def print_var():
        my_var = Variable.get("test")
        print(f'My variable is: {my_var}')
    ```

    Add this DAG to your project's `dags` folder.

4. Run `astro dev stop` followed by `astro dev start` to push your changes to your local Airflow environment.
5. In the Airflow UI (`http://localhost:8080/admin/`), trigger your new DAG.
6. Click on `test-task` > **View Logs**. If the configuration was successful, you should should see the contents of your secret in the task logs:

    ```text
    {logging_mixin.py:109} INFO - My variable is: my-test-variable
    ```

### Step 3: Deploy to Astronomer

Once you've confirmed that your secrets are being imported correctly to your local environment, you're ready to set configure the same feature in a Deployment on Astronomer Cloud.

1. In the Astronomer UI, open your Deployment and click **Add Variables**.
2. Set `AIRFLOW__SECRETS__BACKEND` and `AIRFLOW__SECRETS__BACKEND_KWARGS` to the same values as in your `.env` file. Mark these variables as **Secret**.
3. Click **Save Variables** to save and publish your changes.
4. Deploy your project to Astronomer by running `astro deploy` in your project directory.

You now should be able to see your connection information being pulled from Secret Manager on Astronomer. From here, you can store any Airflow connections or variables as secrets on Secret Manager and use them in your project.

## Use Azure Key Vault as a Secrets Backend

This topic provides setup steps for configuring Azure [Key Vault](https://cloud.google.com/secret-manager/docs/configuring-secret-manager) as your Airflow secrets backend.

### Prerequisites

To use Key Vault as a secrets backend, you need:

- A [Deployment](configure-deployment.md).
- The [Astro CLI](install-cli.md).
- A locally hosted Astronomer project.
- An existing Key Vault linked to a resource group ([Guide](https://docs.microsoft.com/en-us/azure/key-vault/general/quick-create-portal))

### Step 1: Register Astronomer as an App on Azure

Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) to register a new application for Astronomer. At a minimum, you need to add a [secret](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) that Astronomer can use to authenticate to Key Vault. Note the value of the application's client ID and secret for Step 3.

### Step 2: Create an Access Policy

Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) to create a new access policy for the app that you just registered. The settings you need to configure for your policy are:

- **Configure from template**: Select `Key, Secret, & Certificate Management`
- **Select principal**: Select the name of the app that you registered in Step 1.

### Step 3: Test Key Vault in a Local Airflow Environment

In your locally hosted Astronomer project, add the following line to your `requirements.txt` file:

```text
apache-airflow-providers-microsoft-azure
```

In your `Dockerfile`, add the following environment variables:

```yaml
ENV AZURE_CLIENT_ID="<your-client-id>" # Found on App page >> Application (Client) ID
ENV AZURE_TENANT_ID="<your-tenant-id>" # Found on Properties >> Tenant ID
ENV AZURE_CLIENT_SECRET="<your-client-secret>" # Found in App Registration Page >> Certificates and Secrets >> Client Secrets >> 'Value'

ENV AIRFLOW__SECRETS__BACKEND="airflow.providers.microsoft.azure.secrets.azure_key_vault.AzureKeyVaultBackend"

# Using prefixes and default '-' separator:
ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "airflow-connections", "variables_prefix": "airflow-variables", "vault_url": "<your-vault-url>"}'

# Using no prefixes and no separator:
# ENV AIRFLOW__SECRETS__BACKEND_KWARGS='{"connections_prefix": "", "sep":"", "variables_prefix": "", "sep":"", "vault_url": "<your-vault-url>"}'
```

These variables connect Airflow to your Key Vault and define how you call secrets in your Airflow code. By default, this setup requires that you prefix any secret names in Key Vault with `airflow-connections` or `airflow-variables`.

To test this functionality:

1. [Create a new secret](https://docs.microsoft.com/en-us/azure/key-vault/secrets/quick-create-portal#add-a-secret-to-key-vault) in Key Vault containing either a connection or a variable. For this example, we'll use `airflow-variables-test: my-test-value`.

2. In your `dags` directory, write a DAG which calls the secret. For example, you might use the following logic to print the variable to your task logs:

    ```py
    from airflow.models import Variable

    def print_var():
        my_var = Variable.get("test")
        print(f'My variable is: {my_var}')
    ```

3. Run `astro dev stop` followed by `astro dev start` to restart your local Airflow environment with these new changes.
4. In the Airflow UI (`http://localhost:8080/admin/`), trigger your new DAG.
5. Click on `test-task` > **View Logs**. If the configuration was successful, you should should see the contents of your secret in the task logs:

    ```text
    {logging_mixin.py:109} INFO - My variable is: my-test-variable
    ```

## Step 4: Push Changes to Astronomer

Once you've confirmed that your secrets are being imported correctly to your local environment, you're ready to set configure the same feature in a Deployment on Astronomer Cloud.

1. In the Astronomer UI, open your Deployment and click **Add Variables**.
2. Set the same environment variables as you have in your `Dockerfile`. Mark these variables as **Secret**.
3. Click **Save Variables** to save and publish your changes.
4. In your Astronomer project, remove the environment variables from your `Dockerfile`.
5. Deploy your project to Astronomer by running `astro deploy` in your project directory.

You now should be able to see your connection information being pulled from Key Vault on Astronomer. From here, you can store any Airflow connections or variables as secrets on Key Vault and use them in your project.
