import { Component, inject } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map } from 'rxjs';
import { AuthState } from '@okta/okta-auth-js';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe],
  template: `
  <div class="profile-card">
    <div class="shield"></div>
    <p>Welcome
      @if(name$ | async; as name) {
        <span>{{name}} </span>
      }
    </p>
  </div>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private oktaAuthStateService = inject(OktaAuthStateService);

  public name$ = this.oktaAuthStateService.authState$.pipe(
    filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
    map((authState: AuthState) => authState.idToken?.claims.name ?? '')
  );
}
