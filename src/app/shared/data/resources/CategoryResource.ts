import { Injectable } from '@angular/core';
import { ApiConfig } from '../../apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipesIngredientsItem } from '../dataModel/RecipesIngredientsItem';
import { CategoryItem } from '../dataModel/categoryItem';

@Injectable()
export class CategoryResource {
  private URL = ApiConfig.url + '/recipeCategorys';
  constructor(private httpClient: HttpClient) {}

  public findAllCategory(): Observable<CategoryItem[]> {
    this.URL = ApiConfig.url + '/recipeCategorys';
    return this.httpClient.get(this.URL) as Observable<CategoryItem[]>;
  }
}
