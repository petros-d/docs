---
sidebar_label: "astrocloud dev kill"
title: "astrocloud dev kill"
id: astrocloud-dev-kill
description: Reference documentation for astrocloud dev kill.
---

## Description

Fully reset all Airflow containers and delete all data associated with your local Airflow environment, including task runs and logs.

This command is most often used to restart a cluster when testing new DAGs or settings in a non-production environment. After using `astro dev kill`, you can restart your environment with `astro dev start`.

## Usage

```sh
astrocloud dev kill
```

## Related Commands

- [`astrocloud dev start`](cli-reference/astrocloud-dev-start.md)
- [`astrocloud dev stop`](cli-reference/astrocloud-dev-stop.md)
