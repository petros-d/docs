---
sidebar_label: "astrocloud dev run"
title: "astrocloud dev run"
id: astrocloud-dev-run
description: Reference documentation for astrocloud dev run.
---

## Overview

Run [Airflow CLI commands](https://airflow.apache.org/docs/apache-airflow/stable/cli-and-env-variables-ref.html) in your local Airflow environment.

## Usage

```sh
astrocloud dev run <airflow-command>
```

## Examples

```sh
$ astrocloud dev run create_user -r Admin -u admin -e admin@example.com -f admin -l user -p admin
# Run OSS `create_user` command
```

## Related Commands

- [`astrocloud dev logs`](cli-reference/astrocloud-dev-logs.md)
- [`astrocloud dev ps`](cli-reference/astrocloud-dev-ps.md)
