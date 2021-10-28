---
sidebar_label: 'Testing and Troubleshooting'
title: 'Test and Troubleshoot Your Astronomer Project'
id: 'test-and-troubleshoot'
---

## Overview

This document provides information about testing and troubleshooting your Astronomer project within a locally running Airflow environment. Running and testing your project locally before deploying it to Astronomer Cloud is a best practice, especially if you are deploying to a production Cluster.

## Run a Project Locally

Whenever you want to test your code, the first step is always to start a local Airflow environment. To run an Airflow locally, run:

```sh
astro dev start
```

This command builds your project and spins up 3 Docker containers on your machine, each for a different Airflow component:

- **Postgres:** Airflow's metadata database
- **Webserver:** The Airflow component responsible for rendering the Airflow UI
- **Scheduler:** The Airflow component responsible for monitoring and triggering tasks

Once the project builds, you can access the Airflow UI by going to `http://localhost:8080/` and logging in with `admin` for both your username and password. You can also access your Postgres database at `localhost:5432/postgres`.

## View Task Logs

You can view logs for individual task runs in the Airflow UI. This is useful if you want to troubleshoot why a specific task run failed or retried.

To access these logs:

1. In your local Airflow environment or in a Deployment on Astronomer, access the Airflow UI.
2. Open the DAG you want to troubleshoot:

    <div class="text--center">
    <img src="/img/docs/open-dag.png" alt="Access DAG from Airflow UI" />
    </div>

3. In the **Tree View**, click on the task run you want to see logs for:

    <div class="text--center">
    <img src="/img/docs/tree-view.png" alt="Task runs in the tree view" />
    </div>

4. Click **Instance Details**:

    <div class="text--center">
    <img src="/img/docs/instance-details.png" alt="Instance details button in the task log menu" />
    </div>

5. Click **Log**:

    <div class="text--center">
    <img src="/img/docs/task-log.png" alt="Log button from a task instance" />
    </div>

## Access Airflow Component Logs

To show logs for the Scheduler or Webserver in a locally running Astronomer project, run the following command:

```sh
astro dev logs
```

Once you run this command, the most recent logs for these components appear in your terminal window.

By default, running `astro dev logs` shows logs for all Airflow components. If you want to see logs for a specific component, add any of the following flags to your command:

- `--scheduler`
- `--webserver`
- `--postgres`

To continue monitoring logs, run `astro dev logs --follow`. The `--follow` flag ensures that the latest logs continue to appear in your terminal window.

## Run Airflow CLI Commands

To run [Apache Airflow CLI](https://airflow.apache.org/docs/apache-airflow/stable/cli-and-env-variables-ref.html) commands locally, run `astro dev run` followed by an Airflow command.

For example, the Apache Airflow command for viewing your entire configuration is `airflow config list`. To run this command with the Astronomer CLI, you would run `astro dev run config list` instead.

## Hard Reset Your Project

In most cases, [restarting your local project](develop-project#restart-a-local-project) is sufficient for testing and making changes to your project. However, it is sometimes necessary to fully reset your Docker containers and metadata DB for testing purposes. To do so, run the following command:

```sh
astro dev kill
```

This command deletes all data associated with your local Postgres metadata database, including Airflow Connections, logs, and task history.
