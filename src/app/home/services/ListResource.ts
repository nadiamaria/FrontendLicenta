import { Injectable } from "@angular/core";
import { ApiConfig } from '../apiConfig';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { RecipeListItem } from './dataModel/recipeListItem';


@Injectable()
export class ListResource {
  private readonly URL = ApiConfig.url + '/list';
  constructor(private httpClient: HttpClient) {

  }

  public findAll(): Observable<RecipeListItem[]> {
    return this.httpClient.get(this.URL) as Observable<RecipeListItem[]>;
  }
}
