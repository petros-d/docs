---
title: 'Run the KubernetesPodOperator on Astronomer Enterprise'
sidebar_label: 'KubernetesPodOperator'
id: kubepodoperator
description: Run the KubernetesPodOperator on Astronomer Enterprise.
---

## Overview

A widely-used and performant alternative to Airflow's older DockerOperator, the [KubernetesPodOperator](https://github.com/apache/airflow/blob/v1-10-stable/airflow/contrib/operators/kubernetes_pod_operator.py) is able to natively launch a Kubernetes Pod to run an individual task - and terminate that pod when the task is completed. Similarly to the Kubernetes Executor, the operator uses the [Kube Python Client](https://github.com/kubernetes-client/python) to generate a Kubernetes API request that dynamically launches those individual pods.

The KubernetesPodOperator enables task-level resource configuration and is optimal for those who have custom Python dependencies. Ultimately, it allows Airflow to act a job orchestrator - no matter the language those jobs are written in.

At its core, the KubernetesPodOperator is built to run any docker image with Airflow regardless of the language it's written in. It's the next generation of the DockerOperator and is optimized to leverage Kubernetes functionality, allowing users to specify resource requests and pass Kubernetes specific parameters into the task.

If you're using the Kubernetes Executor, you can also configure task-level Kubernetes resources using a pod template. For more information, read [Use a Pod Template in a Task](kubernetes-executor.md#use-a-pod-template-in-a-task).

## Pre-Requisites

To run the KubernetesPodOperator on Astronomer, make sure you:

- Have a running Airflow Deployment on Astronomer Enterprise
- Run Astronomer Airflow 1.10+

> **Note:** If you haven't already, we'd encourage you to first test the KubernetesPodOperator in your local environment. Follow our [Running KubePodOperator Locally](kubepodoperator-local.md) for guidelines.

## The KubernetesPodOperator on Astronomer

### Import the Operator

