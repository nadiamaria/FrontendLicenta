import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { FavoriteItem } from '../../data/dataModel/favoriteItem';
import { FavoritesService } from '../../data/FavoritesService';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private foundSubs: Subscription = new Subscription();
  private favorite: FavoriteItem;

  public found: boolean = false;
  public foundObservable: Subject<boolean> = new Subject<boolean>();

  @Input() recipe;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifyFavorite();
  }

  public onFavorite() {
    if (!this.found) {
      this.favorite = {
        name: 'favorites1',
        recipeId: this.recipe.id,
        userId: 1,
      };
      this.subscription.add(
        this.favoritesService
          .postFavorite(this.favorite)
          .subscribe((x) => console.log(x))
      );
      this.found = true;
    } else this.unFavorite();
  }

  public unFavorite() {
    console.log('unfavorite');
    this.found = false;
    this.subscription.add(
      this.favoritesService
        .deleteFavorite(this.recipe.id, 1)
        .subscribe((x) => console.log(x))
    );
  }

  public verifyFavorite(): void {
    let found = false;
    this.favoritesService
      .findFavoriteExist(this.recipe.id, 1)
      .subscribe((favorites) => {
        if (favorites.length != 0) {
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
