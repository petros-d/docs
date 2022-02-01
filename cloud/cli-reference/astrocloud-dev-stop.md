---
sidebar_label: "astrocloud dev stop"
title: "astrocloud dev stop"
id: astrocloud-dev-stop
description: Reference documentation for astrocloud dev stop.
---

## Description

Pause all Docker containers running your local Airflow environment. Unlike `astro dev kill`, this command does not prune mounted volumes and delete data associated with your local Postgres database. If you run this command, Airflow connections and task history will be preserved.

## Usage

```sh
astrocloud dev stop
```

## Related Commands

- [`astrocloud dev start`](cli-reference/astrocloud-dev-start.md)
- [`astrocloud dev kill`](cli-reference/astrocloud-dev-kill.md)