You can import the KubernetesPodOperator as you would any other plugin in its [GitHub Contrib Folder](https://github.com/apache/airflow/blob/v1-10-stable/airflow/contrib/operators/kubernetes_pod_operator.py).

```python
from airflow.contrib.operators.kubernetes_pod_operator import kubernetes_pod_operator
```

### Specify Parameters

From here, instantiate the operator based on your image and setup:

```python
from airflow.contrib.operators.kubernetes_pod_operator import KubernetesPodOperator
from airflow import configuration as conf
...

namespace = conf.get('kubernetes', 'NAMESPACE')
k = kubernetes_pod_operator.KubernetesPodOperator(
    namespace=namespace,
    image="ubuntu:16.04",
    cmds=["bash", "-cx"],
    arguments=["echo", "10", "echo pwd"],
    labels={"foo": "bar"},
    name="airflow-test-pod",
    is_delete_operator_pod=True,
    in_cluster=True,
    task_id="task-two",
    get_logs=True)
```

To successfully instantiate the operator, you'll need to make note of a few parameters.

1. `namespace`
   - On Astronomer, each Airflow deployment sits on top of a corresponding [Kubernetes Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
    - If you're running the KubernetesPodOperator, it needs to know *which* namespace to run in and where to look for the config file
    - On Astronomer Enterprise, this would be a combination of your platform namespace and your deployment's release name in the following format: `base-namespace-deployment-release-name` (e.g. `astronomer-frigid-vacuum-0996`)
    - The namespace variable is injected into your deployment's [airflow.cfg](https://airflow.apache.org/howto/set-config.html), which means you can programmatically import the namespace as an Environment Variable (shown above)
2. `in_cluster`
    - Set the `in_cluster` parameter to `True` in your code
    - This will tell your task to look inside the cluster for the Kubernetes config. In this setup, your workers are tied to a role with the right privileges in the cluster
3. `is_delete_operator_pod`
    - Set the `is_delete_operator_pod` parameter to `True` in your code
    - This will delete completed pods in the namespace as they finish, keeping Airflow below its resource quotas

#### Add Resources to your Deployment on Astronomer

The KubernetesPodOperator is entirely powered by the resources allocated to the `Extra Capacity` slider of your deployment's `Configure` page in the [Astronomer UI](manage-workspaces.md) in lieu of needing a Celery Worker (or Scheduler resources for those running the Local Executor). Raising the slider will increase your namespace's [resource quota](https://kubernetes.io/docs/concepts/policy/resource-quotas/) such that Airflow has permissions to successfully launch pods within your deployment's namespace.

> **Note:** Your Airflow Scheduler and Webserver will remain necessary fixed resources that ensure the rest of your tasks can execute and that your deployment stays up and running.

In terms of resource allocation, we recommend starting with **10AU** in `Extra Capacity` and scaling up from there as needed. If it's set to 0, you'll get a permissions error:

```
ERROR - Exception when attempting to create Namespace Pod.
Reason: Forbidden
"Failure","message":"pods is forbidden: User \"system:serviceaccount:astronomer-cloud-solar-orbit-4143:solar-orbit-4143-worker-serviceaccount\" cannot create pods in the namespace \"datarouter\"","reason":"Forbidden","details":{"kind":"pods"},"code":403}
```

On Astronomer Enterprise, the largest node a single pod can occupy is dependent on the size of your underlying node pool.

> **Note:** If you need to increase your [limit range](https://kubernetes.io/docs/concepts/policy/limit-range/) on Astronomer Enterprise, contact your system admin. \\

#### Define Resources per Task

A notable advantage of leveraging Airflow's KubernetesPodOperator is that you can specify compute [resources](https://github.com/apache/airflow/blob/master/airflow/contrib/operators/kubernetes_pod_operator.py#L85) in the task definition.

```
    :param resources: A dict containing resources requests and limits.
        Possible keys are request_memory, request_cpu, limit_memory, limit_cpu,
        and limit_gpu, which will be used to generate airflow.kubernetes.pod.Resources.
        See also kubernetes.io/docs/concepts/configuration/manage-compute-resources-container
    :type resources: dict
```

> **Note:** If you're using the KubernetesExecutor, note that this value is separate from the `executor_config` parameter. In this case, the `executor_config` would only define the Airflow worker that is launching your k8s task.

### Example Task Definition:

```python
from airflow import DAG
from datetime import datetime, timedelta
from airflow.contrib.operators.kubernetes_pod_operator import KubernetesPodOperator
from airflow import configuration as conf

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2019, 1, 1),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

namespace = conf.get('kubernetes', 'NAMESPACE')

# This will detect the default namespace locally and read the
# environment namespace when deployed to Astronomer.
if namespace =='default':
    config_file = '/usr/local/airflow/include/.kube/config'
    in_cluster=False
else:
    in_cluster=True
    config_file=None

dag = DAG('example_kubernetes_pod',
          schedule_interval='@once',
          default_args=default_args)

# This is where we define our desired resources.
compute_resources = \
  {'request_cpu': '800m',
  'request_memory': '3Gi',
  'limit_cpu': '800m',
  'limit_memory': '3Gi'}

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

In the example above, we define resources by building the following dict:

```python
compute_resources = \
  {'request_cpu': '800m',
  'request_memory': '3Gi',
  'limit_cpu': '800m',
  'limit_memory': '3Gi'}
```

Using this dict, users can set Memory and CPU requests and limits for any given pod. For more information, reference [Kubernetes Documentation on Requests and Limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits).

Once you've created the object, simply apply it to the `resources` parameter of the task. When this DAG runs, it will launch a pod that runs the `hello-world` image, pulled from DockerHub, in your Airflow Deployment's namespace with the resource request specified above. Once it finishes running, it will delete the pod.

> **Note:** On Astronomer, the equivalent of 1AU is: `"request_cpu": "100m", "request_memory": "384Mi", "limit_cpu": "100m", "limit_memory": "384Mi"}`

## Pulling Images from a Private Registry

By default, the KubernetesPodOperator will look for images hosted publicly on [Dockerhub](https://hub.docker.com/). If you want to pull images from a private registry, you may do so.

> **Note:** The KubernetesPodOperator doesn't support passing in `image_pull_secrets` until [Airflow 1.10.2](https://github.com/apache/airflow/blob/master/CHANGELOG.txt#L526).

To pull images from a private registry on Astronomer Enterprise, follow the guidelines below.

**1.** Pull a `dockerconfigjson` file with your existing Docker credentials by following [this guide](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials) (step 1 above)

**2.** Follow [this Kubernetes doc](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials) to add that secret to your namespace

**3.** Call that secret in your KubePodOperator by specifying `image_pull_secrets`

## Local Testing

Follow our [CLI doc](kubepodoperator-local.md/) on using [Microk8s](https://microk8s.io/) or [Docker for Kubernetes](https://matthewpalmer.net/kubernetes-app-developer/articles/how-to-run-local-kubernetes-docker-for-mac.html) to run tasks with the KubernetesPodOperator locally.

> **Note:** To pull images from a private registry locally, you'll have to create a secret in your local namespace and similarly call it in your operator following the guidelines above.
