---
sidebar_label: 'Install the CLI (Beta)'
title: 'Install the Astronomer CLI'
id: 'install-cli'
---

## Overview

The Astronomer CLI is the easiest way to run Apache Airflow on your machine.

From the CLI, you can create a local Apache Airflow environment with a dedicated Webserver, Scheduler and Postgres Database. Once you initialize a project on Astronomer, you can easily customize your image (e.g. add Python or OS-level packages, plugins etc.) and push that image to run on your local machine.

During the Private Beta Program for Astronomer Cloud, you can also use the CLI to do the following:

- Authenticate to Astronomer.
- List the Astronomer Workspace and Deployments you have access to.
- Deploy to an Airflow Deployment on Astronomer.
- Create Users and Deployments.

This guide provides instructions for how to install the Astronomer CLI during the Private Beta Program.

## Step 1. Create a Directory for your Astronomer Project

For Astronomer Cloud, the Astronomer CLI is installed as a local `astro` executable instead of globally on your machine. To start, create a new directory for your Astronomer project by running:

```
$ mkdir <new-directory-name>
$ cd <new-directory-name>
```

Next, we'll install the CLI binary in this directory.

## Step 2. Install the Astronomer CLI

Now, run the appropriate command for your OS in the directory you created in Step 1 to install the CLI.

### MacOS

```bash
curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.4-beta_darwin_amd64/astro -o astro && chmod +x astro
```

### Windows (PowerShell)

```powershell
Invoke-WebRequest -Uri https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.4-beta_windows_amd64/astro.exe -OutFile astro.exe
```

### Linux

```bash
curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_0.2.4-beta_linux_amd64/astro -o astro && chmod +x astro
```

## Step 4. Confirm the Install

Once you run any of the CLI install commands above, you should see the following output:

```
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   215  100   215    0     0    486      0 --:--:-- --:--:-- --:--:--   486
```

To confirm the CLI was installed properly, run the following from the directory you just created:

```
./astro version
```

You should see the following:

```
<your-directory> % ./astro version
Astro CLI Version: 0.2.4-beta
```

## Step 4. Run CLI Commands

As noted above, the Astronomer Cloud CLI is installed as a local executable. For that reason, commands *must* be run from the directory in which you installed the CLI and explicitly reference the binary (`astro`). For the equivalent of `astro dev init`, for example, you'd have to run:

```
your-directory % ./astro dev init
```

To make this easier, we recommend adding the directory you just created for your Astronomer project to your `$PATH` variable. This will allow you to run Astronomer CLI commands _without_ explicitly specifying the absolute path to the executable file (`astro`). For more information, see [Linux instructions](https://linuxize.com/post/how-to-add-directory-to-path-in-linux/#adding-a-directory-to-your-path).

## What's Next

Now that you've installed the Astronomer CLI, you're ready to initialize a local Airflow environment and push DAGs to Astronomer Cloud.

For instructions, go to [Deploy Code on Astronomer Cloud](deploy-code).