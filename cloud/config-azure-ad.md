---
sidebar_label: 'Configure Federated Authentication from Azure AD'
title: 'Configure Federated Authentication from Azure AD'
id: config-azure-ad
description: Learn how to configure federated authentication from Azure AD for Astronomer Cloud
---

## Overview

This guide shows you how to configure federated authentication using Azure AD as your IdP.

After integrating Azure AD and Astronomer Cloud, you can use your company's credentials to log in to Astronomer Cloud.

# Prerequisites

To use Azure AD as an IdP for Astronomer Cloud, you must have:

- An Azure subscription. To obtain a subscription, visit the [Microsoft Azure portal](https://azure.microsoft.com/en-us/free/).
- An Azure AD tenant associated with your subscription. For information about setting up an Azure AD tenant, see the [Azure AD Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant).
- `Global Administrator` privileges in your Azure AD tenant.

## Procedure

Throughout the following procedure, you will be interacting with an Astronomer engineer and your Azure account.

## Configure Azure AD as an Identity Provider

1. **Register your app with Azure AD**

    a. To register your app with Azure AD, see Microsoft's **[Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)**.
    
    b. Configure the **Name, Supported account types,** and **Redirect URI**
        
      1. For **Redirect URI**, select **Web** and enter https://auth.astronomer.io/login/callback
    
    c. Click the **Register** button.
    
2. **Create a Client secret**
    
    a. To create a **Client secret**, see Microsoft's **[Quickstart: Configure a client application to access web APIs - Add Credentials to your web application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-credentials)**.
    
    b. Once generated, **make note of this Value**.
    
:::warning

If you configure an expiring secret, make sure to record the expiration date; you will need to renew the key before that day to avoid a service interruption.

:::

3. **Configure API permissions**
    
    a. To add permissions, see Microsoft's **[Quickstart: Configure a client application to access web APIs - Add permissions to access web APIs](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-permissions-to-access-web-apis)**.
    
    b. Add the below **Microsoft Graph** > **Delegated** permissions
        
      1. OpenId.email
      
      2. OpenId.openid
      
      3. OpenId.profile

:::warning

Ensure the default **User.Read** permission is configured. If not, you will need to add it.

:::

4. **Grant admin consent**

:::info

May be required if your Azure Active Directory is configured to require admin approval on API permissions. Without admin consent, users will not be able to log in.

:::
    
   a. Within the **API permissions** tab, click on the ‘Enterprise applications’ link
    
   b. Click the ‘Grant admin consent’ button _(AD Admin permissions required)_
   
5. **Provide Astronomer your Azure AD app information**
    
    a. From the Overview page of your application, provide the value of `Application (client) ID`
    
    b. Provide the `Value` of the Client secret you created in step 2
    
    c. Provide your **Microsoft Azure AD Domain**. You can find this on your Azure AD directory's overview page in the Microsoft Azure portal.
