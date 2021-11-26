---
title: 'Upgrade to a Stable or Patch Version of Astronomer Enterprise'
sidebar_label: 'Upgrade to a Stable Version'
id: upgrade-astronomer-stable
description: Update your Astronomer Enterprise Platform to a new stable or patch version.
---

## Overview

Stable releases of Astronomer Enterprise are available to Enterprise customers on a monthly basis as part of the release model described in [Release and Lifecycle Policy](release-lifecycle-policy). Patch release of Astronomer Enterprise follow up on stable releases with additional bug and security fixes.

Stable and patch releases require a simple upgrade process. Follow this guide to upgrade to any stable or patch version before the next available LTS release. For information on all stable and patch releases, refer to [Enterprise Release Notes](release-notes).

A few notes before you get started:
- The patch upgrade process will not affect running Airflow tasks as long as `upgradeDeployments.enabled=false` is set in the script below.
- Patch and stable version updates will not cause any downtime to Astronomer services (Astronomer UI, Houston API, Astronomer CLI).

> **Note:** Astronomer v0.16.5 and beyond includes an improved upgrade process that allows Airflow Deployments to remain unaffected through a platform upgrade that includes changes to the [Astronomer Airflow Chart](https://github.com/astronomer/airflow-chart).
>
> Now, Airflow Chart changes only take effect when another restart event is triggered by a user (e.g. a code push, Environment Variable change, resource or executor adjustment, etc).

## Step 1: Ensure You Have a Copy of Your Astronomer config.yaml File

First, ensure you have a copy of the `config.yaml` file of your platform namespace.

To do this, you can run:

```sh
helm get values <your-platform-release-name> -n <your-platform-namespace>  > config.yaml
```

Review this configuration and delete the line `"USER-SUPPLIED VALUES:"` if you see it.

## Step 2: Verify Your Current Platform Version

To verify the version of Astronomer you're currently operating with, run:

```sh
helm list --all-namespaces | grep astronomer
```

## Step 3: Run Astronomer's Patch Upgrade Script

Now, review and run the script below to upgrade to the patch version of your choice.

Make sure to substitute the following 3 variables with your own values:

- `RELEASE_NAME`
- `NAMESPACE`
- `ASTRO_VERSION`

```sh
#!/bin/bash
set -xe

RELEASE_NAME=<astronomer-platform-release-name>
NAMESPACE=<astronomer-platform-namespace>
ASTRO_VERSION=0.25.<astronomer-patch-version>

helm3 repo add astronomer https://helm.astronomer.io
helm3 repo update

# upgradeDeployments false ensures that Airflow charts are not upgraded when this script is ran
# If you deployed a config change that is intended to reconfigure something inside Airflow,
# then you may set this value to "true" instead. When it is "true", then each Airflow chart will
# restart. Note that some stable version upgrades require setting this value to true regardless of your own configuration.
helm3 upgrade --namespace $NAMESPACE \
            -f ./config.yaml \
            --reset-values \
            --version $ASTRO_VERSION \
            --set astronomer.houston.upgradeDeployments.enabled=false \
            $RELEASE_NAME \
            astronomer/astronomer
```

> **Note:** If you do not specify a patch version above, the script will automatically pull the latest Astronomer Enterprise patch available in the [Astronomer Helm Chart](https://github.com/astronomer/astronomer/releases). If you set `ASTRO_VERSION=0.25` and `--version 0.25`, for example, Astronomer v0.25.9 will be installed if it is the latest v0.25 patch available.
