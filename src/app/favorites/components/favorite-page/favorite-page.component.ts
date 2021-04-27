import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { RecipesService } from 'src/app/shared/data/RecipesService';
import { EventBusService } from 'src/app/shared/services/event-bus.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  public recipes: RecipeItem[];
  private subscription: Subscription = new Subscription();
  public url: Array<string>;

  constructor(
    private recipesService: RecipesService,
    private eventBus: EventBusService
  ) {}

  ngOnInit(): void {
    this.getFavoriteRecipe();

    this.subscription.add(
      this.eventBus.on('favoritePageEvent').subscribe((data: number) => {
        this.getFavoriteRecipe();
      })
    );
  }

  public getFavoriteRecipe() {
    this.recipesService.getfavoriteItems().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
