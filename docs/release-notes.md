---
sidebar_label: 'Astronomer Cloud'
title: 'Astronomer Cloud Release Notes'
id: 'release-notes'
---

## Overview

Astronomer is committed to continuous development during the Private Beta Program. As you grow with us, expect to see bug fixes and improved functionality on a daily basis. To keep your team updated, this document will provide a weekly summary of all changes made and released to Astronomer Cloud during the Private Beta Program.

If you have any questions or a bug to report, don't hesitate to reach out to us via Slack or Intercom. We're here to help.

For release notes specific to the Astronomer CLI, see [Astronomer CLI Release Notes](cli-release-notes).

## July 30, 2021

**Latest CLI Version**: `0.2.7-beta` ([Release notes](cli-release-notes#v027-beta))

### Improvements

- Increased the limit of **Worker Resources** from 30 AU to 175 AU (17.5 CPU, 65.625 GB RAM). If your tasks require this many resources, reach out to us to make sure that your Cluster is sized appropriately.
- Collapsed the **People** and **Teams** tabs on the left-hand navigation bar into a single **Access** tab.
- Added a **Cluster** field to the Deployments tab in the Astronomer UI. Now, you can reference which Cluster each of your Deployments is in.
- Replaced our white "A" favicon to one that supports color mode.
- Informational tooltips now available in **Deployment Configuration**.

### Bug Fixes

- Fixed an issue where a deleted user could not sign up to Astronomer Cloud again.
- Removed Deployment-level user roles from the Astronomer UI. Support for them coming soon.
- Fixed an issue where a newly created Deployment wouldn't show up on the list of Deployments in the Workspace.
