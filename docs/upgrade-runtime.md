---
sidebar_label: 'Upgrade Runtime'
title: 'Upgrade Astronomer Runtime'
id: 'upgrade-runtime'
---

## Overview

New versions of Astronomer Runtime are are released regularly to support new major, minor, or patch versions of Apache Airflow. To take advantage of new features, as well as bug and security fixes, we recommend regularly upgrading your Deployment's Runtime version.

Follow this guide to upgrade a Deployment's Airflow environment using the Astronomer CLI. You can use these steps to upgrade to any major, minor, or patch version of Runtime.

## Step 1: Update Your Dockerfile

1. In your local Astronomer project directory, open your `Dockerfile`.
2. Copy the link for the new Astronomer Runtime image into the `FROM` statement in your Dockerfile.

    Once you upgrade Runtime versions, you can't downgrade to an earlier version. The Airflow metadata database structurally changes with each release, making for backwards incompatibility across versions.

    For a table reference of available Runtime versions, see [Available Versions](runtime-support-policy#available-versions). For Astronomer's platform's full collection of Docker Images, go to the [Astronomer Runtime repository on Quay.io](https://quay.io/repository/astronomer/astro-runtime?tab=tags).

## Step 2: Deploy Your Image

To test your upgrade locally:

1. Save the changes to your Dockerfile.
2. In your project directory, run `astro dev stop` followed by `astro dev start`. This restarts the Docker containers for the Airflow Webserver, Scheduler, and DB.
3. Access your locally-running Airflow environment.

To push your upgrade to Astronomer, run `astro deploy` and select the Deployment you want to upgrade. This will bundle your updated directory, re-build your image and push it to your hosted Deployment on Astronomer.

## Step 3: Confirm Your Upgrade

1. In the Astronomer UI, open your upgraded Airflow Deployment.
2. Click **Open Airflow**.
3. In the Airflow UI, scroll to the bottom of any page. You should see your new Runtime version in the footer:

<div class="text--center">
  <img src="/img/docs/version-footer.png" alt="Astronomer Runtime version shown in the Airflow UI footer" />
</div>

## Patch Versions of Runtime

If you're pushing code a Deployment for the first time without specifying a patch version in your `Dockerfile`, the latest patch version available is automatically pulled.

Subsequent code pushes to this Deployment do not automatically pull the latest corresponding patch version. To upgrade to a new patch version on an existing Deployment, you must follow the steps in this guide to add the new patch version to your `Dockerfile`.
