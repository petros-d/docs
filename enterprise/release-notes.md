---
title: 'Astronomer v0.26 Release Notes'
sidebar_label: 'Release Notes'
id: release-notes
description: Astronomer Enterprise release notes.
---

## Overview

This document includes all release notes for Astronomer Enterprise v0.26.

Astronomer v0.26 is the latest Stable version of Astronomer Enterprise, while v0.25 remains the latest long-term support (LTS) version. To upgrade to Astronomer v0.26 from v0.25, read [Upgrade to v0.26](upgrade-astronomer-stable.md). For more information about Enterprise release channels, read [Release and Lifecycle Policies](release-lifecycle-policy.md).

We're committed to testing all Astronomer Enterprise versions for scale, reliability and security on Amazon EKS, Google GKE and Azure AKS. If you have any questions or an issue to report, don't hesitate to [reach out to us](https://support.astronomer.io).

## 0.27.1

Release date: December 16, 2021

### Custom OAuth Flows

You can now configure a custom OAuth flow as an alternative to Astronomer's default implicit flow. You can customize Astronomer's existing Okta, Google, and GitHub OAuth flows, or you can import an entirely custom OAuth flow. For more information, read [Customize OAuth Flow](custom-oauth.md).

### Deploy DAGs via Git Sync

You can now configure a Git repo to continually push DAGs to an Astronomer Deployment via git-sync. DAGs deployed via git-sync automatically appear in the Airflow UI without requiring additional action or causing downtime. For more information, read [Deploy DAGs via Git Sync](deploy-git-sync.md).

### External ElasticSearch Logging

Custom ElasticSearch logging tools are now supported via new values in your `config.yaml` file:

```yaml
# External ES logging
 customLogging:
   enabled: false
   scheme: https
   host: ""
   port: ""
   secret: ""
   #secretName: ~
   #awsSecretName: ~
   #awsIAMRole: ~
   #awsServiceAccountAnnotation: ~
```

### CLI Support for Podman

By default, the Astronomer CLI uses Docker to execute a few specific commands. As an alternative, you can now configure the Astronomer CLI to use Podman instead. For more information, read [Run the CLI with Podman](cli-podman.md).
