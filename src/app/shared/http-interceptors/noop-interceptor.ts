import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, retry } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  public constructor(
    private cookieService: CookieService,
    private _snackBar: MatSnackBar
  ) {}

  public number: number = 0;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.cookieService.get('authorization');
    const tokenLocal = `authorization=${token}`;
    req = req.clone({ headers: req.headers.set('Set-Cookie', tokenLocal) });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (
            'http://localhost:3000/authentication/register' == event.url &&
            event.status == 201 &&
            event.statusText == 'Created'
          )
            this.openSnackBar('Utilizator inregistrat cu succes! :)');
          if (
            'http://localhost:3000/authentication/log-in' === event.url &&
            event.status == 200 &&
            event.statusText == 'OK'
          ) {
            this.openSnackBar('Te-ai logat cu succes! Spor la gatit! :)');
            console.log(event.url);
          }
        }
        return event;
      }),
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // client-side error or network error
        } else {
          if (error.status === 400) {
            if ('Wrong credentials provided' == error.error.message)
              this.openSnackBar('Parola sau email greșit. Încearcă din nou.');
          }
          if (error.status === 500) {
            if ('http://localhost:3000/authentication/register' == error.url)
              this.openSnackBar('Email deja folosit. Încearcă din nou.');
            if ('http://localhost:3000/recipes' == error.url)
              this.openSnackBar(
                'Nu ai completat toate câmpurile, încearcă din nou!'
              );
            if ('http://localhost:3000/authentication' == error.url) {
              this.openSnackBar('Sesiunea a expirat, logheaza-te din nou!');
              this.cookieService.set('authorization', ' ');
            }
          }
          if (error.status === 401) {
            if ('http://localhost:3000/authentication/log-in' == error.url)
              this.openSnackBar('Parola sau email greșit. Încearcă din nou.');
            else this.openSnackBar('Sesiunea a expirat, logheaza-te din nou!');
          }
        }
        return throwError(error);

        // switch (error.status) {
        //   case 401:
        //     console.log(req);
        //     break;
        //   case 401:
        //     if (this.urlContains('/api/auth/login', req)) {
        //       // return throwError(error);
        //     } else {
        //       // console.log('log-out');
        //     }
        //     break;
        //   case 501:
        //     console.log('no acces');
        //     break;
        //   default:
        //     return throwError(error);
        // }
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

  public openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 10000,
    });
  }
}
