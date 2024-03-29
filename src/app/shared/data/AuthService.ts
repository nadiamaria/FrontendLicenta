import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import authDto from './dataModel/authDto';
import RequestWithUser from './dataModel/logInDto';
import { UserSignUpItem } from './dataModel/userSignUpListItem';
import { AuthResource } from './resources/AuthResource';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authResource: AuthResource, private cookieService: CookieService) {}

  public register(user: UserSignUpItem): Observable<UserSignUpItem> {
    return this.authResource.postUser(user);
  }

  public logIn(userRequest: RequestWithUser): Observable<authDto> {
    return this.authResource.logInUser(userRequest);
  }

  public logOut(): Observable<authDto> {
    return this.authResource.logOutUser();
  }

  public auth(): Observable<authDto> {
    return this.authResource.authUser();
  }

  public storageLogIn(): void {}

  public isAuth(): boolean { //verif dupa expire time?
    let token = this.cookieService.get('authorization');
    if (token == ' ' || !this.cookieService.get('authorization'))
      return false;
      else
      return true;
  }
}
