---
sidebar_label: "astrocloud dev start"
title: "astrocloud dev start"
id: astrocloud-dev-start
description: Reference documentation for astrocloud dev start.
---

## Description

Pause all Docker containers running your local Airflow environment. Unlike `astro dev kill`, this command does not prune mounted volumes and delete data associated with your local Postgres Metadata Database. If you run this command, Airflow connections and task history will be preserved.

## Usage

```sh
astrocloud dev stop
```

## Related Commands

- [`astrocloud dev start`](cli-reference/astrocloud-dev-start.md)
- [`astrocloud dev kill`](cli-reference/astrocloud-dev-kill.md)
