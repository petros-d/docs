---
sidebar_label: 'CLI Reference'
title: 'Astronomer Cloud CLI Reference'
id: ci-cd
description: Learn about every command that you can run with the Astronomer Cloud CLI.
---

## Overview

The Astronomer Cloud CLI is the easiest way to run Apache Airflow on your local machine. From the CLI, you can create a local Apache Airflow instance with a dedicated Webserver, Scheduler and Postgres Database. If you're an Astronomer Cloud user, you can also create and manage users, Workspaces, Airflow Deployments, service accounts, and more.

This document contains information about all commands and settings available in the Astronomer CLI, including examples and flags.

## Installation

To install the Astrocloud CLI, run the following command:

```sh
brew install astronomer/cloud/astrocloud@0.0.1-alpha
```

To confirm that the installation was successful, run the following command:

```sh
astrocloud version
```

If the installation was successful, you should see your version of the AstroCloud CLI in the terminal:

```sh
AstroCloud CLI Version: 0.0.1-alpha%
```

## Core Commands

We expect that you'll use these commands most often when managing your Astronomer projects and Deployments:

- [`astrocloud auth login`](cli-reference/astrocloud-auth-login.md)
- [`astrocloud dev init`](cli-reference/astrocloud-dev-init.md)
- [`astrocloud dev start`](cli-reference/astrocloud-dev-start.md)
- [`astrocloud dev stop`](cli-reference/astrocloud-dev-stop.md)
- [`astrocloud deploy`](cli-reference/astrocloud-deploy.md)
