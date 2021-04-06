import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { RecipeItem } from './dataModel/recipeItem';
import { RecipesResource } from './resources/RecipesResource';

@Injectable()
export class RecipesService {

  constructor(private recipesResource: RecipesResource) {

  }

  public getAllRecipes(): Observable<RecipeItem[]> {
    return this.recipesResource.findAll();
  }

  public getfilteredItems(values : Array<string>): Observable<RecipeItem[]> {
    return this.recipesResource.findfiltered(values);
  }
}
