---
sidebar_label: 'Install the CLI'
title: 'Install the Astronomer CLI'
id: install-cli
description: Install the Astronomer CLI, the best way to run Apache Airflow and test data pipelines on your local machine.
---

import {siteVariables} from '@site/src/versions';

## Overview

The Astronomer CLI is the easiest way to run Apache Airflow on your machine.

From the CLI, you can run a local Apache Airflow environment with a dedicated Webserver, Scheduler and Postgres Database. Once you create an Astronomer project, you can easily customize it (e.g. add Python or OS-level packages, plugins etc.) and test it on your local machine.

You can also use the CLI to:

- Authenticate to Astronomer.
- List the Astronomer Workspace and Deployments you have access to.
- Deploy a project to Astronomer Cloud.

This guide provides instructions for how to install the Astronomer CLI.

## Step 1. Create a Directory for your Astronomer Project

For Astronomer Cloud, the Astronomer CLI is installed as a local `astro` executable instead of globally on your machine. To start, create a new directory for your Astronomer project by running:

```
mkdir <new-directory-name>
```

Then, run:

```
cd <new-directory-name>
```

Next, we'll install the CLI binary in this directory.

## Step 2. Install the Astronomer CLI

Now, run the appropriate command for your OS in the directory you created in Step 1 to install the CLI.

### MacOS

<pre><code parentName="pre">{`curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_${siteVariables.cliVersion}_darwin_amd64/astro -o astro && chmod +x astro`}</code></pre>

### Windows (PowerShell)

<pre><code parentName="pre">{`Invoke-WebRequest -Uri https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_${siteVariables.cliVersion}_windows_amd64/astro.exe -OutFile astro.exe`}</code></pre>

### Linux

<pre><code parentName="pre">{`curl https://astrohubclistorage.blob.core.windows.net/astrohub-cli/astro_${siteVariables.cliVersion}_linux_amd64/astro -o astro && chmod +x astro`}</code></pre>

## Step 3. Confirm the Install

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

<pre><code parentName="pre">{`% astro version
Astro CLI Version: ${siteVariables.cliVersion}`}</code></pre>

## Step 4. Run CLI Commands

The Astronomer Cloud CLI is installed as a local executable. For that reason, commands must be run from the directory in which you installed the CLI and explicitly reference the binary (`astro`).

For the equivalent of `astro dev init`, for example, you'd have to run:

```
./astro dev init
```

:::tip

To avoid having to run `./astro version` instead of just `astro version`, we recommend configuring your local machine to run Astronomer CLI commands without needing to specify the absolute path to the executable file. You can do so in one of two ways:

- Add the directory you created for your Astronomer project to your `$PATH` variable. For more information, see [Linux instructions](https://linuxize.com/post/how-to-add-directory-to-path-in-linux/#adding-a-directory-to-your-path).
- Create a symbolic link in your `bin` directory using a command similar to the following:

   ```sh
   sudo ln -s /source/path/to/astro /usr/local/bin/astro
   ```

   If you're an existing user of the original [Astronomer CLI](https://github.com/astronomer/astro-cli), we recommend changing the name of this symbolic link and creating an alias to something other than `astro` (for example, `astrocloud`).

:::

## Next Steps

Now that you've installed the Astronomer CLI, you're ready to create an Astronomer project and start developing locally. For instructions, read [Create an Astronomer Project](create-project.md).
