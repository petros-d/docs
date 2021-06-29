---
sidebar_label: 'Install the CLI (Beta)'
title: Install the Astronomer CLI
id: install-cli
---

## Overview

The Astronomer CLI is the primary tool for deploying code and DAGs to Airflow Deployments on Astronomer. This guide provides setup and usage instructions for the private beta version of the Astronomer CLI, which must be used when deploying DAGs to your beta environment.

## Install the CLI

In an empty directory on your local machine, run the appropriate command for your OS:

**Mac**

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

The beta version of the CLI is installed as an executable. Unlike with the publicly released CLI, commands must be run directly from where you installed the CLI (e.g. `/users/.../astro deploy`). To make running commands easier, we recommend adding the path to the executable to your [$PATH](https://linuxize.com/post/how-to-add-directory-to-path-in-linux/) environment variable.
