import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeItem } from './dataModel/recipeItem';
import { RecipesResource } from './resources/RecipesResource';

@Injectable()
export class RecipesService {
  constructor(private recipesResource: RecipesResource) {}

  public getAllRecipes(values?: Array<string>): Observable<RecipeItem[]> {
    return this.recipesResource.findAll(values);
  }

  public getRecipeById(id: number): Observable<RecipeItem> {
    return this.recipesResource.findById(id);
  }

  public getfavoriteItems(): Observable<RecipeItem[]> {
    return this.recipesResource.findfavorite();
  }
}
