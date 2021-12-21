---
title: "Installing Astronomer in an airgapped environment"
sidebar_label: "Airgapped Astronomer installation"
description: "Infrastructure considerations and Helm configuration to install Astronomer in an airgapped environment"
id: install-airgapped
---

## Overview

By default, Astronomer will reach out to public repositories to download various components:

- Docker images from `quay.io/astronomer`, `docker.io`, and `gcr.io`
- Astronomer Helm charts from `helm.astronomer.io`
- Astronomer version information from `updates.astronomer.io`

If you cannot rely on public repositories and networks for your installation, you can install Astronomer in an airgapped environment. An airgapped environment is a locked-down environment with no access to or from the public internet.

> **Note:** If you have some means to allow traffic to the public internet, e.g. a proxy that allows a list of accepted destinations/sources, that will make the airgapped installation much easier. This page assumes an environment without any possibility of accessing the public internet.

## Prerequisites

- A VPC.
- Private Kubernetes.
- A Postgres instance accessible from that environment.
- A VPN (or other means) set up to access, at a minimum, Kubernetes and DNS from inside your VPC.

## Step 1: Configure a Private Docker Registry

Astronomer's Docker images are hosted on a public registry which isn't accessible from an airgapped network. Therefore, these images must be hosted on a Docker registry accessible from within your own network. Every major cloud platform provides its own managed Docker registry service that can be used for this step:

