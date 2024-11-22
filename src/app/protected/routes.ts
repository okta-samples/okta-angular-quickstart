import { Route } from '@angular/router';
import { ProtectedComponent } from './protected.component';

export const PROTECTED_FEATURE_ROUTES: Route[] = [
    { path: '', component: ProtectedComponent }
];
