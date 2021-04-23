import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { IfStmt } from '@angular/compiler';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  public constructor() {
    console.log('noop');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      console.log(Date.now());
      // const tokenLocal = localStorage.getItem('token');
      // if(tokenLocal){
      //   const newreq = req.clone({headers : req.headers.set('Authentication', localStorage.getItem('token'))});
      //   return next.handle(newreq);
      // }
      // else
      // {
      return next.handle(req);
      // }
      // newreq.headers.append('mama', localStorage.getItem('token'))
    // return next.handle(newreq);
  }
}
