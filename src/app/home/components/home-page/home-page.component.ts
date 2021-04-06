import { Component, OnInit } from '@angular/core';
import { RecipeItem } from '../../services/dataModel/recipeItem';
import { RecipesService } from '../../services/RecipesService';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public recipes: RecipeItem[];
  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipesService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

}
