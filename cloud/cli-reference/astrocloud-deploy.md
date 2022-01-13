---
sidebar_label: 'astrocloud deploy'
title: 'astrocloud deploy'
id: astrocloud-deploy
description: Reference documentation for astrocloud deploy.
---

## Description

Deploy your Astronomer project to a Deployment on Astronomer Cloud. Specify a Deployment's release name in the command, or leave the command options blank to select from a list of all Deployments that you have access to.

## Usage

```sh
astrocloud deploy <deployment-release-name>
```

## Options

| Option  | Description                                          | Possible Values                   |
| ------- | ---------------------------------------------------- | --------------------------------- |
| `--force` | Force the deploy even if uncommitted changes exist | `` |
| `--prompt` | Force the prompt for selecting deployments to appear even if a Deployment is specified | `` |
| `--save` | Save the current directory/Deployment combination for future deploys | `` |
| `--workspace-id <string> `| Save the current directory/Deployment combination for future deploys | Any value |


## Examples

```sh
$ astrocloud deploy
# List of Deployments appears
$ astrocloud deploy asteroidic-vacuum-4865
# Deploy directly to a specific Deployment
$ astrocloud deploy asteroidic-vacuum-4865 --save
# Running `astrocloud deploy` will now automatically select this Deployment for your Astronomer project
```

## Related Commands
