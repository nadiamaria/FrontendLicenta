import { Injectable } from '@angular/core';
import { ApiConfig } from '../../../shared/apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeItem } from '../dataModel/recipeItem';

@Injectable()
export class RecipesResource {
  private URL = ApiConfig.url + '/recipes';
  constructor(private httpClient: HttpClient) {}

  public findAll(values?: Array<string>): Observable<RecipeItem[]> {
    this.URL = ApiConfig.url + '/recipes';
    if (values) this.URL = this.URL + '?ingredients=' + values.toString();
    return this.httpClient.get(this.URL) as Observable<RecipeItem[]>;
  }

  public findById(id: number): Observable<RecipeItem> {
    this.URL = ApiConfig.url + '/recipes/' + id;
    return this.httpClient.get(this.URL) as Observable<RecipeItem>;
  }

  public findfavorite(): Observable<RecipeItem[]> {
    this.URL = ApiConfig.url + '/recipes/favorites';
    return this.httpClient.get(this.URL) as Observable<RecipeItem[]>;
  }
}
