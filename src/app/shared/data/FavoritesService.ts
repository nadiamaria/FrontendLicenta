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

  public postUser(favorite: FavoriteItem): Observable<FavoriteItem> {
    return this.favoritesResource.postFavorite(favorite);
  }
}