- AWS: [ECR](https://aws.amazon.com/ecr/)
- Azure: [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/)
- GCP: [Container Registry](https://cloud.google.com/container-registry)

You can also set up your own registry using a dedicated registry service such as [JFrog Artifactory](https://jfrog.com/artifactory/). Regardless of which service you use, follow the product documentation to configure a private registry according to your organization's security requirements. 

Which images and tags you require for your Astronomer installation depends on enabled components and versions in the Astronomer platform. Image tags are subject to change, even within existing versions, for example to resolve critical security issues, and therefore not listed here. To gather a list of exact images and tags required for your Astronomer Helm chart version and values.yaml, you can template the Helm charts and fetch the rendered image tags:

```bash
$ helm template astronomer/astronomer --version 0.26.5 | grep "image: " | sed 's/^ *//g' | sort | uniq

image: "quay.io/prometheus/node-exporter:v1.2.2"
image: docker.io/bitnami/minideb:stretch
image: docker.io/bitnami/postgresql:11.11.0-debian-10-r30
image: quay.io/astronomer/ap-alertmanager:0.23.0
image: quay.io/astronomer/ap-astro-ui:0.26.8
image: quay.io/astronomer/ap-base:3.14.2-1
image: quay.io/astronomer/ap-cli-install:0.26.0
image: quay.io/astronomer/ap-commander:0.26.5
image: quay.io/astronomer/ap-configmap-reloader:0.5.0-1
image: quay.io/astronomer/ap-curator:5.8.4-5
image: quay.io/astronomer/ap-db-bootstrapper:0.26.1
image: quay.io/astronomer/ap-default-backend:0.25.4
image: quay.io/astronomer/ap-elasticsearch-exporter:1.2.1
image: quay.io/astronomer/ap-elasticsearch:7.10.2-3
image: quay.io/astronomer/ap-fluentd:1.14.0
image: quay.io/astronomer/ap-grafana:7.5.10
image: quay.io/astronomer/ap-houston-api:0.26.17
image: quay.io/astronomer/ap-kibana:7.10.2-2
image: quay.io/astronomer/ap-kube-state:1.7.2
image: quay.io/astronomer/ap-kubed:0.12.0
image: quay.io/astronomer/ap-nats-exporter:0.9.0
image: quay.io/astronomer/ap-nats-server:2.3.2-3
image: quay.io/astronomer/ap-nats-streaming:0.22.0-2
image: quay.io/astronomer/ap-nginx-es:1.21.3
image: quay.io/astronomer/ap-nginx:0.49.3
image: quay.io/astronomer/ap-prometheus:2.21.0
image: quay.io/astronomer/ap-registry:3.14.2-2
```

Regardless of whether you choose to mirror or manually pull/push images to your private registry, the returned images and/or tags must be made accessible within your network.

In your `values.yaml` file, you must refer to the private registry. There are two options for doing this:

- Configure only the private registry URL, leaving images and tags as their default values in the Helm chart.
- Configure each image individually, which allows you to specify a different image/tag if desired.

Use the following topics to learn more about each of these options. 

### Option 1: Configure a private registry

A private registry can be configured in the `global` section of `values.yaml`:

```yaml
global:
  privateRegistry:
    enabled: true
    repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo
    # user: ~
    # password: ~
```

This will set the repository for all Docker images specified in the Astronomer Helm chart. If you didn't change the default names or tags of any images uploaded to your private registry, this means that you don't have to do any further configuration to pull images from the correct location.

### Option 2: Configure images individually

An alternative way is to configure each image (repository) and/or tag individually. Say your organization has a naming convention for image tags, such as prepending all tags with `myteam-`, you can configure each image and/or tag individually. Each image and/or tag must be overridden within its respective subchart in your `values.yaml` file. For example, your `values.yaml` file might look like the following:

> **Note:** Images and tags are subject to change, even within existing versions. For example, to resolve critical security issues. The images and tags shown below only serve as an example. Refer to the Astronomer Helm chart for the latest version.

```yaml
alertmanager:
  images:
    alertmanager:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-alertmanager
      tag: 0.23.0
astronomer:
  images:
    commander:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-commander
      tag: 0.26.4
    registry:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-registry
      tag: 3.14.2-2
    houston:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-houston-api
      tag: 0.27.1
    astroUI:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-astro-ui
      tag: 0.27.1
    dbBootstrapper:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-db-bootstrapper
      tag: 0.26.1
    cliInstall:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-cli-install
      tag: 0.26.0
  # Additionally, you can configure the images used for each Airflow deployment under astronomer.houston.config.deployments.helm
  houston:
    config:
      deployments:
        helm:
          # (1) Here you can also define a default repository
          defaultAirflowRepository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-airflow
          # (2) or individual images
          defaultAirflowTag: 2.0.0-buster
          images:
            airflow:
              repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-airflow
              tag: null
            pgbouncer:
              repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-pgbouncer
              tag: 1.8.1
elasticsearch:
  images:
    es:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-elasticsearch
      tag: 7.10.2-3
    init:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-base
      tag: 3.14.2-1
    curator:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-curator
      tag: 5.8.4-5
    exporter:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-elasticsearch-exporter
      tag: 1.2.1
    nginx:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-nginx-es
      tag: 1.21.3
fluentd:
  images:
    fluentd:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-fluentd
      tag: 1.14.2
grafana:
  images:
    grafana:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-grafana
      tag: 7.5.10
    dbBootstrapper:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-db-bootstrapper
      tag: 0.26.1
keda:
  keda:
    image:
      keda: "012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-keda:1.3.0"
      metricsAdapter: "012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-keda-metrics-adapter:1.3.0"
kibana:
  images:
    kibana:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-kibana
      tag: 7.10.2-2
kube-state:
  images:
    kubeState:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-kube-state
      tag: 1.7.2
kubed:
  images:
    kubed:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-kubed
      tag: 0.12.0
nats:
  images:
    nats:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-nats-server
      tag: 2.3.2-3
nginx:
  images:
    nginx:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-nginx
      tag: 0.49.3
    defaultBackend:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-default-backend
      tag: 0.25.4
postgresql:
  image:
    registry: 012345678910.dkr.ecr.us-east-1.amazonaws.com
    repository: myrepo/myteam-ap-postgresql
    tag: 11.13.0
prometheus:
  images:
    prometheus:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-prometheus
      tag: 2.30.3
prometheus-blackbox-exporter:
  image:
    repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-blackbox-exporter
    tag: 0.19.0-3
prometheus-node-exporter:
  image:
    repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-node-exporter
    tag: v1.2.2
prometheus-postgres-exporter:
  image:
    repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-postgres-exporter
    tag: 0.10.0
stan:
  images:
    init:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-base
      tag: 3.14.2-1
    stan:
      repository: 012345678910.dkr.ecr.us-east-1.amazonaws.com/myrepo/myteam-ap-nats-streaming
      tag: 0.22.0-2
```

## Fetching Helm charts

There are two Helm charts required for Astronomer:

1. The [Astronomer Helm chart](https://github.com/astronomer/astronomer) for the Astronomer Platform
2. The [Airflow Helm chart](https://github.com/astronomer/airflow-chart) for Airflow deployments in Astronomer Platform

The Astronomer Helm chart can be downloaded using `helm pull` and applied locally if desired.

The Airflow chart is used to create Airflow deployments by Commander, the provisioning component of the Astronomer Platform. It installs the Airflow Helm chart when you create a new deployment in the Astronomer UI. You have two options to make the Helm chart available to Commander:

- The Commander Docker image comes with an Airflow Helm chart built-in, only values.yaml configuration required.
- Host the Airflow Helm chart within your network. Not every cloud provider has a managed Helm registry, so you might want to check out [JFrog Artifactory](https://jfrog.com/artifactory) or [ChartMuseum](https://github.com/helm/chartmuseum).

To configure Commander to use the built-in Airflow Helm chart:

```yaml
astronomer:
  commander:
    airGapped:
      enabled: true
```

A self-hosted Helm chart can be configured as follows:

```yaml
global:
  helmRepo: "http://artifactory.company.com:32775/artifactory/astro-helm-chart"
```

Note that enabling `astronomer.commander.airGapped.enabled` takes precedence over `global.helmRepo`.

## Fetching Airflow updates

By default, Astronomer checks for Airflow updates once a day at midnight from <https://updates.astronomer.io/astronomer-certified> (the check runs as a cronjob in Kubernetes). The URL returns a JSON with version details, but it is not accessible in an airgapped environment. There are several options to make the updates JSON accessible:

- You can download the JSON and host it in a location accessible within your airgapped environment, for example:
    - AWS S3 (no example)
    - Git (no example)
    - Nginx (example below)
- You can disable the update checks (not advised)

Note that downloading/uploading the JSON is a manual process. This can of course be automated, but is out of scope for this page.

### Exposing Airflow updates via an Nginx endpoint

To add an Nginx endpoint containing the updates information, you can host the updates JSON in a Kubernetes configmap:

```bash
curl -L https://updates.astronomer.io/astronomer-certified --output astronomer-certified.json
kubectl create configmap astronomer-certified --from-file=astronomer-certified.json=./astronomer-certified.json -n astronomer
```

Next, add an Nginx deployment and service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: astronomer-certified
  namespace: astronomer
spec:
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: astronomer-certified
  template:
    metadata:
      labels:
        app: astronomer-certified
    spec:
      containers:
      - name: astronomer-certified
        image: 012345678910.dkr.ecr.us-east-1.amazonaws.com/nginx:stable
        resources:
          requests:
            memory: "32Mi"
            cpu: "100m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        ports:
        - containerPort: 80
        volumeMounts:
        - name: astronomer-certified
          mountPath: /usr/share/nginx/html
      volumes:
      - name: astronomer-certified
        configMap:
          name: astronomer-certified
---
apiVersion: v1
kind: Service
metadata:
  name: astronomer-certified
  namespace: astronomer
spec:
  type: ClusterIP
  selector:
    app: astronomer-certified
  ports:
  - port: 80
    targetPort: 80
```

Note the Docker image in the deployment, ensure this is also accessible from within your environment. Save this in a file e.g. `nginx-astronomer-certified.yaml` and apply with `kubectl apply -f nginx-astronomer-certified.yaml`.

The updates JSON will be accessible by the service name from pods in the Kubernetes cluster: <http://astronomer-certified.astronomer.svc.cluster.local/astronomer-certified.json>. To validate if the updates JSON is accessible, exec into a pod after the Nginx service was added, and curl the URL. The astro-ui pods are convenient for this because they include `bash` and `curl`:

```bash
kubectl exec -it astronomer-astro-ui-7cfbbb97fd-fv8kl -n=astronomer -- /bin/bash
curl http://astronomer-certified.astronomer.svc.cluster.local/astronomer-certified.json
```

The service is set up correctly if the updates JSON is returned.

### Configuring a custom updates JSON URL

After you have made the updates JSON accessible within your premises, you must configure the Helm chart to fetch updates from the custom URL:  

```yaml
astronomer:
  houston:
    updateCheck: # There is a 2nd check for Astronomer platform updates but this is deprecated and not actively used. Therefore disable
      enabled: false
    updateAirflowCheck: # Configure URL for Airflow updates check
      url: http://astronomer-certified.astronomer.svc.cluster.local
```

## Helm installation

With the Docker images, Airflow Helm chart, and updates JSON made accessible inside your network, you can now install the Astronomer Helm chart:

```bash
curl -L https://github.com/astronomer/astronomer/archive/v0.26.5.tar.gz -o astronomer-0.26.5.tgz
# Alternatively, use helm pull
helm pull astronomer/astronomer --version 0.26.5

# ... If necessary, copy to a place where you can access Kubernetes ...

helm install astronomer -f values.yaml -n astronomer astronomer-0.26.5.tgz
```
