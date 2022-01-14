---
sidebar_label: "astrocloud dev logs"
title: "astrocloud dev logs"
id: astrocloud-dev-logs
description: Reference documentation for astrocloud dev logs.
---

## Description

Show webserver and scheduler logs from your local Airflow environment.

## Usage

```sh
astrocloud dev init
```

## Options

| Option              | Description                                                                                                        | Possible Values             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `--follow` | Continue streaming most recent log output to your terminal. | ``|
| `--scheduler`            | Show only scheduler logs                                                                                  | ``                  |
| `--webserver`            | Show only webserver logs                                                                                  | ``                 |


## Examples

```sh
$ astrocloud dev logs
# Show most recent logs
$ astrocloud dev logs --folow
# Stream any new logs to the terminal
$ astrocloud dev logs --folow --scheduler
# Stream only new scheduler logs to the terminal
```

## Related Commands

- [`astrocloud dev ps`](cli-reference/astrocloud-dev-ps.md)
- [`astrocloud dev run`](cli-reference/astrocloud-dev-run.md)
