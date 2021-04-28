import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { FavoriteItem } from '../../data/dataModel/favoriteItem';
import { FavoritesService } from '../../data/FavoritesService';
import { EventBusService } from '../../services/event-bus.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private foundSubs: Subscription = new Subscription();
  private favorite: FavoriteItem;

  public found: boolean;
  public foundObservable: Subject<boolean> = new Subject<boolean>();

  @Input() recipe;

  constructor(
    private favoritesService: FavoritesService,
    private eventBus: EventBusService
  ) {}

  ngOnInit(): void {
    // setTimeout(this.verifyFavorite.bind(this), 1000);
    this.verifyFavorite();

    // this.subscription.add(
    //   this.eventBus.on('favoritePageEvent').subscribe((ev) => {
    //     this.verifyFavorite();
    //   })
    // );
  }
  

  public onFavorite() {
    if (!this.found) {
      this.favorite = {
        name: 'favorites',
        recipeId: this.recipe.id,
      };
      this.subscription.add(
        this.favoritesService
          .postFavorite(this.favorite)
          .subscribe()
      );
      this.found = true;
    } else this.unFavorite();
    this.eventBus.emit({ name: 'favoritePageEvent', value: '1' });
  }

  public unFavorite() {
    this.found = false;
    this.subscription.add(
      this.favoritesService
        .deleteFavorite(this.recipe.id)
        .subscribe()
    );
    this.eventBus.emit({ name: 'favoritePageEvent', value: '1' });
  }

  public verifyFavorite(): void {
    this.favoritesService
      .findFavoriteExist(this.recipe.id)
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
