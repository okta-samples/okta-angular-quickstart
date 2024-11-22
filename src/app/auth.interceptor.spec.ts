import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OktaAuth } from '@okta/okta-auth-js';

import { authInterceptor } from './auth.interceptor';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';

describe('AuthInterceptor', () => {
  const authServiceSpy = jasmine.createSpyObj<OktaAuth>(['getAccessToken']);
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: OKTA_AUTH, useValue: authServiceSpy }
      ]
    });

    authServiceSpy.getAccessToken.and.returnValue('letMeIn');
  });

  beforeEach(inject([HttpClient, HttpTestingController], (http: HttpClient, httpTestController: HttpTestingController) => {
    httpClient = http;
    httpMock = httpTestController;
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('adds the Authorization header when url is in allowed list', () => {
    httpClient.get('http://localhost').subscribe({
      next: response => expect(response).toBeTruthy(),
      error: err => fail(err)
    });

    const req = httpMock.expectOne(r => r.headers.has('Authorization'));
    req.flush({hello: 'world'});
    httpMock.verify();
  });

  it('skips the Authorization header when url is not in allowed list', () => {
    httpClient.get('https://okta.com').subscribe({
      next: response => expect(response).toBeTruthy(),
      error: err => fail(err)
    });

    const req = httpMock.expectOne(r => r.headers.get('Authorization') === null);
    req.flush({hello: 'world'});
    httpMock.verify();
  });
});
