---
sidebar_label: "astrocloud dev run"
title: "astrocloud dev run"
id: astrocloud-dev-run
description: Reference documentation for astrocloud dev run.
---

## Overview

Run Airflow commands in your local Airflow environment.

## Usage

```sh
astrocloud dev run <airflow-command>
```

## Examples

```sh
$ astrocloud dev run create_user -r Admin -u admin -e admin@example.com -f admin -l user -p admin
# Run OSS `create_user` command
```
