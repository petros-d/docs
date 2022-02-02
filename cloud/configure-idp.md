---
sidebar_label: "Set Up an Identity Provider for Astronomer Cloud"
title: "Set Up an Identity Provider"
id: configure-idp
description: Configure federated authentication from a variety of third party identity providers on Astronomer Cloud.
---

## Overview

This guide provides setup steps for integrating various third party identity providers (IDP) with Astronomer Cloud.

After integrating your identity provider with Astronomer Cloud, a user in your organization will be automatically logged in to Astronomer Cloud if they're already logged in via your IDP. You can also add existing IDP accounts as new Astronomer users through your IDP application.

## Okta

This section provides setup steps for setting up Okta as your IDP on Astronomer Cloud. After completing this setup, your organization's users can use Okta to log in to Astronomer.

### Prerequisites

To integrate Okta as your IDP for Astronomer Cloud, you must have an [Okta account](https://www.okta.com/)

### Step 1: Work With Astronomer to Configure SAML

Reach out to [Astronomer Support](support.astronomer.io) with a request to integrate Okta as an IDP on Astronomer. From here, an Astronomer Representative will provide you with a connection name. Save this connection name for use in Step 2.

### Step 2: Configure Okta

Follow the [Okta documentation](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm) to create an SAML App Integration with the following SAML settings:

- **Single sign on URL**: `https://auth.astronomer.io/login/callback?connection=<your-connection-name>`
- **Audience URI (SP Entity ID)**: `urn:auth0:astronomer-prod:<your-connection-name>`
- **Name ID format**: `Unspecified`
- **Application username**: `Email`
- **Update application username on**: `Create and update`

In the **Advanced Settings** section of your configuration, set the following values:

- **Response**: `Signed`
- **Assertion Signature**: `Signed`
- **Signature Algorithm**: `RSA-SHA256`
- **Digest Algorithm**: `SHA256`
- **Assertion Encryption**: `Unencrypted`

In the **Attribute Statements** section of your configuration, create the following four attribute statements, making sure to use the exact capitalization as shown:

| Name      | Name Format | Value            |
| --------- | ----------- | ---------------- |
| email     | Unspecified | user.email       |
| firstName | Unspecified | user.firstName   |
| lastName  | Unspecified | user.lastName    |
| name      | Unspecified | user.displayName |

:::info

These values might be different if Okta is connected to an Active Directory. In this case, replace each `Value` with the equivalent Active Directory values for a user's first name, last name, and full email address.

:::

Complete the remainder of the setup as documented in Okta until you finish creating your integration.

### Step 3: Provide Astronomer with Your Integration Information

On the page for your Okta app integration, click **View Setup Instructions**. Copy the values for `Single Sign-on URL` and `X.509 Certificate` that appear and send these to Astronomer Support. From here, Astronomer will finalize the integration with Okta.

### Step 4: Assign users to your Okta application

On the page for your Okta app integration, open the **Assignments** tab. Ensure that all users who will use Astronomer are assigned to the integration. For more information, read [Okta Documentation](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-assign-apps.htm).

## Azure

This section provides setup steps for setting up Okta as your IDP on Astronomer Cloud. After completing this setup, your organization's users can use Okta to log in to Astronomer.

### Prerequisites

To integrate Azure as your IDP for Astronomer you must have:

- An Azure subscription.
- An [Azure AD tenant](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant) with `Global Administrator` privileges.

### Step 1: Register Your App for Astronomer

Follow [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) to register a new app. When configuring the application, set the **Name** and **Supported account types** according to your organization's needs. For the **Redirect URI**, select **Web** and specify `https://auth.astronomer.io/login/callback`.

### Step 2: Create a Client Secret

Follow [Microsoft' documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials) to create a client secret for your new application. Make note of the secret value for Step 4.

:::caution

If you configure an expiring secret, make sure to record the expiration date and renew the key before this date to avoid interruptions to your service.

:::

### Step 3: Configure API Permissions

Follow [Microsoft's documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-permissions-to-access-web-apis) to add the following **Delegated** permissions to **Microsoft Graph**:

- `OpenId.email`
- `OpenId.openid`
- `OpenId.profile`
- `User.Read`

:::info

If your Azure Active Directory is configured to require admin approval on API permissions, you need additionally click the **Grant admin consent** button at the top of your permissions list.

:::

### Step 4: Provide Astronomer With Your Azure AD App Information

Reach out to Astronomer support and provide the following information from your Azure AD app:

- **Microsoft Azure AD Domain**: Retrieve this from your Azure AD directory's overview page in the Microsoft Azure portal
- **Application (client) ID**: Retrieve this from the **Overview page** of your application
- The value of your client secret from Step 2

From here, Astronomer will complete the integration and add Azure as your organization's IDP.
