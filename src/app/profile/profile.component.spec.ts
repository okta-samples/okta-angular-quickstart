import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { OktaAuthStateService } from '@okta/okta-angular';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  const name = 'Awesome dev';
  const authSpy = jasmine.createSpyObj('OktaAuthStateService', [], {
    authState$: of({
      isAuthenticated: true,
      idToken: {
        claims: {
          name
        }
      }
    })
  });

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [
        { provide: OktaAuthStateService, useValue: authSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a welcoming message with username', () => {
    const message = fixture.debugElement.query(By.css('span')).nativeElement.innerText;
    expect(message).toContain(name);
  });
});
