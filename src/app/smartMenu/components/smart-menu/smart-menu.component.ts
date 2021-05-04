import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { RecipesService } from 'src/app/shared/data/RecipesService';
import { RandomKcalService } from 'src/app/shared/services/random-kcal.service';

@Component({
  selector: 'app-smart-menu',
  templateUrl: './smart-menu.component.html',
  styleUrls: ['./smart-menu.component.scss'],
})
export class SmartMenuComponent implements OnInit, OnDestroy {
  //GetRandomClassic
  public smartForm = new FormGroup({
    kcal: new FormControl('000'),
  });
  public recipeId = {
    breakfastIds: [],
    lunchId: [],
    dinnerId: [],
    randomId: [],
  };
  public sesionMenu: any[] = [-1, -1, -1];
  public menu: Subject<menu> = new Subject<menu>();
  public breakfastRecipe: RecipeItem;
  public lunchRecipe: RecipeItem;
  public dinnerRecipe: RecipeItem;

  //GetRandomKcal
  public fullRecipes = {
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
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

  public constructor(
    private recipesService: RecipesService,
    private recipesServices: RecipesService
  ) {}

  public ngOnInit(): void {
    this.getSession();
    if (this.sesionMenu[0] != '-1') {
      this.getRecipeById(this.sesionMenu[0], 'mic dejun');
      this.recipeId.breakfastIds.push(this.sesionMenu[0]);
      this.getRecipeById(this.sesionMenu[1], 'pranz');
      this.recipeId.lunchId.push(this.sesionMenu[1]);
      this.getRecipeById(this.sesionMenu[2], 'cina');
      this.recipeId.dinnerId.push(this.sesionMenu[2]);
    } else {
      // this.getRecipes('mic dejun');
      // this.getRecipes('pranz');
      // this.getRecipes('cina');
    }
    this.menu.subscribe((value) => {
      if (value.category == 'mic dejun') this.breakfastRecipe = value.recipe;
      if (value.category == 'pranz') this.lunchRecipe = value.recipe;
      if (value.category == 'cina') this.dinnerRecipe = value.recipe;
    });
  }

  public getRecipes(data: string): void {
    let recipesArray: RecipeItem[];
    if (this.smartForm.value['kcal'] == '000') {
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
          const recipe: menu = {
            recipe: recipesArray[random],
            category: data,
          };
          this.menu.next(recipe);
          this.sesionMenu[0] = random;
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
        }
        this.setSession();
      });
    } else {
    }
  }

  public getRecipeById(id, category): void {
    this.recipesServices.getAllRecipes(null, category).subscribe((data) => {
      const recipe: menu = {
        recipe: data[id],
        category: category,
      };
      this.menu.next(recipe);
    });
  }

  public async resetMenu(): Promise<void> {
    if (this.smartForm.value['kcal'] == '000') {
      console.log('clasic');
      this.getRecipes('mic dejun');
      this.getRecipes('pranz');
      this.getRecipes('cina');
    } else {
      console.log('kcal');
      console.log(this.smartForm.value['kcal']);
      await this.getAllRecipes();
      this.getAllRandom(this.smartForm.value['kcal']);
      console.log(this.recip.breakfastRecipe.recipe);
      const recipe: menu = {
        recipe: this.recip.breakfastRecipe.recipe,
        category: this.recip.breakfastRecipe.category,
      };
      this.menu.next(recipe);
      const recipe2: menu = {
        recipe: this.recip.lunchRecipe.recipe,
        category: this.recip.lunchRecipe.category,
      };
      this.menu.next(recipe2);
      const recipe3: menu = {
        recipe: this.recip.dinnerRecipe.recipe,
        category: this.recip.dinnerRecipe.category,
      };
      this.menu.next(recipe3);
      debugger;
    }
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
    sessionStorage.setItem('menu', this.sesionMenu.toString());
  }

  public getSession(): void {
    const data = sessionStorage.getItem('menu');
    if (data && data[0] != '-1') {
      const menu = data.split(',');
      this.sesionMenu = menu;
    }
  }

  //GetRandomKcal

  public async getAllRecipes(): Promise<void> {
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

    await this.delay(0.5);
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
        recipe: this.fullRecipes.lunchRecipes[random],
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
    console.log(this.fullRecipes);

    var found = false;
    this.kcal = 0;
    const shuffledBreakfast = this.shuffle(this.fullRecipes.breakfastRecipes);
    const shuffledLunch = this.shuffle(this.fullRecipes.lunchRecipes);
    const shuffledDinner = this.shuffle(this.fullRecipes.dinnerRecipes);

    if (
      this.recipeId.breakfastIds.length ==
      this.fullRecipes.breakfastRecipes.length
    )
      this.recipeId.breakfastIds = [];
    if (this.recipeId.lunchId.length == this.fullRecipes.lunchRecipes.length)
      this.recipeId.lunchId = [];
    if (this.recipeId.dinnerId.length == this.fullRecipes.dinnerRecipes.length)
      this.recipeId.dinnerId = [];
    // debugger;
    //nu merge return sa iasa din functie, oare trebuie cu for?
    // shuffledBreakfast.forEach((element) => {
    for (var element of shuffledBreakfast) {
      if (found == true) break;
      if (this.recipeId.breakfastIds.indexOf(element.id) == -1) {
        this.kcal = 0;
        this.kcal += element.kcal;
        this.recip.breakfastRecipe = {
          recipe: element,
          category: 'mic dejun',
          id: element.id,
        };
        // shuffledLunch.forEach((element) => {
        for (var element of shuffledLunch) {
          if (found == true) break;
          if (this.recipeId.lunchId.indexOf(element.id) == -1) {
            this.kcal += element.kcal;
            this.recip.lunchRecipe = {
              recipe: element,
              category: 'pranz',
              id: element.id,
            };
            // shuffledDinner.forEach((element) => {
            for (var element of shuffledDinner)
              if (this.recipeId.dinnerId.indexOf(element.id) == -1) {
                if (
                  this.kcal + element.kcal >= formKcal - 300 &&
                  this.kcal + element.kcal <= formKcal
                ) {
                  this.kcal += element.kcal;
                  this.recip.dinnerRecipe = {
                    recipe: element,
                    category: 'cina',
                    id: element.id,
                  };
                  found = true;
                  break;
                }
              }

            // });
          }
        }
        // });
      }
    }
    // });
    this.recipeId.breakfastIds.push(this.recip.breakfastRecipe.id);
    this.recipeId.lunchId.push(this.recip.lunchRecipe.id);
    this.recipeId.dinnerId.push(this.recip.dinnerRecipe.id);
    //sa gasit un meniu random
  }

  //END
  public shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  public delay(n) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n * 1000);
    });
  }

  public ngOnDestroy(): void {
    this.setSession();
  }
}

export interface menu {
  recipe: RecipeItem;
  category: string;
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
