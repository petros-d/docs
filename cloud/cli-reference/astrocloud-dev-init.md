---
sidebar_label: "astrocloud dev init"
title: "astrocloud dev init"
id: astrocloud-dev-init
description: Reference documentation for astrocloud dev init.
---

## Description

Initialize an [Astronomer project](create-project.md) in an empty local directory. This skeleton project can be either run locally with `astro dev start` or pushed to Astronomer via `astro deploy`.

## Usage

```sh
astrocloud dev init
```

## Options

| Option              | Description                                                                                                        | Possible Values             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `--airflow-version` | The Airflow version for your project. By default, the project is initialized with the most recent Airflow version. | All Airflow versions (2.0+) |
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
