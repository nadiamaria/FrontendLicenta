import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from '../data/AuthService';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {
  public constructor(private router: Router, 
    // public auth: AuthService,
    private cookieService: CookieService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = this.cookieService.get('authorization');
      if (token == ' ' || !this.cookieService.get('authorization'))
        {
          return true;
        } 
      // if (!this.auth.isAuth()) {
      //   // redirect the user
      //   return true;
      // }
      this.router.navigateByUrl('/recipes/home');
    return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log('wtf')
      // if (this.auth.isAuth()) {
      //   // redirect the user
      //   // this.router.navigateByUrl('/recipes/home');
      //   return true;
      // }
    return true;
  }
  
}
