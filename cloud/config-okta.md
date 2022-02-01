---
sidebar_label: 'Integrate Federated Authentication'
title: 'Integrate Federated Authentication'
id: config-okta
description: Configure federated authentication from a variety of third party identity providers on Astornomer Cloud.
---

## Overview

This guide provides setup steps for integrating various third party identity providers (IDP) with Astronomer Cloud.

After integrating your identity provider with Astronomer Cloud, a user in your organization will be automatically logged in to Astronomer Cloud if they're already logged in via your IDP. You can also add existing IDP accounts as new Astronomer users through your IDP application.

## Okta

This section provides setup steps for setting up Okta as your IDP on Astronomer Cloud.

## Prerequisites

To use Okta as an IDP for Astronomer Cloud, you must have:

- An [Okta account](https://www.okta.com/)

## Step 1: Work With Astronomer to Configure SAML

Reach out to [Astronomer Support](support.astronomer.io) with a request to integrate Okta as an IDP on Astronomer. From here, an Astronomer Representative will provide you with a connection name to use when configuring Okta in the next step.

## Step 2: Configure Okta

Follow the [Okta documentation](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm) create an SAML App Integration with the following SAML settings:

- Single sign on URL
- Audience URI (SP Entity ID)
- Name ID format
- Application username  
- Update application username on


Click the **Click Show Advanced Settings** link in the Okta configuration page and ensure that the following values are set:


- Response | Signed |
- Assertion Signature | Signed |
- Signature Algorithm | RSA-SHA256 |
- Digest Algorithm | SHA256 |
- Assertion Encryption | Unencrypted |

    c. Leave the remaining **Advanced Settings** fields in their default state.

    d. Scroll down to the **Attribute Statements (optional)** section and create four attributes with the following values:

    | Name | Name Format | Value |
    | --- | --- | --- |
    | email | Unspecified | user.email |
    | firstName | Unspecified | user.firstName |
    | lastName | Unspecified | user.lastName |
    | name | Unspecified | user.displayName |

:::warning

The values in the **Name** column are case-sensitive. Enter them exactly as shown.

:::

:::info

These values may be different if Okta is connected to an Active Directory. For the appropriate values, use the Active Directory fields that contain a user's first name, last name, and full email address.

:::

   e. Click the **Next** button in the Okta configuration.

   f. Select the radio button marked **I'm an Okta customer adding an internal app**.

   g. Click the **Finish** button.

4. **Provide Astronomer your Okta SAML information**

   a. On the Okta application page, click **View Setup Instructions** in the middle of the page.

   b. Provide the value of `Single Sign-on URL` and the `X.509 Certificate` file to Astronomer

5. **Assign users to your Okta application**

   a. On the Okta application page, click the **Assignments** tab.

   b. Ensure that all your Atlas organization users who will use the Okta service are enrolled.
