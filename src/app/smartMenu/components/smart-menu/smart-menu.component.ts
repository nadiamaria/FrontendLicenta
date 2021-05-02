import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { RecipesService } from 'src/app/shared/data/RecipesService';

@Component({
  selector: 'app-smart-menu',
  templateUrl: './smart-menu.component.html',
  styleUrls: ['./smart-menu.component.scss'],
})
export class SmartMenuComponent implements OnInit, OnDestroy {
  //last generated menu? salvat unde?
  public recipeId = {
    breakfastIds: [],
    lunchId: [],
    dinnerId: [],
  };
  public sesionMenu: any[] = [-1, -1, -1];
  public menu: Subject<menu> = new Subject<menu>();
  public breakfastRecipe: RecipeItem;
  public lunchRecipe: RecipeItem;
  public dinnerRecipe: RecipeItem;

  public constructor(
    private recipesService: RecipesService,
    private recipesServices: RecipesService
  ) {}

  public ngOnInit(): void {
    this.getSession();
    if (this.sesionMenu[0] != '-1') {
      this.getRecipeById(this.sesionMenu);
    } else {
      this.getRecipes('mic dejun');
      this.getRecipes('pranz');
      this.getRecipes('cina');
    }
    this.menu.subscribe((value) => {
      if (value.category == 'mic dejun') this.breakfastRecipe = value.recipe;
      if (value.category == 'pranz') this.lunchRecipe = value.recipe;
      if (value.category == 'cina') this.dinnerRecipe = value.recipe;
    });
  }

  public getRecipes(data: string): void {
    let recipesArray: RecipeItem[];
    this.recipesService.getAllRecipes(null, data).subscribe((recipes) => {
      if (data == 'mic dejun') {
        //aduc retetele de tip mic de jun care sunt mereu in acceasi ordine
        recipesArray = recipes;
        //verific daca sa umplut assay-ul cu id-uri de retete, daca sa umplut, il golesc
        if (recipesArray.length == this.recipeId.breakfastIds.length)
          this.recipeId.breakfastIds = [];
        //setez random initial
        let random = -1;
        //fac random number cu arrayurile din recipe array
        random = Math.floor(Math.random() * recipesArray.length);
        while (this.recipeId.breakfastIds.indexOf(random) !== -1) {
          random = Math.floor(Math.random() * recipesArray.length);
        }
        //dau push la id
        this.recipeId.breakfastIds.push(random);
        //iau reteta de la id-ul respectiv
        // this.breakfastRecipe = recipesArray[random];
        const recipe: menu = {
          recipe: recipesArray[random],
          category: data,
        };
        this.menu.next(recipe);
        this.sesionMenu[0] = random;
        this.setSession();
      }
      if (data == 'pranz') {
        recipesArray = recipes;
        if (recipesArray.length == this.recipeId.lunchId.length)
          this.recipeId.lunchId = [];
        let random = -1;
        random = Math.floor(Math.random() * recipesArray.length);
        while (this.recipeId.lunchId.indexOf(random) !== -1) {
          random = Math.floor(Math.random() * recipesArray.length);
        }
        this.recipeId.lunchId.push(random);
        const recipe: menu = {
          recipe: recipesArray[random],
          category: data,
        };
        this.menu.next(recipe);
        this.sesionMenu[1] = random;
        this.setSession();
      }
      if (data == 'cina') {
        recipesArray = recipes;
        if (recipesArray.length == this.recipeId.dinnerId.length)
          this.recipeId.dinnerId = [];
        let random = -1;
        random = Math.floor(Math.random() * recipesArray.length);
        while (this.recipeId.dinnerId.indexOf(random) !== -1) {
          random = Math.floor(Math.random() * recipesArray.length);
        }
        this.recipeId.dinnerId.push(random);
        const recipe: menu = {
          recipe: recipesArray[random],
          category: data,
        };
        this.menu.next(recipe);
        this.sesionMenu[2] = random;
        this.setSession();
      }
    });
  }

  public getRecipeById(id: any[]): void {
    // this.recipeId.lunchId.push(random);

    this.recipesServices.getAllRecipes(null, 'mic dejun').subscribe((data) => {
      const recipe: menu = {
        recipe: data[id[0]],
        category: 'mic dejun',
      };
      this.menu.next(recipe);
    });
    this.recipesServices.getAllRecipes(null, 'pranz').subscribe((data) => {
      const recipe: menu = {
        recipe: data[id[1]],
        category: 'pranz',
      };
      this.menu.next(recipe);
    });
    this.recipesServices.getAllRecipes(null, 'cina').subscribe((data) => {
      const recipe: menu = {
        recipe: data[id[2]],
        category: 'cina',
      };
      this.menu.next(recipe);
    });
  }

  public resetMenu(): void {
    this.getRecipes('mic dejun');
    this.getRecipes('pranz');
    this.getRecipes('cina');
  }

  public resetBreakfast(): void {
    this.getRecipes('mic dejun');
  }

  public resetLunch(): void {
    this.getRecipes('pranz');
  }

  public resetDinner(): void {
    this.getRecipes('cina');
  }

  public setSession(): void {
    // if (this.breakfastRecipe) this.sesionMenu[0] = this.breakfastRecipe.id;
    // if (this.lunchRecipe) this.sesionMenu[1] = this.lunchRecipe.id;
    // if (this.dinnerRecipe) this.sesionMenu[2] = this.dinnerRecipe.id;
    // console.log('mda');
    sessionStorage.setItem('menu', this.sesionMenu.toString());
  }

  public getSession(): void {
    const data = sessionStorage.getItem('menu');
    if (data && data[0] != '-1') {
      const menu = data.split(',');
      this.sesionMenu = menu;
    }
  }

  public ngOnDestroy(): void {
    this.setSession();
  }
}

export interface menu {
  recipe: RecipeItem;
  category: string;
}
