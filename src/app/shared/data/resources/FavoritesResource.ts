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
    this.URL = ApiConfig.url + '/favorites';
    this.URL = this.URL + '?user=' + user.toString();
    return this.httpClient.get(this.URL) as Observable<FavoriteItem[]>;
  }

  //iau din BE user-ul
  public postFavorite(favorite: FavoriteItem): Observable<FavoriteItem> {
    this.URL = ApiConfig.url + '/favorites';
    return this.httpClient.post(this.URL, favorite) as Observable<FavoriteItem>;
  }

  //tot din BE iau user-ul
  public findFavoriteExist(recipe: number): Observable<FavoriteItem[]> {
    this.URL = ApiConfig.url + '/favorites';
    this.URL = this.URL + '/' + recipe.toString();
    return this.httpClient.get(this.URL) as Observable<FavoriteItem[]>;
  }

  public deleteFavorite(recipe: number): Observable<FavoriteItem> {
    this.URL = ApiConfig.url + '/favorites';
    this.URL = this.URL + '/' + recipe.toString();
    return this.httpClient.delete(this.URL) as Observable<FavoriteItem>;
  }
}
