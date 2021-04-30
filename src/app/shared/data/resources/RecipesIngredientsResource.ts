import { Injectable } from '@angular/core';
import { ApiConfig } from '../../apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipesIngredientsItem } from '../dataModel/RecipesIngredientsItem';

@Injectable()
export class RecipesIngredientsResource {
  private URL = ApiConfig.url + '/recipesIngredients';
  constructor(private httpClient: HttpClient) {}

  public findAllRecipeIngredients(recipeId: number): Observable<any[]> {
    this.URL = ApiConfig.url + '/recipesIngredients';
    this.URL = this.URL + '/recipe/' + recipeId.toString();
    return this.httpClient.get(this.URL) as Observable<
      RecipesIngredientsItem[]
    >;
  }
}
