---
title: 'Astronomer v0.27 Release Notes'
sidebar_label: 'Release Notes'
id: release-notes
description: Astronomer Enterprise release notes.
---

## Overview

<!--- Version-specific -->

This document includes all release notes for Astronomer Enterprise v0.27.

Astronomer v0.27 is the latest Stable version of Astronomer Enterprise, while v0.25 remains the latest long-term support (LTS) version. To upgrade to Astronomer v0.27 from v0.26, read [Upgrade to a Stable Version](upgrade-astronomer-stable.md). For more information about Enterprise release channels, read [Release and Lifecycle Policies](release-lifecycle-policy.md).

We're committed to testing all Astronomer Enterprise versions for scale, reliability and security on Amazon EKS, Google GKE and Azure AKS. If you have any questions or an issue to report, don't hesitate to [reach out to us](https://support.astronomer.io).

## 0.27.2

Release date: January 21, 2022

### Improvements to the Local Development Experience

:::danger Breaking Change

The latest version of the Astronomer CLI uses Docker engine `1.13.1` to run Airflow locally via `astro dev`. If you haven't done so already, ensure that your version of Docker Engine is at least `1.13.1` before upgrading the Astronomer CLI to v0.27.2. If you don't have a supported Docker Engine version, then `astro dev` commands will not work on your local machine.

:::

Astronomer CLI v0.27.2 includes several improvements to the local development experience:

- You no longer need to turn off Docker Buildkit to run `astro dev start`.
- You can now run the Triggerer in a local Airflow environment, meaning that you can test DAGs that include [deferrable operators](https://airflow.apache.org/docs/apache-airflow/stable/concepts/deferring.html) before pushing them to a Deployment. Triggerer logs appear alongside Webserver and Scheduler logs when you run `astro dev logs`.
- The Docker containers for the Scheduler, Webserver, and Triggerer now have standard names that persist after restarting your environment. You can check the names of these containers in your local Airflow environment by running `astro dev ps`:

    ```sh
    $ astro dev ps

    Name				State		Ports
    webserver			running		8080
    triggerer			running		
    scheduler			running		
    0.27.2_a64c1a-postgres-1	running		5432
    ```

    To change the default names of these containers, run `astro config set <airflow-component>.container_name <new-component-container-name>`.

### Import IDP Groups into Astronomer as Teams

You can now import existing groups of users from your IDP to Astronomer in the form of Teams. A Team is a group of users that share the same permissions to Workspaces and Deployments.

Teams are based directly on existing user groups on your IDP platform. Using existing IDP groups as the basis for Teams enables swift onboarding to Astronomer and better control over permissions at large organizations with specific security requirements.

For more information about importing IDP groups into Astronomer as Teams, read [Import IDP Groups](import-idp-groups.md)

### Additional Improvements

- The Astronomer CLI can now be installed on machines with an [Apple M1 chip](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/) via both curl and HomeBrew.

### Bug Fixes

- Fixed an issue where you could not run an Astronomer project via `astro dev init/ astro dev start` in a directory with certain characters in the directory name
- Deploying DAGs via Git Sync now works only in Deployments running Airflow 2.0+

## 0.27.1

Release date: January 10, 2022

### Bug Fixes

- Fixed an issue where users could not create Deployments via an IAM role

## 0.27.0

Release date: December 21, 2021

### Custom OAuth Flows

You can now configure a custom OAuth flow as an alternative to Astronomer's default implicit flow. You can customize Astronomer's existing Okta, Google, and GitHub OAuth flows, or you can import an entirely custom OAuth flow. For more information, read [Configure a Custom OAuth Flow](integrate-auth-system.md#configure-a-custom-oauth-flow).

### Deploy DAGs via Git Sync

You can now configure a Git repo to continually push DAGs to an Astronomer Deployment via git-sync. DAGs deployed via git-sync automatically appear in the Airflow UI without requiring additional action or causing downtime. For more information, read [Deploy DAGs via Git Sync](deploy-git-sync.md).

### External ElasticSearch Logging

Custom ElasticSearch logging tools are now supported via new values in your `config.yaml` file:

```yaml
# External ES logging
global:
  customLogging:
    enabled: true
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

### Bug Fixes

- Dropped support for Kubernetes 1.17
- Fixed an issue where redeployments could clobber existing annotations for namespaces
- Fixed an issue where new Deployments could potentially generate invalid usernames for Celery and the metadata DB
- Fixed an issue where scheduler, webserver, and worker logs were not accessible via the Astronomer CLI
- Fixed an issue where where setting extra volumes via `config.yaml` did not work when NFS DAG deploys were enabled.
