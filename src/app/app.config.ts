import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { OktaAuth } from '@okta/okta-auth-js';
import { provideOktaAuth, withOktaConfig } from '@okta/okta-angular';

const oktaAuth = new OktaAuth({
  issuer: 'https://{yourOktaDomain}',
  clientId: '{yourClientID}',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'offline_access']
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideOktaAuth(
      withOktaConfig({ oktaAuth })
    ),
    provideHttpClient(withInterceptors([
      authInterceptor
    ])),
  ]
};
