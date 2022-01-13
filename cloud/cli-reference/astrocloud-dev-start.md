---
sidebar_label: "astrocloud dev start"
title: "astrocloud dev start"
id: astrocloud-dev-start
description: Reference documentation for astrocloud dev start.
---

## Description

Build your Astronomer project into a Docker image, spin up Airflow containers on your local machine, and run your project in a local Airflow environment.  

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
