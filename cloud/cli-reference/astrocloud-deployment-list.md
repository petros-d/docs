---
sidebar_label: "astrocloud deployment list"
title: "astrocloud deployment list"
id: astrocloud-deployment-list
description: Reference documentation for astrocloud deployment list.
---

## Description

List all Deployments within your current Workspace that you have access to.

## Usage

```sh
astrocloud deployment list
```

## Options

| Option  | Description                             | Possible Values |
| ------- | --------------------------------------- | --------------- |
| `--all` | Show deployments across all Workspaces. | ``              |

## Examples

```sh
$ astrocloud deployment list --all
# Shows Deployments from all Workspaces that you're authenticated to
```

## Related Commands

- [`astrocloud auth login`](cli-reference/astrocloud-auth-login.md)
- [`astrocloud deploy`](cli-reference/astrocloud-deploy.md)
