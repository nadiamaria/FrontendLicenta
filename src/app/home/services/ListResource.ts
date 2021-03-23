import { Injectable } from "@angular/core";
import { ApiConfig } from '../../shared/apiConfig';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { RecipeListItem } from './dataModel/recipeListItem';


@Injectable()
export class ListResource {
  private readonly URL = ApiConfig.url + '/recipeList';
  constructor(private httpClient: HttpClient) {

  }

  public findAll(): Observable<RecipeListItem[]> {
    return this.httpClient.get(this.URL) as Observable<RecipeListItem[]>;
  }
}
