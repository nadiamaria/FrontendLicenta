import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { RecipesService } from 'src/app/shared/data/RecipesService';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { RandomKcalService } from 'src/app/shared/services/random-kcal.service';
import { EventBusService } from 'src/app/shared/services/event-bus.service';


@Component({
  selector: 'app-smart-menu',
  templateUrl: './smart-menu.component.html',
  styleUrls: ['./smart-menu.component.scss'],
})
export class SmartMenuComponent implements OnInit, OnDestroy {
  //GetRandomClassic
  public smartForm = new FormGroup({
    kcal: new FormControl(''),
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
  public buttonPressed: boolean = false;
  private subscription: Subscription = new Subscription();

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
  public kcal: number;
  private subscriptionButton: Subscription = new Subscription();


  public constructor(
    private recipesService: RecipesService,
    private recipesServices: RecipesService,
    private _snackBar: MatSnackBar,
    private eventBus: EventBusService
  ) {}

  public ngOnInit(): void {
    this.kcal = 0;
    //caut daca avem ceva pe sesiune pentru a le afisa
    this.getSession();
    if (this.sesionMenu) {
      this.getRecipeById(this.sesionMenu[0], 'mic dejun');
      this.recipeId.breakfastIds.push(this.sesionMenu[0]);
      this.getRecipeById(this.sesionMenu[1], 'pranz');
      this.recipeId.lunchId.push(this.sesionMenu[1]);
      this.getRecipeById(this.sesionMenu[2], 'cina');
      this.recipeId.dinnerId.push(this.sesionMenu[2]);
    }
    this.menu.subscribe((value) => {
      if (value.category == 'mic dejun') this.breakfastRecipe = value.recipe;
      if (value.category == 'pranz') this.lunchRecipe = value.recipe;
      if (value.category == 'cina') this.dinnerRecipe = value.recipe;
    });

<<<<<<< HEAD
    this.subscriptionButton.add(
      this.eventBus.on('recipe').subscribe((value) => {
        // this.getSession();
        // if(this.sesionMenu[0] == -1){
        if (value.category == 'mic dejun') this.breakfastRecipe = value.recipe;
        if (value.category == 'pranz') this.lunchRecipe = value.recipe;
        if (value.category == 'cina') this.dinnerRecipe = value.recipe;
=======
    this.subscription.add(
      this.eventBus.on('RecipeEvent').subscribe((data) => {
        if (data.category == 'mic dejun') this.breakfastRecipe = data.recipe;
        if (data.category == 'pranz') this.lunchRecipe = data.recipe;
        if (data.category == 'cina') this.dinnerRecipe = data.recipe;
>>>>>>> 380cbd3dbe57b32a16c6bda118f209c66e2bbf7c
      })
    );
  }

  public getRecipes(data: string): void {
    let recipesArray: RecipeItem[];
    this.recipesService.getAllRecipes(null, data).subscribe((recipes) => {
      // if (data == 'mic dejun') {
      //   //aduc retetele de tip mic de jun care sunt mereu in acceasi ordine
      //   recipesArray = this.shuffle(recipes);
      //   //verific daca sa umplut assay-ul cu id-uri de retete, daca sa umplut, il golesc
      //   if (recipesArray.length == this.recipeId.breakfastIds.length)
      //     this.recipeId.breakfastIds = [];
      //   //setez random initial
      //   let random = -1;
      //   //fac random number cu arrayurile din recipe array
      //   random = Math.floor(Math.random() * recipesArray.length);
      //   //atata timp cat exista id-ul reteti de pe pozitia respectiva, caut alt numar
      //   while (
      //     this.recipeId.breakfastIds.indexOf(recipesArray[random].id) !== -1
      //   ) {
      //     random = Math.floor(Math.random() * recipesArray.length);
      //   }
      //   //dau push la id
      //   this.recipeId.breakfastIds.push(recipesArray[random].id);
      //   const recipe: menu = {
      //     recipe: recipesArray[random],
      //     category: data,
      //   };
      //   //iau reteta de la id-ul respectiv
      //   // this.recip.breakfastRecipe = {
      //   //   recipe: recipesArray[random],
      //   //   category: data,
      //   //   id: recipesArray[random].id,
      //   // };
      //   this.kcal += recipesArray[random].kcal;
      //   console.log(recipe);
      //   this.menu.next(recipe);
      //   this.sesionMenu[0] = recipesArray[random].id;
      // }
      // if (data == 'mic dejun') {
      //   //aduc retetele de tip mic de jun care sunt mereu in acceasi ordine
      //   recipesArray = recipes;
      //   //verific daca sa umplut assay-ul cu id-uri de retete, daca sa umplut, il golesc
      //   if (recipesArray.length == this.recipeId.breakfastIds.length)
      //     this.recipeId.breakfastIds = [];
      //   //setez random initial
      //   let random = -1;
      //   //fac random number cu arrayurile din recipe array
      //   random = Math.floor(Math.random() * recipesArray.length);
      //   while (this.recipeId.breakfastIds.indexOf(random) !== -1) {
      //     random = Math.floor(Math.random() * recipesArray.length);
      //   }
      //   //dau push la id
      //   this.recipeId.breakfastIds.push(random);
      //   //iau reteta de la id-ul respectiv
      //   const recipe: menu = {
      //     recipe: recipesArray[random],
      //     category: data,
      //   };
      //   this.kcal += recipe.recipe.kcal;
      //   this.menu.next(recipe);
      //   this.sesionMenu[0] = random;
      // }
      // if (data == 'pranz') {
      //   recipesArray = this.shuffle(recipes);
      //   if (recipesArray.length == this.recipeId.lunchId.length)
      //     this.recipeId.lunchId = [];
      //   let random = -1;
      //   random = Math.floor(Math.random() * recipesArray.length);
      //   while (this.recipeId.lunchId.indexOf(recipesArray[random].id) !== -1) {
      //     random = Math.floor(Math.random() * recipesArray.length);
      //   }
      //   this.recipeId.lunchId.push(recipesArray[random].id);

      //   this.recip.lunchRecipe = {
      //     recipe: recipesArray[random],
      //     category: data,
      //     id: recipesArray[random].id,
      //   };
      //   this.kcal += recipesArray[random].kcal;
      //   this.menu.next(this.recip.lunchRecipe);
      //   this.sesionMenu[1] = recipesArray[random].id;
      // }
      var i = 0;
      var found = false;
      var times = 0;
      recipesArray = this.shuffle(recipes);
      if (data == 'mic dejun') {
        if (recipesArray.length == this.recipeId.breakfastIds.length)
          this.recipeId.breakfastIds = [];
        if (this.smartForm.value['kcal'] == '') {
          for (var element of recipesArray) {
            if (this.recipeId.breakfastIds.indexOf(element.id) == -1) {
              found = true;
              this.recip.breakfastRecipe = {
                recipe: element,
                category: data,
                id: element.id,
              };
              break;
            }
          }
        } else
          while (!found && times != 2) {
            //verific daca arrayul de id-uri folosite era gold deja ca nu faca de 2 ori iteratia
            for (var element of recipesArray) {
              if (
                this.recipeId.breakfastIds.indexOf(element.id) == -1 &&
                this.kcal + element.kcal >=
                  this.smartForm.value['kcal'] - 300 &&
                this.kcal + element.kcal <= this.smartForm.value['kcal']
              ) {
                found = true;
                this.recip.breakfastRecipe = {
                  recipe: element,
                  category: data,
                  id: element.id,
                };
                break;
              }
              if (recipesArray[recipesArray.length - 1] == element && !found) {
                this.recipeId.breakfastIds = [];
                times += 1;
              }
            }
          }

        //cleanup
        if (found == true) {
          this.recipeId.breakfastIds.push(this.recip.breakfastRecipe.id);
          this.kcal += this.recip.breakfastRecipe.recipe.kcal;
<<<<<<< HEAD
          if(this.smartForm.value['kcal'] == '')
          this.eventBus.emit({ name: 'recipe', value: this.recip.breakfastRecipe});
=======
          if (this.sesionMenu[0] == -1) {
            this.eventBus.emit({
              name: 'RecipeEvent',
              value: this.recip.breakfastRecipe,
            });
          }
>>>>>>> 380cbd3dbe57b32a16c6bda118f209c66e2bbf7c
          this.menu.next(this.recip.breakfastRecipe);
          this.sesionMenu[0] = this.recip.breakfastRecipe.recipe.id;
        } else {
          this.openSnackBar(
            'Nu sa putut gasi reteta pentru acest numar de calorii!1'
          );
        }
      }
      if (data == 'pranz') {
        if (recipesArray.length == this.recipeId.lunchId.length)
          this.recipeId.lunchId = [];
        // let random = -1;
        // random = Math.floor(Math.random() * recipesArray.length);
        if (this.smartForm.value['kcal'] == '') {
          for (var element of recipesArray) {
            if (this.recipeId.lunchId.indexOf(element.id) == -1) {
              var found = true;
              this.recip.lunchRecipe = {
                recipe: element,
                category: data,
                id: element.id,
              };
              break;
            }
          }
        } else
          while (!found && times != 2) {
            //verific daca arrayul de id-uri folosite era gold deja ca nu faca de 2 ori iteratia

            for (var element of recipesArray) {
              if (
                this.recipeId.lunchId.indexOf(element.id) == -1 &&
                this.kcal + element.kcal >=
                  this.smartForm.value['kcal'] - 300 &&
                this.kcal + element.kcal <= this.smartForm.value['kcal']
              ) {
                found = true;
                this.recip.lunchRecipe = {
                  recipe: element,
                  category: data,
                  id: element.id,
                };
                break;
              }
              if (recipesArray[recipesArray.length - 1] == element && !found) {
                this.recipeId.lunchId = [];
                times += 1;
              }
            }
          }

        //cleanup
        if (found == true) {
          this.recipeId.dinnerId.push(this.recip.lunchRecipe.id);

          this.kcal += this.recip.lunchRecipe.recipe.kcal;
          if(this.smartForm.value['kcal'] == '')
          this.eventBus.emit({ name: 'recipe', value: this.recip.lunchRecipe});
          this.menu.next(this.recip.lunchRecipe);
          this.sesionMenu[1] = this.recip.lunchRecipe.recipe.id;
        } else {
          this.openSnackBar(
            'Nu sa putut gasi reteta pentru acest numar de calorii!2'
          );
        }
      }
      if (data == 'cina') {
        if (recipesArray.length == this.recipeId.dinnerId.length)
          this.recipeId.dinnerId = [];
        // let random = -1;
        // random = Math.floor(Math.random() * recipesArray.length);
        if (this.smartForm.value['kcal'] == '') {
          for (var element of recipesArray) {
            if (this.recipeId.dinnerId.indexOf(element.id) == -1) {
              found = true;
              this.recip.dinnerRecipe = {
                recipe: element,
                category: data,
                id: element.id,
              };
              break;
            }
          }
        } else
          while (!found && times != 2) {
            //verific daca arrayul de id-uri folosite era gold deja ca nu faca de 2 ori iteratia

            for (var element of recipesArray) {
              if (
                this.recipeId.dinnerId.indexOf(element.id) == -1 &&
                this.kcal + element.kcal >=
                  this.smartForm.value['kcal'] - 300 &&
                this.kcal + element.kcal <= this.smartForm.value['kcal']
              ) {
                found = true;
                this.recip.dinnerRecipe = {
                  recipe: element,
                  category: data,
                  id: element.id,
                };
                break;
              }
              if (recipesArray[recipesArray.length - 1] == element && !found) {
                this.recipeId.dinnerId = [];
                times += 1;
              }
            }
          }

        //cleanup
        if (found == true) {
          this.recipeId.dinnerId.push(this.recip.dinnerRecipe.id);
<<<<<<< HEAD
          console.log(this.recip.dinnerRecipe);
          this.kcal += this.recip.dinnerRecipe.recipe.kcal;
          if(this.smartForm.value['kcal'] == '')
          this.eventBus.emit({ name: 'recipe', value: this.recip.dinnerRecipe});
=======
          this.kcal += this.recip.dinnerRecipe.recipe.kcal;
          if (this.sesionMenu[2] == -1) {
            this.eventBus.emit({
              name: 'RecipeEvent',
              value: this.recip.dinnerRecipe,
            });
          }
>>>>>>> 380cbd3dbe57b32a16c6bda118f209c66e2bbf7c
          this.menu.next(this.recip.dinnerRecipe);
          this.sesionMenu[2] = this.recip.dinnerRecipe.recipe.id;
        } else {
          this.openSnackBar(
            'Nu sa putut gasi reteta pentru acest numar de calorii!3'
          );
        }
      }
      this.setSession();
    });
  }

  public getRecipeById(id, category): void {
    this.recipesServices.getAllRecipes(null, category).subscribe((data) => {
      //trec prin toata data
      var recipe: menu;
      for (var element of data) {
        if (element.id == id) {
          recipe = {
            recipe: element,
            category: category,
          };
          this.kcal = this.kcal + element.kcal;
        }
      }
      this.menu.next(recipe);
    });
  }

  public async resetMenu(): Promise<void> {
    this.kcal = 0;
    if (this.smartForm.value['kcal'] == '' || this.smartForm.value['kcal'] == null || this.smartForm.value['kcal'] == 0 || this.smartForm.value['kcal'] == ' ') {
      console.log('buna');
      this.buttonPressed = true;
      this.getRecipes('mic dejun');
      this.getRecipes('pranz');
      this.getRecipes('cina');
    } else if (
      this.smartForm.value['kcal'] < 500 &&
      this.smartForm.value['kcal'] != ''
    ) {
      this.openSnackBar(
        'Introduceti va rog valoare pentru calorii intre 500 si 3000.'
      );
    } else {
      this.buttonPressed = true;
      await this.getAllRecipes();
      this.getAllRandom(this.smartForm.value['kcal']);
      const recipe: menu = {
        recipe: this.recip.breakfastRecipe.recipe,
        category: this.recip.breakfastRecipe.category,
      };
      this.sesionMenu[0] = recipe.recipe.id;
      this.menu.next(recipe);
      const recipe2: menu = {
        recipe: this.recip.lunchRecipe.recipe,
        category: this.recip.lunchRecipe.category,
      };
      this.sesionMenu[1] = recipe2.recipe.id;
      this.menu.next(recipe2);
      const recipe3: menu = {
        recipe: this.recip.dinnerRecipe.recipe,
        category: this.recip.dinnerRecipe.category,
      };
      this.sesionMenu[2] = recipe3.recipe.id;
      this.menu.next(recipe3);
    }
  }

  public resetBreakfast(): void {
    debugger;
    this.kcal = this.kcal - this.breakfastRecipe.kcal;
    this.getRecipes('mic dejun');
  }

  public resetLunch(): void {
    this.kcal = this.kcal - this.lunchRecipe.kcal;
    this.getRecipes('pranz');
  }

  public resetDinner(): void {
    this.kcal = this.kcal - this.dinnerRecipe.kcal;
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

  // public getRandomRecipe(data: string) {
  //   if (data == 'mic dejun') {
  //     if (
  //       this.fullRecipes.breakfastRecipes.length ==
  //       this.recipeId.breakfastIds.length
  //     )
  //       this.recipeId.breakfastIds = [];
  //     let random = -1;
  //     random = Math.floor(
  //       Math.random() * this.fullRecipes.breakfastRecipes.length
  //     );
  //     while (this.recipeId.breakfastIds.indexOf(random) !== -1) {
  //       random = Math.floor(
  //         Math.random() * this.fullRecipes.breakfastRecipes.length
  //       );
  //     }
  //     this.recipeId.breakfastIds.push(random);
  //     this.recip.breakfastRecipe = {
  //       recipe: this.fullRecipes.breakfastRecipes[random],
  //       category: data,
  //       id: random,
  //     };
  //   }
  //   if (data == 'pranz') {
  //     if (this.fullRecipes.lunchRecipes.length == this.recipeId.lunchId.length)
  //       this.recipeId.lunchId = [];
  //     let random = -1;
  //     random = Math.floor(Math.random() * this.fullRecipes.lunchRecipes.length);
  //     while (this.recipeId.lunchId.indexOf(random) !== -1) {
  //       random = Math.floor(
  //         Math.random() * this.fullRecipes.lunchRecipes.length
  //       );
  //     }
  //     this.recipeId.lunchId.push(random);
  //     this.recip.lunchRecipe = {
  //       recipe: this.fullRecipes.lunchRecipes[random],
  //       category: data,
  //       id: random,
  //     };
  //   }
  //   if (data == 'cina') {
  //     if (
  //       this.fullRecipes.dinnerRecipes.length == this.recipeId.dinnerId.length
  //     )
  //       this.recipeId.dinnerId = [];
  //     let random = -1;
  //     random = Math.floor(
  //       Math.random() * this.fullRecipes.dinnerRecipes.length
  //     );
  //     while (this.recipeId.dinnerId.indexOf(random) !== -1) {
  //       random = Math.floor(
  //         Math.random() * this.fullRecipes.dinnerRecipes.length
  //       );
  //     }
  //     this.recipeId.dinnerId.push(random);
  //     this.recip.dinnerRecipe = {
  //       recipe: this.fullRecipes.breakfastRecipes[random],
  //       category: data,
  //       id: random,
  //     };
  //   }
  // }

  public getAllRandom(formKcal: number) {
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

  public openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 10000,
    });
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
