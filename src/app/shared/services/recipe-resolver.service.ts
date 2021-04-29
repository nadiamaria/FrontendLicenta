import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeItem } from '../data/dataModel/recipeItem';
import { RecipesService } from '../data/RecipesService';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<RecipeItem> {
  constructor(private recipesServices: RecipesService) {}

  public resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): RecipeItem | Observable<RecipeItem> | Promise<RecipeItem> {
    return this.recipesServices.getRecipeById(_route.params['id']);
  }
}
