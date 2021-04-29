import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { RecipesService } from 'src/app/shared/data/RecipesService';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
})
export class RecipePageComponent implements OnInit {
  public data: RecipeItem;

  constructor(
    private recipesServices: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params.id),
        switchMap((id: number) => this.getRecipeById(id))
      )
      .subscribe();
  }

  public getRecipeById(id: number): Observable<RecipeItem> {
    return this.recipesServices.getRecipeById(id).pipe(
      take(1),
      tap((recipe: RecipeItem) => {
        this.data = recipe;
        console.log(this.data);
      })
    );
    // let recipe;
    // this.recipesServices.getRecipeById(id).subscribe((recipe) => {
    //   recipe = recipe;
    //   console.log(recipe);
    // });
    // return recipe;
  }
}
