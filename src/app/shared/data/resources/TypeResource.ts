import { Injectable } from '@angular/core';
import { ApiConfig } from '../../apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeItem } from '../dataModel/typeItem';

@Injectable()
export class TypeResource {
  private URL = ApiConfig.url + '/recipeTypes';
  constructor(private httpClient: HttpClient) {}

  public findAllTypes(): Observable<TypeItem[]> {
    return this.httpClient.get(this.URL) as Observable<TypeItem[]>;
  }
}
