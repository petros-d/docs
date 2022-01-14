---
sidebar_label: "astrocloud dev start"
title: "astrocloud dev start"
id: astrocloud-dev-start
description: Reference documentation for astrocloud dev start.
---

## Description

Stop all Airflow containers running on your local machine. Unlike `astro dev kill`, this command does not prune mounted volumes and will preserve data associated with your local Postgres Metadata Database.

## Usage

```sh
astrocloud dev stop
```

## Related Commands

- [`astrocloud dev start`](cli-reference/astrocloud-dev-start.md)
- [`astrocloud dev kill`](cli-reference/astrocloud-dev-kill.md)
