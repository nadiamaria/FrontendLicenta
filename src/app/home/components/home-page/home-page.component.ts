import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeItem } from '../../services/dataModel/recipeItem';
import { RecipesService } from '../../services/RecipesService';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public recipesList: RecipeItem[];
  constructor(private listService: RecipesService) { }

  ngOnInit(): void {
    this.listService.getAllRecipes().subscribe(recipes => {
      this.recipesList = recipes;
    });
  }

}
