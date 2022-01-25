import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthHeaderToAllowedOrigins(request));
  }

  private addAuthHeaderToAllowedOrigins(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let req = request;
    const allowedOrigins = ['http://localhost'];
    if(!!allowedOrigins.find(origin => request.url.includes(origin))) {
      const authToken = this._oktaAuth.getAccessToken();
      req = request.clone({ setHeaders: { 'Authorization': `Bearer ${authToken}` } });
    }

    return req;
  }
}
