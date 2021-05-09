import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { decode } from '../data/dataModel/decodeDto';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardGuard implements CanActivate, CanDeactivate<unknown> {
  public constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var token = this.cookieService.get('authorization');
    if (token == null) {
      this.router.navigateByUrl('/recipes/home');
      return false;
    }
    var decoded: decode = jwt_decode(token);

    if (decoded.role == 'admin') {
      return true;
    } else {
      this.router.navigateByUrl('/recipes/home');
      return false;
    }
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
