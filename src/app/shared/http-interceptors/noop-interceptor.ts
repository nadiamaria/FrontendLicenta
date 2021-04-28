import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  public constructor(private cookieService: CookieService) {
    // console.log('noop');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('authorization');
    const tokenLocal = `authorization=${token}`;
    if (tokenLocal) {
      const newreq = req.clone({
        headers: req.headers.set('Set-Cookie', tokenLocal),
      });
      return next.handle(newreq);
    } else {
      return next.handle(req);
    }
    // newreq.headers.append('mama', localStorage.getItem('token'))
    // return next.handle(newreq);
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
}
