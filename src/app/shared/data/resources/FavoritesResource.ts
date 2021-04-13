import { Injectable } from '@angular/core';
import { ApiConfig } from '../../../shared/apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteItem } from '../dataModel/favoriteItem';

@Injectable()
export class FavoritesResource {
  private URL = ApiConfig.url + '/favorites';
  constructor(private httpClient: HttpClient) {}

  public findAllUserFavorites(user: number): Observable<FavoriteItem[]> {
    this.URL = this.URL + '?user=' + user.toString();
    return this.httpClient.get(this.URL) as Observable<FavoriteItem[]>;
  }

  public postFavorite(favorite: FavoriteItem): Observable<FavoriteItem> {
    return this.httpClient.post(this.URL, favorite) as Observable<FavoriteItem>;
  }
}