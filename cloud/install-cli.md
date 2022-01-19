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

## Install the Astronomer CLI via Homebrew

To install the Astronomer CLI via Homebrew, run:

```sh
brew install astronomer/cloud/astrocloud
```

## Confirm the Install

Once you run any of the CLI install commands above, you should see the following output:

```
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   215  100   215    0     0    486      0 --:--:-- --:--:-- --:--:--   486
```

To confirm the CLI was installed properly, run the following:

```
astrocloud version
```

You should see the following:

<pre><code parentName="pre">{`% astrocloud version
Astro CLI Version: ${siteVariables.cliVersion}`}</code></pre>


## Next Steps

Now that you've installed the Astronomer CLI, you're ready to create an Astronomer project and start developing locally. For instructions, read [Create an Astronomer Project](create-project.md).
