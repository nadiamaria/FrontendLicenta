import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { RecipeListItem } from './dataModel/recipeListItem';
import { ListResource } from './ListResource';

@Injectable()
export class ListService {

  constructor(private listResource: ListResource) {

  }

  public getAllListItems(): Observable<RecipeListItem[]> {
    return this.listResource.findAll();
  }
}
