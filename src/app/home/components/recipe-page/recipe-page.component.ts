import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/data/AuthService';
import { FavoriteItem } from 'src/app/shared/data/dataModel/favoriteItem';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { RecipesIngredientsItem } from 'src/app/shared/data/dataModel/RecipesIngredientsItem';
import { FavoritesService } from 'src/app/shared/data/FavoritesService';
import { RecipesIngredientsService } from 'src/app/shared/data/RecipesIngredientsService';
import { RecipesService } from 'src/app/shared/data/RecipesService';
import { EventBusService } from 'src/app/shared/services/event-bus.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
})
export class RecipePageComponent implements OnInit {
  public data: RecipeItem;
  public found: boolean;
  private subscription: Subscription = new Subscription();
  private favorite: FavoriteItem;
  public recipeIngred: any[];

  constructor(
    private recipesServices: RecipesService,
    private router: Router,
    private favoritesService: FavoritesService,
    private eventBus: EventBusService,
    private authService: AuthService,
    private recipeIngredientsService: RecipesIngredientsService
  ) {}
  //aici am avut probleme cu logarea datelor
  ngOnInit(): void {
    const recieId = this.router.url.split('/').pop();
    const id = Number(recieId);
    this.getRecipeById(id);

    this.subscription.add(
      this.eventBus.on('favoritePageEvent').subscribe((ev) => {
        if (ev == 'unauth') this.found = false;
        else this.verifyFavorite();
      })
    );
  }

  public async getRecipeById(id: number): Promise<void> {
    await this.recipesServices.getRecipeById(id).subscribe((data) => {
      if (data != null) {
        this.data = data;
        if (this.authService.isAuth()) this.verifyFavorite();
        else this.found = false;
        this.getRecipeIngred(id);
      } else {
        this.router.navigateByUrl('/recipes/home');
      }
    });
    // return this.recipesServices.getRecipeById(id).pipe(
    //   take(1),
    //   tap((recipe: RecipeItem) => {
    //     this.getRecipeIngred(id);
    //     // console.log(this.recipeIngred);
    //     this.data = recipe;
    //     if (this.data == null) this.router.navigateByUrl('/recipes/home');
    //   })
    // );
  }

  public getRecipeIngred(id?: any) {
    this.recipeIngredientsService
      .findIngredientsByRecipe(id)
      .subscribe((data) => {
        this.recipeIngred = data;
      });
  }

  public onFavorite() {
    if (!this.found) {
      this.favorite = {
        name: 'favorites',
        recipeId: this.data.id,
      };
      this.subscription.add(
        this.favoritesService.postFavorite(this.favorite).subscribe()
      );
      this.found = true;
    } else this.unFavorite();
    this.eventBus.emit({ name: 'favoritePageEvent', value: '1' });
  }

  public unFavorite() {
    this.found = false;
    this.subscription.add(
      this.favoritesService.deleteFavorite(this.data.id).subscribe()
    );
    this.eventBus.emit({ name: 'favoritePageEvent', value: '1' });
  }

  public verifyFavorite(): void {
    this.favoritesService
      .findFavoriteExist(this.data.id)
      .subscribe((favorites) => {
        if (favorites && favorites.length != 0) {
          this.found = true;
        } else {
          this.found = false;
        }
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
