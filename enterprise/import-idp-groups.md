---
sidebar_label: 'Import IDP Groups'
title: 'Import Identity Provider Groups into Astronomer Enterprise'
id: import-idp-groups
description: Import your identity provider's organization structure into Astronomer Enterprise.
---

## Overview

You can import existing identity provider (IDP) groups into Astronomer Enterprise as Teams, which are groups of Astronomer users that have the same set of permissions. Importing existing IDP groups as Teams enables swift onboarding to Astronomer and better control over multiple user permissions.

Astronomer Teams function similarly to users. Just like with an individual user, you can:

- Assign Teams to both Workspaces and Deployments.
- Assign Viewer, Editor, or Admin roles to a Team.
- View information about users and permissions form the Astronomer UI.

This guide provides setup steps for importing IDP groups as Teams on Astronomer. Before completing this setup, keep in mind the following about Teams:

- By default, the first user to log in to your Astronomer platform is automatically granted `SYSTEM ADMIN` permissions. If you are configuring Teams for a new Astronomer installation, we recommend first logging in as the user who will be responsible for importing your IDP groups using Astronomer's default login flow.
- Teams are based solely on the IDP group they were configured from, meaning that you cannot configure team membership from Astronomer.
- If a user is added or removed from your original IDP group, that change applies to the related Astronomer Team only after the user logs back in to Astronomer.
- Importing an IDP has no effect on existing users on your Astronomer installation. If an existing Astronomer user with one role is added to a Team with a different role, then that user will be granted the most permissive role between the two contexts.

## Prerequisites

To complete this setup, you need:

- System Admin permissions.
- An [integrated IDP](integrate-auth-system.md).
- An IDP group.

## Step 1: Enable Astronomer Teams

In your `config.yaml` file, set the following value.

```yaml
# Auth configuration.
auth:
  openidConnect:
    idpGroupsImportEnabled: true
```

Save this configuration and push it to your platform as described in [Apply a Platform Config Change](apply-platform-config.md).


## Step 2: Add a Group Claim to Your IDP Group

To add your IDP group to Astronomer as a Team, Astronomer needs to be able to recognize the IDP group through a group claim and assign members from the group through tokens.

If you haven't already, add group claims to the IDP groups that you're importing to Astronomer. Refer to your IDP's documentation for information on how to complete this step. For example, for Okta you can refer to [Customize tokens returned from Okta with a Groups claim](https://developer.okta.com/docs/guides/customize-tokens-groups-claim/main).

## Step 3: Add a Group Claim to Your IDP Group

To add your IDP group to Astronomer as a Team, Astronomer needs to be able to recognize the IDP group through a group claim and assign members from the group through tokens.

If you haven't already, add group claims to the IDP groups that you're importing to Astronomer. Refer to your IDP's documentation for information on how to complete this step. For example, for Okta you can refer to [Customize tokens returned from Okta with a Groups claim](https://developer.okta.com/docs/guides/customize-tokens-groups-claim/main).

Once you configure this claim, your IDP group will be automatically imported to Astronomer as a Team. The name that you specify in your group claim will become your Astronomer Team name.

## Step 4: Add Teams to Workspaces and Deployments

To add a Team to a Workspace:

1. In the Astronomer UI, go to your Workspace and open the **Teams** tab.
2. Click **Add Team**.
3. Under **Team Name**, enter the name of your IDP group.
4. Select a **Workspace Role** for the Team. If your Workspace has existing Deployments, you can also configure the Team's permissions to those Deployments on this page:

    ![Screen for adding a Team to a Workspace](/img/docs/add-team-workspace.png)

5. Click **Add**.

To add a Team to a Deployment:

1. In the Astronomer UI, go to your Deployment and open the **Teams** tab.
2. In the search bar that appears, search for your Team's name.
3. When your Team appears, select a Deployment-level role for the Team and click the **+** button:

    ![Screen for adding a Team to a Deployment](/img/docs/add-team-deployment.png)
