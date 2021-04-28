import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, retry } from 'rxjs/operators';

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
    let token = this.cookieService.get('authorization');
    const tokenLocal = `authorization=${token}`;
    req = req.clone({headers: req.headers.set('Set-Cookie', tokenLocal),});

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
    }),
    retry(1),
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          console.log('log-out');
          if (this.urlContains('/api/auth/login', req)) {
            return throwError(error);
          } else {
            console.log('log-out');
          }
          break;
        default:
          return throwError(error);
      }
    })
    );

    // newreq.headers.append('mama', localStorage.getItem('token'))
    // return next.handle(newreq);
  }

  private urlContains(path: string, req: HttpRequest<any>): boolean {
    return req.url.indexOf(path) !== -1;
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
}
