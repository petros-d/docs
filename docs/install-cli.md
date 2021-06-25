---
sidebar_label: 'Install CLI (Beta)'
title: Install the Astronomer CLI
---

## Overview

The Astronomer CLI is your primary tool for deploying code and DAGs to your Airflow Deployments on Astronomer. For the private beta of Astronomer Cloud, we ask that you install a new beta version of the CLI to accompany your beta Cloud installation.

## Install Commands

You'll need a specific beta version of the Astronomer CLI to begin deploying DAGs to your beta environment. In an empty directory on your local machine, run one of the following commands depending on your OS.

**macOS**

```bash
curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.1-gen2_darwin_amd64/astro -o astro && chmod +x astro
```

**Windows(powershell)**

```powershell
Invoke-WebRequest -Uri https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.1-gen2_windows_amd64/astro.exe -OutFile astro.exe
```

**Linux**

```bash
curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.1-gen2_linux_amd64/astro -o astro && chmod +x astro
```

## Running the CLI

The beta version of the CLI is installed as an executable. Unlike with the publicly released CLI, commands must be run directly from your project directory (e.g. `/users/.../astro deploy`). To make running commands easier, we recommend adding the path to the executable to your [$PATH](https://linuxize.com/post/how-to-add-directory-to-path-in-linux/) environment variable.
