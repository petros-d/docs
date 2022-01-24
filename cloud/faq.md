---
sidebar_label: 'FAQs'
title: 'Astronomer Cloud FAQs'
id: faq
description: Set environment variables on Astronomer to specify Airflow configurations and custom logic.
---

## General

### Why should I use Astronomer Cloud?

Astronomer Cloud is a managed software service that makes it easy to run and grow with Apache Airflow. We build tools that make data pipelines easier to write, run, and observe.

If your team is already running Airflow, you might choose Astronomer Cloud to offload the infrastructure management required to scale an Airflow environment. You'll find that data engineers fall in love with the Astronomer CLI to run and test DAGs locally. As you scale, you'll make the most of everything else our offering provides, including one-click Deployments, worker autoscaling, a strong security layer, easy integration with CI/CD systems, and a growing suite of metrics and data lineage tooling.

If you're new to Airflow, you might choose Astronomer Cloud to establish data orchestration at the center of your data ecosystem and accelerate adoption. Instead of investing time in building out Airflow infrastructure, our team can help you migrate from other orchestration tools in the market and integrate Airflow with the rest of your tooling. We'll give your team the tools they need to learn Airflow so they can focus less on troubleshooting development environments and more on writing data pipelines.

Not sure if Astronomer Cloud is the right fit? [Reach out to us](https://support.astronomer.io).

### How much does Astronomer Cloud cost?

Astronomer Cloud is priced annually based on the total number of successful task runs executed across your organization. This pricing model incentivizes our team to build the best data orchestration experience in the market and ensures that your team only pays for the value you receive.

To avoid incentivizing customers to change the structure of their tasks:

- We ask that you select a range of total task volume upfront based on expected workload.
- We round down and never charge per individual task.
- As you grow with Astronomer, higher task volume ranges unlock significant discounts and savings.
- Failed tasks do not count towards total task volume.

We're committed to fit the needs of your organization. To discuss further, [reach out to us](https://support.astronomer.io).

## Astronomer Runtime & Airflow

### What is Astronomer Runtime?

Astronomer Runtime is a Docker image built and published by Astronomer that extends the Apache Airflow project to provide a differentiated data orchestration experience. This includes:

- A baked-in suite of Deferrable Operators that are published and tested by our team.
- A custom security manager that ensures consistency and compliance with Astronomer roles and user permissions.
- A new Executor built by Astronomer to redefine Airflow's execution framework. Coming soon.
- Bug fixes that are released in advance of the open source project.
- A robust testing suite with additional checks for performance, backwards compatibility, and regressions.

### What versions of Apache Airflow does Astronomer Support?

Astronomer Runtime is built with the latest versions of Apache Airflow. New major, minor, and patch versions of Apache Airflow are supported via timely releases of Astronomer Runtime.

For a reference of all Airflow versions Astronomer Cloud supports, see [Astronomer Runtime Versioning & Lifecycle Policy](runtime-version-lifecycle-policy.md).

### Do I have to be on Airflow 2.0 to use Astronomer?

Yes. Airflow 2 was released in December of 2020 and boasts significant performance and usability improvements for the open source community. To ensure the most reliable data orchestration experience for our customers, all Deployments on Astronomer Cloud require Airflow 2.0+.

If your team is not running on Airflow 2 yet, we're commited to help you get there. Read [Upgrade to Airflow 2.0](https://astronomer.io/guides/migrate-to-2-0) for guidelines or [reach out to us](https://support.astronomer.io).

### How can I keep up with the latest versions of Astronomer Runtime?

The best place to keep track of our latest versions of Astronomer Runtime, refer to [Astronomer Runtime release notes](runtime-release-notes.md). There is currently no way to subscribe to updates. We're working on it.

### Does Astronomer support the Kubernetes Executor?

All Deployments on Astronomer Cloud run with the Celery Executor and do not support the Local or Kubernetes Executors. This was necessary to fulfull our promise of simplicity, autoscaling, and infrastructure that's optimized.

In early 2022, our team will be launching a proprietary Airflow

## Astronomer Clusters & Infrastructure

### Can I run Astronomer Cloud on Google or Azure?

The ability to run Astronomer Cloud on Google (GKE) or Azure (AKS) is coming soon.

## Can I export metrics do Datadog? O