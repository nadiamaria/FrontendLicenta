import { Injectable } from "@angular/core";
import { ApiConfig } from '../../../shared/apiConfig';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IngredientsItem } from "../dataModel/ingredientItem";


@Injectable()
export class IngredientsResource {
  private readonly URL = ApiConfig.url + '/ingredients';
  constructor(private httpClient: HttpClient) {

  }

  public findAll(): Observable<IngredientsItem[]> {
    return this.httpClient.get(this.URL) as Observable<IngredientsItem[]>;
  }
}
