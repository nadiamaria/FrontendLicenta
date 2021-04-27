import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteItem } from './dataModel/favoriteItem';
import { FavoritesResource } from './resources/FavoritesResource';

@Injectable()
export class FavoritesService {
  constructor(private favoritesResource: FavoritesResource) {}

  public findAllUserFavorites(values?: number): Observable<FavoriteItem[]> {
    return this.favoritesResource.findAllUserFavorites(values);
  }

  public postFavorite(favorite: FavoriteItem): Observable<FavoriteItem> {
    return this.favoritesResource.postFavorite(favorite);
  }

  public findFavoriteExist(recipeid: number): Observable<FavoriteItem[]> {
    return this.favoritesResource.findFavoriteExist(recipeid);
  }

  public deleteFavorite(recipe: number): Observable<FavoriteItem> {
    return this.favoritesResource.deleteFavorite(recipe);
  }
}
