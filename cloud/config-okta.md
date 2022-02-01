---
sidebar_label: 'Configure Federated Authentication from Okta'
title: 'Configure Federated Authentication from Okta'
id: config-okta
description: Learn how to configure federated authentication from Okta for Astronomer Cloud
---

## Overview

This guide shows you how to configure federated authentication using Okta as your IdP.

After integrating Okta and Astronomer Cloud, you can use your company's credentials to log in to Astronomer Cloud.

# Prerequisites

To use Okta as an IdP for Astronomer Cloud, you must have:

- An [Okta account](https://www.okta.com/)

## Procedure

Throughout the following procedure, you will be interacting with an Astronomer engineer and your Okta account.

## Step 1: Configure Okta as an Identity Provider

1. ****Add a new application to your Okta account****
    
    a. In the Okta top navigation, click the **Applications** tab.
   
    b. Click the **Add Application** button.
    
    c. Click the **Create New App** button.
    
    d. Select **Web** for the **Platform** field.
    
    e. Select **SAML 2.0** for the **Sign on method** field.
    
    f. Click the **Create** button.
    
2. **Create Okta SAML integration**
    
    a. Fill in the **App name** text field with your desired application name.
    
    b. Optionally, add a logo image and set app visibility.
    
    c. Click the **Next** button.
    
3. **Configure SAML Settings**
    
    a. Enter the values as provided by Astronomer
    
    | Okta Field | Value |
    | --- | --- |
    | Single sign on URL | https://auth.astronomer.io/login/callback?connection=YOUR_CONNECTION_NAME |
    | Audience URI (SP Entity ID) | urn:auth0:astronomer-prod:YOUR_CONNECTION_NAME |
    | Name ID format | Unspecified |
    | Application username | Email |
    | Update application username on | Create and update |
    
    b. Click the **Click Show Advanced Settings** link in the Okta configuration page and ensure that the following values are set:
    
    | Okta Field | Value |
    | --- | --- |
    | Response | Signed |
    | Assertion Signature | Signed |
    | Signature Algorithm | RSA-SHA256 |
    | Digest Algorithm | SHA256 |
    | Assertion Encryption | Unencrypted |
    
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
