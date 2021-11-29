---
sidebar_label: 'KubernetesPodOperator'
title: 'Run the KubernetesPodOperator on Astronomer Cloud'
id: kubernetespodoperator
---

## Overview

The KubernetesPodOperator can run a task in an individual Kubernetes Pod. When the operator finishes running a task, it automatically terminates the Pod that the task was running in. The KubernetesPodOperator also enables task-level resource configuration, making it optimal for tasks that custom Python dependencies.

This guide provides steps for configuring and running the KubernetesPodOperator on DAGs deployed to Astronomer Cloud.

## Prerequisites

To use the KubernetesPodOperator, you need:

- A private Docker registry that hosts the images you want to use in your Kubernetes Pods.
- kubectl.
- An Astronomer Cloud project.
- A Deployment.

## Step 1: Configure Your Private Docker Registry

To securely share your hosted images on Astronomer Cloud, you need to create a Kubernetes secret for accessing your private Docker registry. To do this, complete one of the following two setups:

### Option 1: Manually Create a Kubernetes Secret

1. Follow the [Kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#create-a-secret-by-providing-credentials-on-the-command-line) to create a Kubernetes secret for accessing your private registry.

2. Run the following command to confirm that the `dockerconfigjson` file was created correctly:

    ```sh
    kubectl get secret regcred --output="jsonpath={.data.\.dockerconfigjson}" | base64 --decode
    ```

    Copy this output.

3. Send the output from Step 2 to Astronomer and specify the Cluster that you are configuring. From here, an Astronomer representative will add your secret to the Cluster.

### Option 2: Let Astronomer Create a Kubernetes Secret

Instead of creating a Kubernetes secret yourself, send Astronomer the following credentials:

- Astronomer Cluster
- Docker username
- Docker password
- Docker email
- Docker server (only if other than Dockerhub)

An Astronomer representative will use this information to directly create a Kubernetes secret and `dockerconfigjson` file in the specified Cluster.
