---
sidebar_label: 'Astronomer CLI'
title: 'Astronomer CLI Release Notes'
id: cli-release-notes
---

## Overview

This document provides a summary of all changes made to the [Astronomer CLI](install-cli). For general product release notes, go to [Astronomer Cloud Release Notes](release-notes).

If you have any questions or a bug to report, don't hesitate to reach out to us via Slack or Intercom. We're here to help.

## v1.0.2

Release date: October 25, 2021

- Improved help text throughout the CLI

## v1.0.1

Release date: October 15, 2021

- This release contains changes exclusively related to the Astronomer CLI developer experience.

## v1.0.0

Release date: September 28, 2021

- Improvement: `astro dev init` now always pulls the latest version of Astronomer Runtime for new projects. This means that you no longer have to upgrade the CLI in order to take advantage of a new Runtime release. Note that you still need to manually [upgrade Runtime](upgrade-runtime) for existing projects.
- Improvement: Updated error messages throughout the CLI to be more clear and useful

## v0.2.9-beta

Release date: September 20, 2021

- Improvement: Bumped the default Astronomer Runtime version for new projects to [`3.0.2`](runtime-release-notes#astronomer-runtime-302)
- Improvement: You can now use [`astro dev run`](https://www.astronomer.io/docs/cloud/stable/resources/cli-reference#astro-dev-run) to run Airflow CLI commands
- Improvement: You can now use [`astro dev logs`](https://www.astronomer.io/docs/cloud/stable/resources/cli-reference#astro-dev-logs) to show logs for the Airflow Scheduler and Webserver when developing locally

## v0.2.8-beta

Release date: August 31, 2021

- Improvement: Bumped the default Astronomer Runtime version for new projects to [`3.0.0`](runtime-release-notes#astronomer-runtime-300)
- Improvement: Updated help text throughout the CLI
- Improvement: Projects created with `astro dev init` now include a README file

## v0.2.7-beta

Release date: July 31, 2021

- Bug Fix: Fixed an issue where users could not push DAGs to Deployments on Astronomer via the CLI.

## v0.2.6-beta

Release date: July 30, 2021

- Improvement: You can now run `astro auth login` without specifying a domain (`astronomer.io` is always assumed).
