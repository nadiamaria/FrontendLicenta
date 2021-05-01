import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryItem } from './dataModel/categoryItem';
import { RecipesIngredientsItem } from './dataModel/RecipesIngredientsItem';
import { CategoryResource } from './resources/CategoryResource';
import { RecipesIngredientsResource } from './resources/RecipesIngredientsResource';

@Injectable()
export class CategoryService {
  constructor(private categoryResource: CategoryResource) {}

  public findCategory(): Observable<CategoryItem[]> {
    return this.categoryResource.findAllCategory();
  }
}
