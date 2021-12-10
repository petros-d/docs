---
sidebar_label: 'KubernetesPodOperator'
title: "Run Airflow's KubernetesPodOperator on Astronomer Cloud"
id: kubernetespodoperator
---

## Overview

One of Airflow's most dynamic operators is the [KubernetesPodOperator](https://airflow.apache.org/docs/apache-airflow-providers-cncf-kubernetes/stable/operators.html), which can run a task in an individual Kubernetes pod. Similar to the Kubernetes Executor, this operator talks to the Kubernetes API to dynamically launch a pod for each task that needs to run and terminates each pod once the task is completed. This results in an isolated, containerized execution environment for each task that is separate from tasks otherwise being executed by Celery workers. Using the KubernetesPodOperator enables the following benefits:

- Task-level resource configuration: If you know how much CPU and Memory your task consumes, you can specify it
- Execute custom Docker images on at the task level, potentially with Python packages and dependencies that would otherwise conflict with the rest of your Deployment's dependencies
- Flexibility to write task logic in a language other than Python
- Horizontal scaling that is cost-effective, dynamic, and minimally dependent on Worker resources
- Kubernetes-native configuration, including the ability to set volumes, secrets, and affinities in the form of a YAML file
- Coupled with Astronomer Cloud's Kubernetes-based Data Plane, run Kubernetes pods without needing to manage any underlying infrastructure

This guide provides steps for configuring and running the KubernetesPodOperator on DAGs deployed to Astronomer Cloud.

## Prerequisites

To use the KubernetesPodOperator, you need:

- An [Astronomer project](create-project).
- An Astronomer [Deployment](configure-deployment).
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl).

## Set Up the KubernetesPodOperator

To use the KubernetesPodOperator in a DAG, first add the following import statements to your DAG file:

```python
from airflow.contrib.operators.kubernetes_pod_operator import kubernetes_pod_operator

# Pulls environment information from Astronomer Cloud
from airflow import configuration as conf
```

Then, instantiate the KubernetesPodOperator:

```python
from airflow.contrib.operators.kubernetes_pod_operator import kubernetes_pod_operator

# Pulls environment information from Astronomer Cloud
from airflow import configuration as conf
...

namespace = conf.get('kubernetes', 'NAMESPACE')
k = kubernetes_pod_operator.KubernetesPodOperator(
    namespace=namespace,
    image="<your-docker-image>",
    cmds=["bash", "-cx"],
    arguments=["echo", "10", "echo pwd"],
    labels={"<pod-Label>": "<label-name>"},
    name="<pod-name>",
    is_delete_operator_pod=True,
    in_cluster=True,
    task_id="<task-name>",
    get_logs=True)
```

For each instantiation of the KubernetesPodOperator, you must specify the following values:

- `namespace = conf.get('kubernetes', 'NAMESPACE')`: Astronomer Cloud Deployments run on their own Kubernetes namespaces within a Cluster. The KubernetesPodOperator needs to know information about this namespace. Because the namespace variable is injected into your Deployment's `airflow.cfg` file, you can programmatically import this namespace information via environment variables using this setting.
- `image`: This is the image that the operator will use to run its defined task, commands, and arguments. By default, this value should be a publicly available image tag on Dockerhub. To pull an image from a private registry, read [Pull Images from a Private Registry](kubernetespodoperator#pull-images-from-a-private-registry).
- `in_cluster=True`: When this value is set, your task will look inside your Cluster for a Kubernetes configuration. This ensures that the workers running in the Pod have the correct privileges within the Cluster.
- `is_delete_operator_pod=True`: This setting ensures that the Pods of completed tasks are deleted, which lowers resource usage on your Cluster.

Once you push this code to a Deployment, your Cluster will automatically spin up and down Pods to run tasks that use the operator.

## Configure Task-Level Pod Resources

Astronomer Cloud automatically allocates resources to Pods created by the KubernetesPodOperator. Resources used by the KubernetesPodOperator are not limited, meaning that the operator could theoretically provision all your Cluster's available remaining CPU and memory to complete a task. Because of this, we recommend managing the KubernetesPodOperator's resource usage by specifying [compute resource requests and limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) on a per-task basis.

To do so, define a dictionary of compute resources in your DAG. For example, applying the following dictionary to a pod would ensure that the Pod runs with exactly 800m of CPU and 3Gi of memory at all times:

```python
compute_resources = \
  {'request_cpu': '800m',
  'request_memory': '3Gi',
  'limit_cpu': '800m',
  'limit_memory': '3Gi'}
```

To use a dictionary, specify the `resources` variable in your instantiation of the KubernetesPodOperator:

```python {11}
with dag:
    k = KubernetesPodOperator(
        namespace=namespace,
        image="hello-world",
        labels={"foo": "bar"},
        name="airflow-test-pod",
        task_id="task-one",
        in_cluster=in_cluster, # if set to true, will look in the cluster, if false, looks for file
        cluster_context='docker-for-desktop', # is ignored when in_cluster is set to True
        config_file=config_file,
        resources=compute_resources,
        is_delete_operator_pod=True,
        get_logs=True)
```

## Pull Images from a Private Registry

By default, the KubernetesPodOperator expects to pull an image that's hosted publicly on Dockerhub. If you want to pull images from a private registry, complete the setup in this topic.

### Prerequisites

To complete this setup, you need:

- A private registry that hosts your images.
- kubectl.
- An Astronomer Cloud project.
- A Deployment hosting your project.

### Step 1: Create a Kubernetes Secret

To securely share your hosted images on Astronomer Cloud, you need to create a Kubernetes secret for accessing your private Docker registry. To do this, complete one of the following two setups:

#### Option 1: Manually Create a Kubernetes Secret

1. Follow the [Kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#create-a-secret-by-providing-credentials-on-the-command-line) to create a Kubernetes secret for accessing your private registry.

2. Run the following command to confirm that the `dockerconfigjson` file was created correctly:

    ```sh
    kubectl get secret regcred --output="jsonpath={.data.\.dockerconfigjson}" | base64 --decode
    ```

    Copy this output.

3. Send the output from Step 2 and the name of the Cluster that you are configuring to your Astronomer representative. From here, your Astronomer representative will add your secret to the Cluster.

#### Option 2: Let Astronomer Create a Kubernetes Secret

Instead of creating a Kubernetes secret yourself, you can send Astronomer the following credentials:

- Astronomer Cluster
- Docker username
- Docker password
- Docker email
- Docker server (only if other than Dockerhub)

An Astronomer representative will use this information to directly create a Kubernetes secret and `dockerconfigjson` file in the specified Cluster.

### Step 2: Run the KubernetesPodOperator

Once Astronomer has added the Kubernetes secret to your Cluster, you will be notified and provided with the name of the secret. Typically, this secret is named `<deployment-release-name>-private-registry`.

From here, you can use the KubernetesPodOperator with your private images by specifying `image_pull_secrets` in your operator instantiation:

```python {4}
k = kubernetes_pod_operator.KubernetesPodOperator(
    namespace=namespace,
    image="ubuntu:16.04",
    image_pull_secrets=[k8s.V1LocalObjectReference('<deployment-release-name>-private-registry')],
    cmds=["bash", "-cx"],
    arguments=["echo", "10", "echo pwd"],
    labels={"foo": "bar"},
    name="airflow-test-pod",
    is_delete_operator_pod=True,
    in_cluster=True,
    task_id="task-two",
    get_logs=True)
```
