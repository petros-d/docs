---
sidebar_label: "Runtime Versioning"
title: "Astronomer Runtime Versioning"
id: runtime-versioning
---

## Overview

Astronomer Runtime is a Debian-based, production-ready distribution of Apache Airflow that extends the open source project to provide you with differentiated functionality that centers around reliability, efficiency, and performance.

You can use a Runtime Docker image on [Astronomer's Docker Registry](https://quay.io/repository/astronomer/astro-runtime) to run Airflow on Astronomer Cloud. A Deployment on Astronomer runs one version of Runtime, but you can use different versions of Runtime on different Deployments within a given Workspace or Cluster. All Astronomer projects require that you specify an Astronomer Runtime image in your `Dockerfile`.

This document provides information on the following:

- How Astronomer Runtime is versioned
- Which versions of Astronomer Runtime are currently available
- The support schedule and end-of-support date for all versions

For guidelines on how to upgrade, read [Upgrade Astronomer Runtime](upgrade-runtime).

## Versioning Scheme

Astronomer Runtime is versioned independently of Airflow and follows a semantic versioning scheme that includes major, minor, and patch versions. The following example Runtime upgrades represent each possible type of version:

- **Major version:** **3**.0.0 > **4**.0.0
- **Minor version:** 3.**0**.0 > 3.**1**.0
- **Patch version:** 3.0.**0** > 3.0.**1**

The following sections describe the changes that each type of version can contain.

### Major Versions

Major versions of Astronomer Runtime can deliver significant new feature sets from both Apache Airflow and Astronomer that may cause breaking changes and potentially require a user migration. Major Astronomer Runtime release can triggered by:

- A change in the underlying Airflow version.
- A backwards-incompatible change in Astronomer's commercial Runtime features that potentially requires modifying DAG code.
- A major feature addition that necessitates the support of a major version upgrade, even if no breaking changes are present.

### Minor Versions

Minor versions of Astronomer Runtime include features that are backwards compatible within its given major version. For example, you can upgrade from Astronomer Runtime `5.1` to `5.2` with the guarantee of no breaking changes. Minor release upgrades can be completed at any time and are expected to include minimal to no maintenance.

### Patch Versions

Patch versions of Astronomer Runtime deliver backwards compatible bug or security fixes, including fixes to Apache Airflow and Astronomer Runtime code.

A patch release can include:

- A change in the underlying Airflow version to a new **patch** release.
- A bug fix to our commercial add-ons within Astronomer Runtime that is backwards compatible.
- A security fix to our commercial add-ons within Astronomer Runtime that is backwards compatible.

## Runtime Images

Runtime Docker images come in two variants:

- `quay.io/astronomer/astro-runtime:<version>`
- `quay.io/astronomer/astro-runtime:<version>-base`

For example, the images for Astronomer Runtime 3.0.0 would be:

- `quay.io/astronomer/astro-runtime:3.0.0`
- `quay.io/astronomer/astro-runtime:3.0.0-base`

To provide the smoothest out-of-the-box Airflow experience, the Astronomer CLI defaults to non-`base` images. These images incorporate Docker ONBUILD commands to copy and scaffold your Astronomer project directory so you can more easily pass those files to the containers running each core Airflow component. If you need advanced customization of your Airflow image, you might need to use the `-base` Docker image for a given release.

## Available Runtime Versions

The following table contains all Astronomer Runtime images supported on Astronomer Cloud. For our platform's full collection of Docker images, reference [Astronomer on Quay.io](https://quay.io/repository/astronomer/astro-runtime?tab=tags).

Note that this table includes only major and minor releases of Runtime. When upgrading to a new version of Runtime, you must specify a patch version number in the `FROM` statement of your Dockerfile. For the latest available patch version, see [Runtime Release Notes](runtime-release-notes).

| Runtime Version                | Airflow Version                                                                            | Debian-based Image                                  | Release Date    |
| ------------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------- | --------------- |
| [3.0.x](runtime-release-notes) | [2.1.1](https://github.com/astronomer/astro-runtime/blob/main/CHANGELOG.md#301-2021-08-31) | `FROM quay.io/astronomer/astro-runtime:3.0.<patch>` | August 12, 2021 |
