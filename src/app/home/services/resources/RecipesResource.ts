import { Injectable } from "@angular/core";
import { ApiConfig } from '../../../shared/apiConfig';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { RecipeItem } from '../dataModel/recipeItem';


@Injectable()
export class RecipesResource {
  private URL = ApiConfig.url + '/recipes';
  constructor(private httpClient: HttpClient) {

  }

  public findAll(): Observable<RecipeItem[]> {
    return this.httpClient.get(this.URL) as Observable<RecipeItem[]>;
  }

  public findfiltered(values : Array<string>): Observable<RecipeItem[]> {
    this.URL = this.URL + '?ingredients=' + values.toString();
    return this.httpClient.get(this.URL) as Observable<RecipeItem[]>;
  }
}
