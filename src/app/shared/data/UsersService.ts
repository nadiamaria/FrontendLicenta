import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeItem } from './dataModel/typeItem';
import { UserItem } from './dataModel/UserItem';
import { UsersResource } from './resources/UsersResource';

@Injectable()
export class UsersService {
  constructor(private usersResource: UsersResource) {}

  public findAll(): Observable<UserItem[]> {
    return this.usersResource.findAllUsers();
  }

  public register(user: UserItem): Observable<UserItem> {
    return this.usersResource.putUser(user);
  }

  public update(user: UserItem): Observable<UserItem> {
    return this.usersResource.editUser(user);
  }
}
