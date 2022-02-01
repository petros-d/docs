---
sidebar_label: "astrocloud dev init"
title: "astrocloud dev init"
id: astrocloud-dev-init
description: Reference documentation for astrocloud dev init.
---

## Description

Initialize an [Astronomer project](create-project.md) in an empty local directory. An Astronomer project contains the set of files necessary to run Airflow, including dedicated folders for your DAG files, plugins, and dependencies. An Astronomer project can be either run locally with `astro dev start` or pushed to Astronomer via `astro deploy`.

## Usage

```sh
astrocloud dev init
```

## Options

| Option              | Description                                                                                                        | Possible Values             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `--name`            | Name of your Astronomer project                                                                                    | Any string                  |

## Examples

```sh
$ astrocloud dev init
# Generate default project
$ astrocloud dev init 2.2.0
# Generate default project based on Airflow 2.2.0
$ astrocloud deploy --name=MyProject
# Generated `config.yaml` file with `name=MyProject`
```

## Related Commands

- [`astrocloud dev start`](cli-reference/astrocloud-dev-start.md)
- [`astrocloud dev stop`](cli-reference/astrocloud-dev-stop.md)
- [`astrocloud dev init`](cli-reference/astrocloud-dev-init.md)
- [`astrocloud dev run`](cli-reference/astrocloud-dev-run.md)
- [`astrocloud dev logs`](cli-reference/astrocloud-dev-logs.md)
