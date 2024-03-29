import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { formInterface } from 'src/app/home/components/filter/filter.component';
import { insertRecipeItemDto } from './dataModel/insertRecipeItemDto';
import { RecipeItem } from './dataModel/recipeItem';
import { RecipesResource } from './resources/RecipesResource';

@Injectable()
export class RecipesService {
  constructor(private recipesResource: RecipesResource) {}

  public getAllRecipes(
    values?: formInterface,
    category?: string,
    type?: string
  ): Observable<RecipeItem[]> {
    return this.recipesResource.findAll(values, category, type);
  }

  public getRecipeById(id: number): Observable<RecipeItem> {
    return this.recipesResource.findById(id);
  }

  public getfavoriteItems(): Observable<RecipeItem[]> {
    return this.recipesResource.findfavorite();
  }

  public insert(recipe: insertRecipeItemDto): Observable<insertRecipeItemDto> {
    return this.recipesResource.post(recipe);
  }
}
