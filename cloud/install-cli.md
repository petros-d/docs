---
sidebar_label: 'Install the CLI'
title: 'Install the Astronomer Cloud CLI'
id: install-cli
description: Install the Astronomer Cloud CLI, the best way to run Apache Airflow and test data pipelines on your local machine.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {siteVariables} from '@site/src/versions';

## Overview

The Astronomer Cloud CLI is the easiest way to run Apache Airflow on your machine.

From the CLI, you can run a local Apache Airflow environment with a dedicated Webserver, Scheduler and Postgres Database. Once you create an Astronomer project, you can easily customize it (e.g. add Python or OS-level packages, plugins etc.) and test it on your local machine.

You can also use the CLI to:

- Authenticate to Astronomer.
- List the Astronomer Workspace and Deployments you have access to.
- Deploy a project to Astronomer Cloud.

This guide provides instructions for how to install the Astronomer Cloud CLI.

## Prerequisites

To install and use the Astronomer Cloud CLI on Mac, you must have:

- [Homebrew](https://brew.sh/)
- [Docker Desktop](https://docs.docker.com/get-docker/) (v18.09 or higher).

To install and use the Astronomer Cloud CLI on Windows, you must have:

- [Docker Engine](https://docs.docker.com/engine/install/) (v0.13.1 or higher).

## Install the Astronomer Cloud CLI

<Tabs
    defaultValue="mac"
    values={[
        {label: 'Mac', value: 'mac'},
        {label: 'Windows', value: 'windows'},
    ]}>
<TabItem value="mac">

Install the Astronomer Cloud CLI by running the following command:

```sh
brew install astronomer/cloud/astrocloud
```

</TabItem>

<TabItem value="windows">

1. In a PowerShell terminal, create a new directory for your Astronomer project and set it as your current directory:

    ```powershell
    md my-project && cd my-project
    ```

2. Based on your CPU, run one of the following commands to download the Astronomer Cloud CLI executable into your project directory.

    - AMD64:

        ```powershell
        Invoke-WebRequest -Uri https://goreleaserdev.blob.core.windows.net/goreleaser-test-container/releases/v1.0.0/cloud-cli_1.0.0_Windows_x86_64.tar.gz -o astrocloudcli.tar.gz
        ```

    - ARM64:

        ```powershell
        Invoke-WebRequest -Uri https://goreleaserdev.blob.core.windows.net/goreleaser-test-container/releases/v1.0.0/cloud-cli_1.0.0_Windows_arm64.tar.gz -OutFile astrocloudcli.tar.gz
        ```

3. Run the following command to unzip the executable:

    ```sh
    tar -xvzf .\astrocloudcli.tar.gz
    ```

4. To run the executable without specifying its file path, save `astrocloud.exe` in a secure location on your machine and add its filepath in the Windows PATH environment variable. For more information about configuring the PATH environment variable, read [Java documentation](https://www.java.com/en/download/help/path.html).

</TabItem>
</Tabs>

## Confirm the Install

To confirm the CLI was installed properly, run the following CLI command:

```
astrocloud version
```

If the installation was successful, you should see the following output:

<pre><code parentName="pre">{`% astrocloud version
Astro CLI Version: ${siteVariables.cliVersion}`}</code></pre>

## Migrate from the `./astro` Executable to the Astronomer Cloud CLI

If you currently use the `astro` executable file to run CLI commands, we strongly recommend that you upgrade to the Astronomer Cloud CLI. To do this:

1. Delete the `./astro` executable file and any related system environment variables or symbolic links from your machine.
2. In any existing Astronomer project directories, delete the `.astro` subdirectory previously generated by the `./astro` executable. This subdirectory might be hidden in graphical file browsers. You can show hidden files using `⌘ + Shift + .` on Mac or by selecting **View** > **Hidden items** in Windows file explorer.
3. Run `astrocloud dev init` in your project directories. This command will populate a directory with the appropriate `.astrocloud` folder without touching or replacing your existing project files.

## Next Steps

Now that you've installed the Astronomer Cloud CLI, you're ready to create an Astronomer project and start developing locally. For instructions, read [Create an Astronomer Project](create-project.md).
