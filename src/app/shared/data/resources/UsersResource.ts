import { Injectable } from '@angular/core';
import { ApiConfig } from '../../apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeItem } from '../dataModel/typeItem';
import { UserItem } from '../dataModel/UserItem';

@Injectable()
export class UsersResource {
  private URL = ApiConfig.url + '/users';
  constructor(private httpClient: HttpClient) {}

  public findAllUsers(): Observable<UserItem[]> {
    return this.httpClient.get(this.URL) as Observable<UserItem[]>;
  }

  public putUser(user: UserItem): Observable<UserItem> {
    this.URL = ApiConfig.url + '/authentication/' + user.id;
    return this.httpClient.put(this.URL, user) as Observable<UserItem>;
  }
}
