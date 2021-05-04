import { Injectable } from '@angular/core';
import { RecipesService } from '../data/RecipesService';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';

@Injectable({
  providedIn: 'root',
})
export class RandomKcalService {
  public fullRecipes = {
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  public recipeId = {
    breakfastIds: [],
    lunchId: [],
    dinnerId: [],
    randomId: [],
  };
  public recip: recipes = {
    breakfastRecipe: {
      recipe: null,
      category: ' ',
      id: -1,
    },
    lunchRecipe: {
      recipe: null,
      category: ' ',
      id: -1,
    },
    dinnerRecipe: {
      recipe: null,
      category: ' ',
      id: -1,
    },
  };
  public kcal: number = -1;

  constructor(private recipesService: RecipesService) {}

  public getAllRecipes(): void {
    //retete pentru toate
    this.recipesService
      .getAllRecipes(null, 'mic dejun')
      .subscribe((recipes) => {
        this.fullRecipes.breakfastRecipes = recipes;
      });
    this.recipesService.getAllRecipes(null, 'pranz').subscribe((recipes) => {
      this.fullRecipes.lunchRecipes = recipes;
    });
    this.recipesService.getAllRecipes(null, 'cina').subscribe((recipes) => {
      this.fullRecipes.dinnerRecipes = recipes;
    });
  }

  public getRandomRecipe(data: string) {
    if (data == 'mic dejun') {
      if (
        this.fullRecipes.breakfastRecipes.length ==
        this.recipeId.breakfastIds.length
      )
        this.recipeId.breakfastIds = [];
      let random = -1;
      random = Math.floor(
        Math.random() * this.fullRecipes.breakfastRecipes.length
      );
      while (this.recipeId.breakfastIds.indexOf(random) !== -1) {
        random = Math.floor(
          Math.random() * this.fullRecipes.breakfastRecipes.length
        );
      }
      this.recipeId.breakfastIds.push(random);
      this.recip.breakfastRecipe = {
        recipe: this.fullRecipes.breakfastRecipes[random],
        category: data,
        id: random,
      };
    }
    if (data == 'pranz') {
      if (this.fullRecipes.lunchRecipes.length == this.recipeId.lunchId.length)
        this.recipeId.lunchId = [];
      let random = -1;
      random = Math.floor(Math.random() * this.fullRecipes.lunchRecipes.length);
      while (this.recipeId.lunchId.indexOf(random) !== -1) {
        random = Math.floor(
          Math.random() * this.fullRecipes.lunchRecipes.length
        );
      }
      this.recipeId.lunchId.push(random);
      this.recip.lunchRecipe = {
        recipe: this.fullRecipes.breakfastRecipes[random],
        category: data,
        id: random,
      };
    }
    if (data == 'cina') {
      if (
        this.fullRecipes.dinnerRecipes.length == this.recipeId.dinnerId.length
      )
        this.recipeId.dinnerId = [];
      let random = -1;
      random = Math.floor(
        Math.random() * this.fullRecipes.dinnerRecipes.length
      );
      while (this.recipeId.dinnerId.indexOf(random) !== -1) {
        random = Math.floor(
          Math.random() * this.fullRecipes.dinnerRecipes.length
        );
      }
      this.recipeId.dinnerId.push(random);
      this.recip.dinnerRecipe = {
        recipe: this.fullRecipes.breakfastRecipes[random],
        category: data,
        id: random,
      };
    }
  }

  public getAllRandom(formKcal: number) {
    var found = false;
    this.kcal = 0;
    const shuffledBreakfast = this.fullRecipes.breakfastRecipes.sort(
      (a, b) => 0.5 - Math.random()
    );
    const shuffledLunch = this.fullRecipes.lunchRecipes.sort(
      (a, b) => 0.5 - Math.random()
    );
    const shuffledDinner = this.fullRecipes.dinnerRecipes.sort(
      (a, b) => 0.5 - Math.random()
    );

    shuffledBreakfast.forEach((element) => {
      this.kcal = 0;
      this.kcal += element.kcal;
      this.recip.breakfastRecipe = {
        recipe: element,
        category: 'mic dejun',
        id: element.id,
      };
      shuffledLunch.forEach((element) => {
        this.kcal += element.kcal;
        this.recip.lunchRecipe = {
          recipe: element,
          category: 'pranz',
          id: element.id,
        };
        shuffledDinner.forEach((element) => {
          if (
            this.kcal + element.kcal >= formKcal - 300 &&
            this.kcal + element.kcal <= formKcal
          ) {
            this.kcal += element.kcal;
            this.recip.lunchRecipe = {
              recipe: element,
              category: 'cina',
              id: element.id,
            };
            found = true;
            return;
          }
        });
      });
    });
    this.recipeId.breakfastIds.push(this.recip.breakfastRecipe.id);
    this.recipeId.lunchId.push(this.recip.lunchRecipe.id);
    this.recipeId.dinnerId.push(this.recip.dinnerRecipe.id);
    //sa gasit un meniu random
  }
}

export interface recipes {
  breakfastRecipe: {
    recipe: RecipeItem;
    category: string;
    id: number;
  };
  lunchRecipe: {
    recipe: RecipeItem;
    category: string;
    id: number;
  };
  dinnerRecipe: {
    recipe: RecipeItem;
    category: string;
    id: number;
  };
}
