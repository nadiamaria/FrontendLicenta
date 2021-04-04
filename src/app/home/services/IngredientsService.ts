import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { IngredientsItem } from "./dataModel/ingredientItem";
import { IngredientsResource } from "./resources/IngredientsResource";

@Injectable()
export class IngredientsService {

  constructor(private ingredientsResource: IngredientsResource) {

  }

  public getAllIngredients(): Observable<IngredientsItem[]> {
    return this.ingredientsResource.findAll();
  }
}
