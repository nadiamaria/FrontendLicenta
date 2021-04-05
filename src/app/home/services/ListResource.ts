import { Injectable } from "@angular/core";
import { ApiConfig } from '../../shared/apiConfig';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { RecipeListItem } from './dataModel/recipeListItem';


@Injectable()
export class ListResource {
  private readonly URL = ApiConfig.url + '/recipes';
  private filterURL = ApiConfig.url;
  constructor(private httpClient: HttpClient) {
  }

  public findAll(): Observable<RecipeListItem[]> {
    return this.httpClient.get(this.URL) as Observable<RecipeListItem[]>;
  }


  public findfiltered(values : Array<string>): Observable<RecipeListItem[]> {
    this.filterURL = this.filterURL + '?ingredients=' + values.toString();
    return this.httpClient.get(this.URL) as Observable<RecipeListItem[]>;
  }
}
