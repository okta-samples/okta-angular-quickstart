import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';

describe('AppComponent', () => {
  const authStateSpy = jasmine.createSpyObj('OktaAuthStateService', [], {
    authState$: of({
      isAuthenticated: false
    })
  });

  const authSpy = jasmine.createSpyObj('OktaAuth', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
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

  it(`should have as title 'okta-angular-quickstart'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('okta-angular-quickstart');
  });
});
