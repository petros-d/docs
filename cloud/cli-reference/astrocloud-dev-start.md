---
sidebar_label: "astrocloud dev start"
title: "astrocloud dev start"
id: astrocloud-dev-start
description: Reference documentation for astrocloud dev start.
---

## Description

Build your Astronomer project into a Docker image and spin up local a local Docker container for each Airflow component.

This command can be used regularly to start and run any Astronomer project locally. For more information, read [Develop and Run a Project Locally](develop-project.md#build-and-run-a-project-locally).

## Usage

```sh
astrocloud dev start
```

## Options

| Option              | Description                                                                                                        | Possible Values             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `--env` | Path to your environment variable file. Default is `.env` | Valid filepaths |


## Examples

```sh
$ astrocloud dev start --env=/users/username/documents/myfile.env
```

## Related Commands

- [`astrocloud dev stop`](cli-reference/astrocloud-dev-stop.md)
- [`astrocloud dev kill`](cli-reference/astrocloud-dev-kill.md)
- [`astrocloud dev init`](cli-reference/astrocloud-dev-init.md)
