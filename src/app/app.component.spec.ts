import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { vi } from 'vitest';

describe('AppComponent', () => {
  const authStateSpy = {
    authState$: of({
      isAuthenticated: false
    })
  };

  const authSpy = {
    signInWithRedirect: vi.fn().mockResolvedValue(undefined),
    signOut: vi.fn().mockResolvedValue(undefined)
  };

  beforeEach(async () => {
    authSpy.signInWithRedirect.mockReset();
    authSpy.signInWithRedirect.mockResolvedValue(undefined);
    authSpy.signOut.mockReset();
    authSpy.signOut.mockResolvedValue(undefined);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      providers: [
        { provide: OktaAuthStateService, useValue: authStateSpy },
        { provide: OKTA_AUTH, useValue: authSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should call Okta's login method in the sign in method`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    await app.signIn();
    expect(authSpy.signInWithRedirect).toHaveBeenCalled();
  });
});
