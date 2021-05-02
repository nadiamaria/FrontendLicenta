import { Injectable } from '@angular/core';
import { ApiConfig } from '../../../shared/apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeItem } from '../dataModel/recipeItem';
import { formInterface } from 'src/app/home/components/filter/filter.component';

@Injectable()
export class RecipesResource {
  private URL = ApiConfig.url + '/recipes';
  constructor(private httpClient: HttpClient) {}

  public findAll(
    values?: formInterface,
    category?: string
  ): Observable<RecipeItem[]> {
    this.URL = ApiConfig.url + '/recipes';
    if (values)
      this.URL =
        this.URL +
        '?ingredients=' +
        values.ingredients.toString() +
        '&categorys=' +
        values.category +
        '&types=' +
        values.type;
    if (category) {
      this.URL = this.URL + '?categorys=' + category;
    }
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
