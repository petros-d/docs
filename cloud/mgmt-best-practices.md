---
sidebar_label: 'Management Best Practices'
title: 'Best Practices for Managing Astronomer Cloud'
id: mgmt-best-practices
description: Learn about the most recommended ways to organize your users and code on Astronomer Cloud.
---

## Overview

Astronomer Cloud provides a number of mechanisms for controlling for where and how you deploy your code to your Cloud. If you're just starting to use Astronomer Cloud, we have a few recommendations for how to get started with organizing your pipelines.

This guide contains a collection of best practices and steps for how to implement them.

## Separate Clusters for Development and Production Pipelines

We recommend running with Astronomer with at least two Clusters: One for production code and one for development code. For more information about creating Clusters, read [create Clusters](create-clusters.md)

It's important to separate these environments by Cluster because of the impact that development code can have on your production resources. Occasionally, your development code might have a bug that results in unusually high resource usage. If this code is in a separate Cluster from your production code, then there's no risk of your production code not having enough resources to run.

Once you create separate Cluster for production and development code, you can also create separate Workspaces to clearly separate types of Deployments in the Astronomer UI.

## Deploy Pipelines with CI/CD

There are many benefits to deploying DAGs and other changes to Airflow via a CI/CD workflow. Specifically, you can:

- Deploy new and updated DAGs in a way that streamlines the development process amongst team members.
- Decrease the maintenance cost of integrating changes, allowing your team to quickly respond in case of an error or failure.
- Enforce continuous, automating testing, which increases code quality and protects your DAGs in production.

For more information about configuring CI/CD, read [CI/CD](ci-cd.md).

## Integrate a Secrets Backend
