import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OktaAuth } from '@okta/okta-auth-js';

import { AuthInterceptor } from './auth.interceptor';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';

describe('AuthInterceptor', () => {
  const authServiceSpy = jasmine.createSpyObj<OktaAuth>(['getAccessToken']);
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: OKTA_AUTH, useValue: authServiceSpy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
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
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
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
