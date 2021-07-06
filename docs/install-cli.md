---
sidebar_label: 'Install the CLI (Beta)'
title: Install the Astronomer CLI
id: install-cli
---

## Overview

The Astronomer CLI is the easiest way to run Apache Airflow on your local machine and deploy code to Astronomer. This guide provides instructions for how to install and use the Astronomer CLI in the context of the Astronomer Cloud Private Beta.

## Install the CLI

To install the Astronomer CLI, run the appropriate command for your OS in an empty directory:

### Mac

```bash
curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.1-gen2_darwin_amd64/astro -o astro && chmod +x astro
```

### Windows (PowerShell)

```powershell
Invoke-WebRequest -Uri https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.1-gen2_windows_amd64/astro.exe -OutFile astro.exe
```

### Linux

```bash
curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.1-gen2_linux_amd64/astro -o astro && chmod +x astro
```

## Running CLI Commands

The CLI for Astronomer Cloud is installed as an executable. With this version, commands must be run directly from where you installed the CLI (e.g. `/users/.../astro deploy`). To make running commands easier, we recommend adding the path to the executable to your [$PATH](https://linuxize.com/post/how-to-add-directory-to-path-in-linux/) environment variable. 
