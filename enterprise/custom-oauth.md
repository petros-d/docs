---
sidebar_label: 'Customize OAuth Flow'
title: 'Configure a Custom OAuth Flow for Astronomer Enterprise'
id: custom-oauth
description: Configure a custom OAuth flow as an alternative to Astronomer Enterprise's implicit flow.
---

## Overview

Starting with Astronomer v0.27, you can set up a custom OAuth authorization flow as an alternative to Astronomer's default [implicit flow](https://datatracker.ietf.org/doc/html/rfc6749#section-4.2). You can customize Astronomer's existing Okta, Google, and GitHub OAuth flows or import an entirely custom OAuth flow.

- **Note:** This setup must be completed only during a scheduled maintenance window. There should be no active users on your installation until the setup has been finalized.

## Step 1: Configure Your Authorization Flow on Astronomer

To use a custom Oauth authorization flow:

1. In your `config.yaml` file, set the `astronomer.auth.openidConnect.flow` value to `"code"`. This value must be set for any custom OAuth flow.

    ```yaml
    # Auth configuration.
    auth:
      # Local database (user/pass) configuration.
      local:
        enabled: true

      openidConnect:
        # flow option is needed until we EOL impicit (valid values "code" and "impicit")
        flow: "code"
    ```

2. Configure the section of your `config.yaml` file specific to your identity provider with each of the following values:

    - `enabled`: Set this value to `true` under the section for your own identity provider.
    - `clientId` and `clientSecret`: Your [Client ID and Client secret](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/)
    - `discoveryURL`: Your base [Discovery URL](https://www.oauth.com/oauth2-servers/indieauth/discovery/)
    - `authUrlParams`: Additional [parameters](https://developer.okta.com/docs/guides/add-an-external-idp/saml2/main/#use-the-authorize-url-to-simulate-the-authorization-flow) to append to your discovery URL. At a minimum, you must configure the `audience`. Refer to your identity provider's documentation for information on how to find this value (Auth0 maintains this information in their [glossary](https://auth0.com/docs/glossary), for example).

    For example, a custom configuration of Okta might look like the following.

    ```yaml
    okta:
          enabled: true
          clientId: ffhsdf78f734h2fsd
          clientSecret: FSDFSLDFJELLGJLSDFGJL42353425
          discoveryUrl: "https://<MYIDP>.okta.com/.well-known/openid-configuration"
          authUrlParams:
            audience: "GYHWEYHTHR443fFEW"
    ```

    3. Push your configuration changes to your platform as described in [Apply a Config Change](https://www.astronomer.io/docs/enterprise/v0.25/manage-astronomer/apply-platform-config).

:::info

You can also pass your auth configurations as environment variables in the Houston section of your `config.yaml` file. If you choose to configure your installation this way, set the following variables in the `astronomer.houston.env` list instead of updating your `config.yaml` file:

```yaml
# Replace <idp-provider> with OKTA, AUTH0, or CUSTOM
AUTH__OPENID_CONNECT__<idp-provider>__ENABLED="true"
AUTH__OPENID_CONNECT__<idp-provider>__CLIENT_ID="<client-id>"
AUTH__OPENID_CONNECT__<idp-provider>__CLIENT_SECRET="<client-secret>"
AUTH__OPENID_CONNECT__<idp-provider>__DISCOVERY_URL="<discovery-url>
AUTH__OPENID_CONNECT__<idp-provider>__AUTH_URL_PARAMS__AUDIENCE="<audience>"
AUTH__OPENID_CONNECT__FLOW="implicit" # or "code"
AUTH__OPENID_CONNECT__<idp-provider>__BASE_DOMAIN="<base-domain>"
AUTH__OPENID_CONNECT__CUSTOM__DISPLAY_NAME="Custom Oauth" # Only used for custom flows
```
:::

## Step 2: Configure your Identity Provider

To finalize your configuration, configure the following key values in your identity provider's settings:

- **Grant Code:** Set to "Code" or "Auth Code" depending on your identity provider.
- **Sign-in Redirect URI:** Set to `[https://houston.<BASE_DOMAIN>:8871/v1/oauth/callback/](https://houston.<BASE_DOMAIN>:8871/v1/oauth/callback/)`. Be sure to include the trailing `/`.

## Step 3: Confirm Your Installation

When you complete this setup, you should be able to see the differences in login flow when logging in at `<BASE_DOMAIN>.astronomer.io`.

If you configured a fully custom OAuth flow, you should see a new **Log in with Custom Oauth** button on the Astronomer login screen:

![Custom login button on the Astronomer login screen](/img/docs/custom-oauth.png)

You will also see the name you configured in `AUTH__OPENID_CONNECT__CUSTOM__DISPLAY_NAME` when authenticating via the Astronomer CLI.
