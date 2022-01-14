---
sidebar_label: 'astrocloud auth login'
title: 'astrocloud auth login'
id: astrocloud-auth-login
description: Reference documentation for astrocloud auth login.
---

## Description

Authenticate to Astronomer Cloud by specifying your organization's URL for accessing Astronomer. After you run this command, the CLI redirects you to a web browser where you can log in to Astronomer. Once you are logged in via the web browser, the CLI automatically recognizes this and authenticates to your account.

## Usage

```sh
astrocloud auth login <basedomain> <flags>
```

## Examples

```sh
astrocloud auth login mycompany.astronomer.io
```

## Related Commands

- [`astrocloud auth logout`](cli-reference/astrocloud-auth-logout.md)
- [`astrocloud deploy`](cli-reference/astrocloud-deploy.md)
