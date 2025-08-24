# Angular Quickstart Sample Code for Integrating with Okta using the Redirect Model

This repository contains a sample of integrating with [Okta](https://www.okta.com/) for authentication using [the redirect model in an Angular app](https://developer.okta.com/docs/guides/sign-into-spa/angular/main/).

The sample uses the [Okta Angular SDK](https://github.com/okta/okta-angular) and [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js). Read more about getting started with Okta and authentication best practices on the [Okta Developer Portal](https://developer.okta.com).

This code sample demonstrates
* Configuring Okta
* Sign-in and sign-out
* Protecting routes
* Displaying user profile information from the ID Token
* Adding an interceptor for adding the Access Token to HTTP calls

## Prerequisites

Sign up for an [Integrator account](https://developer.okta.com/login). Once you have an account, sign in to your [Integrator account](https://developer.okta.com/login). Next, in the Admin Console:

1. Go to **Applications > Applications**
2. Click **Create App Integration**
3. Select **OIDC - OpenID Connect** as the sign-in method
4. Select **Single-Page Application** as the application type, then click **Next**
5. Enter an app integration name (e.g. "My Angular SPA")
6. In the **Grant type** section, ensure both **Authorization Code** and **Refresh Token** are selected
7. Configure the redirect URIs:
- **Sign-in redirect URIs:** `http://localhost:4200/login/callback`
- **Sign-out redirect URIs:** `http://localhost:4200`
8. In the **Controlled access** section, select the appropriate access level
9. Click **Save**

## Configure Okta resources

**Verify Authorization Server**

When using a custom authorization server, you need to set up authorization policies. Complete these additional steps:

1. In the Admin Console, go to **Security > API > Authorization Servers**
2. Select your custom authorization server (`default`)
3. On the **Access Policies** tab, ensure you have at least one policy:
  - If no policies exist, click **Add New Access Policy**
  - Give it a name like “Default Policy”
  - Set **Assign to** to “All clients”
  - Click **Create Policy**
4. For your policy, ensure you have at least one rule:
  - Click **Add Rule** if no rules exist
  - Give it a name like “Default Rule”
  - Set **Grant type** is to “Authorization Code”
  - Set **User** is to “Any user assigned the app”
  - Set **Scopes requested** to “Any scopes”
  - Click **Create Rule**

For more details, see the [Custom Authorization Server documentation](https://developer.okta.com/docs/concepts/auth-servers/#custom-authorization-server).

## Get the Code

```shell
git clone https://github.com/okta-samples/okta-angular-quickstart.git
cd okta-angular-quickstart
npm ci
```

Update src/app.config.ts with your Okta settings.

```ts
const oktaAuth = new OktaAuth({
  clientId: '0oab8eb55Kb9jdMIr5d6',
  issuer: 'https://integrator-1337.okta.com',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'offline_access']
});
```

### Where are my new app's credentials?

Creating an OIDC Single-Page App manually in the Admin Console configures your Okta Org with the application settings. You may also need to configure trusted origins for `http://localhost:8080` in **Security > API > Trusted Origins**.

After creating the app, you can find the configuration details on the app’s **General** tab:
- **Client ID**: Found in the **Client Credentials** section
- **Issuer**: Found in the **Issuer URI** field for the authorization server that appears by selecting **Security > API** from the navigation pane.

## Run the Example

Start the app by running

```shell
npm start
```

Spec files have been updated to demonstrate how to configure the `TestBed` and provide a spy in place of Okta services.

Run tests by

```shell
npm run test
```

## Helpful resources
* [Learn about Authentication, OAuth 2.0, and OpenID Connect](https://developer.okta.com/docs/concepts/)
* [Get started with Angular](https://angular.io/start)
* [Angular developer guide](https://angular.io/guide/developer-guide-overview)

## Help

Please visit our [Okta Developer Forums](https://devforum.okta.com/).
