import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { RecipesService } from '../../../shared/data/RecipesService';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';
import { formInterface } from '../filter/filter.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public recipes: RecipeItem[];
  private subscription: Subscription = new Subscription();
  public url: Array<string>;
  public isOpen: boolean;

  constructor(
    private recipesService: RecipesService,
    private eventBus: EventBusService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isOpen = false;
    this.getRecipe();

    this.subscription.add(
      this.eventBus.on('filterChanged').subscribe((data: any) => {
        this.getRecipe(data);
      })
    );

    this.subscription.add(
      this.eventBus.on('auth').subscribe((data: any) => {
        this.openSnackBar(data);
      })
    );

    this.subscription.add(
      this.eventBus.on('favoritenotauth').subscribe((data: any) => {
        this.openDialog();
      })
    );

    this.subscription.add(
      this.eventBus.on('showForm').subscribe((data: any) => {
        this.isOpen = !this.isOpen;
      })
    );
  }

  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getRecipe(data?: formInterface) {
    // var url: Array<any> = [];
    // for (var key in data) {
    //   if (data[key] == true) url.push(key);
    // }
    this.recipesService.getAllRecipes(data).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FavoriteDialogComponent);
  }
}
