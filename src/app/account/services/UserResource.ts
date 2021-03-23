import { Injectable } from "@angular/core";
import { ApiConfig } from '../../shared/apiConfig';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { UserSignUpItem } from "./dataModel/UserSignUpListItem";
import { catchError } from "rxjs/operators";


@Injectable()
export class UserResource {
  private readonly URL = ApiConfig.url + '/userList';


  constructor(private httpClient: HttpClient) {

  }

  // public findAll(): Observable<RecipeListItem[]> {
  //   return this.httpClient.get(this.URL) as Observable<RecipeListItem[]>;
  // }

  public postUser(user: UserSignUpItem): Observable<UserSignUpItem> {
    // return this.httpClient.post(this.URL,JSON.stringify(user)) as Observable<UserSignUpItem>;
    return this.httpClient.post(this.URL, user) as Observable<UserSignUpItem>;

  }

}
