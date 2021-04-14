import { Component, OnInit } from '@angular/core';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { RecipesService } from 'src/app/shared/data/RecipesService';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  public recipes: RecipeItem[];
  public url: Array<string>;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.getFavoriteRecipe();
  }

  public getFavoriteRecipe(data?: any) {
    var url: Array<any> = [];
    for (var key in data) {
      if (data[key] == true) url.push(key);
    }
    this.recipesService.getAllRecipes(url).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
