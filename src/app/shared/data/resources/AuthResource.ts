import { Injectable } from '@angular/core';
import { ApiConfig } from '../../apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSignUpItem } from '../dataModel/userSignUpListItem';
import { catchError } from 'rxjs/operators';
import RequestWithUser from '../dataModel/logInDto';
import authDto from '../dataModel/authDto';

@Injectable()
export class AuthResource {
  private URL = ApiConfig.url + '/authentication';

  constructor(private httpClient: HttpClient) {}

  public postUser(user: UserSignUpItem): Observable<UserSignUpItem> {
    this.URL = ApiConfig.url + '/authentication' + '/register';
    return this.httpClient.post(this.URL, user) as Observable<UserSignUpItem>;
  }

  public logInUser(userRequest: RequestWithUser): Observable<authDto> {
    this.URL = ApiConfig.url + '/authentication' + '/log-in';
    return this.httpClient.post(this.URL, userRequest, {withCredentials: true}) as Observable<authDto>;
  }

  public logOutUser(): Observable<authDto> {
    this.URL = ApiConfig.url + '/authentication' + '/log-out';
    return this.httpClient.post(this.URL, '') as Observable<authDto>;
  }

  public authUser(): Observable<authDto> {
    this.URL = ApiConfig.url + '/authentication';
    return this.httpClient.post(this.URL, '') as Observable<authDto>;
  }
}
