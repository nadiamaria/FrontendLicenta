import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { insertRecipesIngredientsItem } from './dataModel/insertRecipeIngerdientDto';
import { RecipesIngredientsItem } from './dataModel/RecipesIngredientsItem';
import { RecipesIngredientsResource } from './resources/RecipesIngredientsResource';

@Injectable()
export class RecipesIngredientsService {
  constructor(private recipesIngredientsResource: RecipesIngredientsResource) {}

  public findIngredientsByRecipe(values?: number): Observable<any[]> {
    return this.recipesIngredientsResource.findAllRecipeIngredients(values);
  }

  public insert(
    recipeIngredient: insertRecipesIngredientsItem
  ): Observable<insertRecipesIngredientsItem> {
    return this.recipesIngredientsResource.post(recipeIngredient);
  }
}
