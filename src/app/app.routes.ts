import { Routes } from '@angular/router';
import { canActivateAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [canActivateAuthGuard] },
  { path: 'protected', loadChildren: () => import('./protected/routes').then(m => m.PROTECTED_FEATURE_ROUTES), canActivate: [canActivateAuthGuard] },
  { path: 'login/callback', component: OktaCallbackComponent }
];

