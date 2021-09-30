---
sidebar_label: 'Develop Locally'
title: 'Run Airflow Locally Using the Astronomer CLI'
id: 'develop-locally'
---

## Overview

You can use the Astronomer CLI to run a local instance of Airflow. Running a local Airflow instance requires only a few commands and does not require authentication to Astronomer Cloud.

You might want to run Airflow locally to test DAGs before pushing them to an Astronomer Deployment. The Astronomer CLI includes all of the tools you need to write, run, and monitor DAGs on your local machine.

### Prerequisites

To run Airflow locally via the CLI, you need:

- The Astronomer CLI
- Docker

### Creating a Local Project

To create a new Airflow project folder, open an empty directory and run `astro dev init`. This command generates the following files in the directory:

```
.
├── dags # Where your DAGs go
│   ├── example-dag.py # An example dag that comes with the initialized project
├── Dockerfile # Includes an Astronomer Runtime image and overrides
├── include # For any other files you'd like to include
├── plugins # For any custom or community Airflow plugins
├──airflow_settings.yaml # For your Airflow Connections, Variables and Pools (local only)
├──packages.txt # For OS-level packages
└── requirements.txt # For Python-level packages
```

You can use this generated project as the basis for a new project, or you can run it as-is to test out Airflow.

### Running a Local Project

To start a local Airflow project, run `astro dev start` from your project directory. This command builds your project and spins up 3 Docker containers on your machine, each for a different Airflow component:

- **Postgres:** Airflow's metadata database
- **Webserver:** The Airflow component responsible for rendering the Airflow UI
- **Scheduler:** The Airflow component responsible for monitoring and triggering tasks

If the project builds successfully, you can access the Airflow UI by going to `http://localhost:8080/` and logging in with `admin` for both your username and password. You can also access your Postgres database at `localhost:5432/postgres`.

### Updating a Local Project

To make code changes to a locally running Airflow project, run `astro dev stop` followed by `astro dev start`. When combined, these commands rebuild and restart your project with any additional code changes that were made while it was last running.

Occasionally for testing or upgrades, you might need to restart your entire Airflow project. To do this, run `astro dev kill`. This command deletes all data associated with your local Postgres metadata database, including Airflow Connections, logs, and task history.

### Monitoring a Local Project

To show logs for the Scheduler or Webserver in a locally running Airflow project, run `astro dev logs`. Once you run this command, the most recent logs for these components appear in your terminal window.

To continue monitoring logs, run `astro dev logs --follow`. The `--follow` flag ensures that the latest logs continue to appear in your terminal window.

### Run Airflow Commands

To run Apache Airflow CLI commands in your project, run `astro dev run` followed by an Airflow command.

For example, the Apache Airflow command for viewing your entire configuration is `airflow config list`. To run this command with the Astronomer CLI, you would run `astro dev run config list` instead.
