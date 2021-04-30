import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/data/AuthService';
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
  public logIn: boolean = false;
  public favorites: boolean = false;

  constructor(
    private recipesService: RecipesService,
    private eventBus: EventBusService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.logIn = this.authService.isAuth();
    this.favorites = !this.authService.isAuth();

    if (this.authService.isAuth()) this.getFavoriteRecipe();

    this.subscription.add(
      this.eventBus.on('favoritePageEvent').subscribe((data: number) => {
        if (this.authService.isAuth()) {
          this.getFavoriteRecipe();
        }
      })
    );
  }

  public getFavoriteRecipe() {
    this.recipesService.getfavoriteItems().subscribe((recipes) => {
      this.recipes = recipes;
      if (this.recipes == null || this.recipes.length != 0) {
        this.favorites = true;
      } else this.favorites = false;
    });
  }
}
