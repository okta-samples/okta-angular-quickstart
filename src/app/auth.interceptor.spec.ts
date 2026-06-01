import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { authInterceptor } from './auth.interceptor';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { OKTA_AUTH } from '@okta/okta-angular';
import { vi } from 'vitest';

describe('AuthInterceptor', () => {
  type AuthServiceMock = {
    getAccessToken: ReturnType<typeof vi.fn<() => string | undefined>>;
  };

  const authServiceSpy = {
    getAccessToken: vi.fn<() => string | undefined>().mockReturnValue('letMeIn')
  } satisfies AuthServiceMock;

  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    authServiceSpy.getAccessToken.mockReset();
    authServiceSpy.getAccessToken.mockReturnValue('letMeIn');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: OKTA_AUTH, useValue: authServiceSpy }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('adds the Authorization header when url is in allowed list', () => {
    httpClient.get('http://localhost').subscribe({
      next: response => expect(response).toBeTruthy(),
      error: err => {
        throw err;
      }
    });

    const req = httpMock.expectOne(r => r.headers.has('Authorization'));
    req.flush({hello: 'world'});
  });

  it('skips the Authorization header when url is not in allowed list', () => {
    httpClient.get('https://okta.com').subscribe({
      next: response => expect(response).toBeTruthy(),
      error: err => {
        throw err;
      }
    });

    const req = httpMock.expectOne(r => r.headers.get('Authorization') === null);
    req.flush({hello: 'world'});
  });
});
