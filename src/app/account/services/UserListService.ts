import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UserSignUpItem } from "./dataModel/UserSignUpListItem";
import { UserResource } from "./UserResource";


@Injectable({ providedIn: 'root' })
export class UserListService {

  constructor(private userResource: UserResource) {

  }

  // public getAllListItems(): Observable<RecipeListItem[]> {
  //   return this.listResource.findAll();
  // }

  public postUser(user: UserSignUpItem): Observable<UserSignUpItem> {
    return this.userResource.postUser(user);
  }


}
