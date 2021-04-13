import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { RecipesService } from '../../../shared/data/RecipesService';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public recipes: RecipeItem[];
  private subscription: Subscription = new Subscription();
  public url: Array<string>;

  constructor(
    private recipesService: RecipesService,
    private eventBus: EventBusService
  ) {}

  ngOnInit(): void {
    this.getRecipe();

    this.subscription.add(
      this.eventBus.on('filterChanged').subscribe((data: any) => {
        this.getRecipe(data);
      })
    );
  }

  public getRecipe(data?: any) {
    var url: Array<any> = [];
    for (var key in data) {
      if (data[key] == true) url.push(key);
    }
    this.recipesService.getAllRecipes(url).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
