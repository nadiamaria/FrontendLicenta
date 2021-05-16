import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { RecipeItem } from 'src/app/shared/data/dataModel/recipeItem';
import { RecipesService } from 'src/app/shared/data/RecipesService';
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
  //declar o variabila care sa retina retetele afisate.
  public recipesMenu: RecipeItem[] = []
  public kcal: number;
  private subscriptionButton: Subscription = new Subscription();


  public constructor(
    private recipesService: RecipesService,
    private recipesServices: RecipesService,
    private _snackBar: MatSnackBar,
    private eventBus: EventBusService
  ) {}

  public ngOnInit(): void {
    //setez kcal pe 0 initial
    this.kcal = 0;
    //aduc sesiunea daca exista pentru ca intial this.sesionMenu = [-1, -1, -1];
    this.getSession(); 
    //verific daca a fost populata sesiunea si s-au schimbat valorile initiale
    if (this.sesionMenu[0] != -1 && this.sesionMenu[1] != -1 && this.sesionMenu[2] != -1) {
      //daca s-au schimbat, trimit id-ul pentru ca aduca inapoi reteta si a o afisa
      this.getRecipeById(this.sesionMenu[0], 'mic dejun');
      this.recipeId.breakfastIds.push(this.sesionMenu[0]);
      this.getRecipeById(this.sesionMenu[1], 'pranz');
      this.recipeId.lunchId.push(this.sesionMenu[1]);
      this.getRecipeById(this.sesionMenu[2], 'cina');
      this.recipeId.dinnerId.push(this.sesionMenu[2]);
    }
    else {
      this.recipeId.dinnerId = [];
    }
    //aici fac un subscribe pentru afisarea retetelor
    this.menu.subscribe((value) => {
      if (value.category == 'mic dejun') this.breakfastRecipe = value.recipe;
      if (value.category == 'pranz') this.lunchRecipe = value.recipe;
      if (value.category == 'cina') this.dinnerRecipe = value.recipe;
    });

    //aici fac un subscribe pentru afisarea retetelor
    this.subscriptionButton.add(
      this.eventBus.on('recipe').subscribe((value) => {
        if (value.category == 'mic dejun') this.breakfastRecipe = value.recipe;
        if (value.category == 'pranz') this.lunchRecipe = value.recipe;
        if (value.category == 'cina') this.dinnerRecipe = value.recipe;
      })
    );
  }

  //functie pentru cautarea unei retete dintr-o anumita categorie
  public getRecipes(data: string): void {
    //declar array-ul in care se introduc retetele din tipul respectiv de categorie
    let recipesArray: RecipeItem[];
    //fac o cerere pentru acea categorie de retete
    this.recipesService.getAllRecipes(null, data).subscribe((recipes) => {
      //declar o variabila care ma ajuta pentru a vedea daca a fost gasita o retetea specifica sau nu
      var found = false;
      //declar o variabila pentru ca tine minte de cate ori am parcurs un array
      var times = 0;
      //fac un shuffle pentru retetele din categoria ceruta
      recipesArray = this.shuffle(recipes);
      //verific categoria in care ma aflu
      if (data == 'mic dejun') {
        //verifica daca lungimea array-ului care retine id-urile folosite este egal cu lungimea array-ului intors acum
        if (recipesArray.length == this.recipeId.breakfastIds.length)
          //daca sunt egale, inseamana ca au fost folosite toate retetele disponibile, deci trebuie resetat, dar pastram ultima valoare 
          //prntu a fi siguri ca nu exista sansa de a se repeta
          this.recipeId.breakfastIds = [this.recipeId.breakfastIds[this.recipeId.breakfastIds.length - 1]];
        //verifica pe ce ramura pornim. cu sau fara numar de kcal.
        if (this.smartForm.value['kcal'] == '' || this.smartForm.value['kcal'] == ' ' || this.smartForm.value['kcal'] == 0 || this.smartForm.value['kcal'] == null) {
          //parcurg array-ul
          for (var element of recipesArray) {
            //daca nu regasesc id-ul retetei respective in array-ul de id-uri folosite
            if (this.recipeId.breakfastIds.indexOf(element.id) == -1) {
              //am gasit o reteta corespunzatoare
              found = true;
              //salvam informatiile retetei intr-un array separat
              this.recip.breakfastRecipe = {
                recipe: element,
                category: data,
                id: element.id,
              };
              break;
            }
          }
        } else
          //atata timp cat nu a fost gasita nici-o reteta si avem numar si kcal si inca nu am trecut de 2 ori prin sirul de retete
          while (!found && times != 2) {
            //trec prin toate elementele din reteta
            for (var element of recipesArray) {
              //si verific daca, reteta nu a mai fost afisata de la ultima golire si daca kcal adunate sunt mai mari decat nr de kcal -300
              //si daca sunt mai mici totusi decat kcal impuse
              if (
                this.recipeId.breakfastIds.indexOf(element.id) == -1 &&
                this.kcal + element.kcal >=
                  this.smartForm.value['kcal'] - 300 &&
                this.kcal + element.kcal <= this.smartForm.value['kcal']
              ) {
                //daca a fost gasita o reteta potrivita
                found = true;
                this.recip.breakfastRecipe = {
                  recipe: element,
                  category: data,
                  id: element.id,
                };
                break;
              }
              //daca ultima reteta din array este egala cu reteta din momentul acesta si inca nu a fost gasita o retatea
              if (recipesArray[recipesArray.length - 1] == element && !found) {
                //golesc array-ul
                this.recipeId.breakfastIds = [];
                //si maresc timpul
                times += 1;
              }
            }
          }
        //daca reteta a fost gasita
        if (found == true) {
          this.recipeId.breakfastIds.push(this.recip.breakfastRecipe.id);
          this.kcal += this.recip.breakfastRecipe.recipe.kcal;
          if(this.smartForm.value['kcal'] == '' || this.smartForm.value['kcal'] == ' ' || this.smartForm.value['kcal'] == 0 || this.smartForm.value['kcal'] == null)
          this.eventBus.emit({ name: 'recipe', value: this.recip.breakfastRecipe});
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
        if (this.smartForm.value['kcal'] == '' || this.smartForm.value['kcal'] == ' ' || this.smartForm.value['kcal'] == 0 || this.smartForm.value['kcal'] == null) {
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
        if (recipesArray.length <= this.recipeId.dinnerId.length)
          this.recipeId.dinnerId = [];
        if (this.smartForm.value['kcal'] == '' || this.smartForm.value['kcal'] == ' ' || this.smartForm.value['kcal'] == 0 || this.smartForm.value['kcal'] == null) {
          console.log('buna');
          console.log(recipesArray.length);
          console.log(this.recipeId.dinnerId.length);
          console.log(recipesArray)

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
          debugger
          console.log(this.recip.dinnerRecipe.id);
          this.recipeId.dinnerId.push(this.recip.dinnerRecipe.id);

          console.log(this.recip.dinnerRecipe);
          this.kcal += this.recip.dinnerRecipe.recipe.kcal;
          if(this.smartForm.value['kcal'] == '')
          this.eventBus.emit({ name: 'recipe', value: this.recip.dinnerRecipe});
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
      this.buttonPressed = true;
      this.getRecipes('mic dejun');
      this.getRecipes('pranz');
      this.getRecipes('cina');
    } else if (
      this.smartForm.value['kcal'] < 400
    ) {
      this.openSnackBar(
        'Introduceti va rog valoare pentru calorii intre 400 si 3000.'
      );
    } else {
      //buttonul de restMenu a fost apasat
      this.buttonPressed = true;
      //aduc toate retetele disponibile
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

  //functie pentru aducerea retetelor in functie de kcal
  public getAllRandom(formKcal: number) {
    var provKcal = this.kcal;
    //initial nu am retete gasite
    var found = false;
    this.kcal = 0;
    //fac shuffle la retete
    const shuffledBreakfast = this.shuffle(this.fullRecipes.breakfastRecipes);
    const shuffledLunch = this.shuffle(this.fullRecipes.lunchRecipes);
    const shuffledDinner = this.shuffle(this.fullRecipes.dinnerRecipes);

    //verific sa golesc array-urile pline
    if (
      this.recipeId.breakfastIds.length ==
      this.fullRecipes.breakfastRecipes.length
    )
      this.recipeId.breakfastIds = [];
    if (this.recipeId.lunchId.length == this.fullRecipes.lunchRecipes.length)
      this.recipeId.lunchId = [];
    if (this.recipeId.dinnerId.length == this.fullRecipes.dinnerRecipes.length)
      this.recipeId.dinnerId = [];

    //parcurg pe rand cele 3 arrayuri  
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
        for (var element of shuffledLunch) {
          if (found == true) break;
          if (this.recipeId.lunchId.indexOf(element.id) == -1) {
            if(shuffledLunch[shuffledLunch.indexOf(element)-1])
            this.kcal -= shuffledLunch[shuffledLunch.indexOf(element)-1]
            this.kcal += element.kcal;
            this.recip.lunchRecipe = {
              recipe: element,
              category: 'pranz',
              id: element.id,
            };
            for (var element of shuffledDinner)
              if (this.recipeId.dinnerId.indexOf(element.id) == -1) {
                if (
                  this.kcal + element.kcal >= formKcal - 400 &&
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
          }
        }
      }
    }
    if(found == false){
      this.getSession(); 
      //verific daca a fost populata sesiunea si s-au schimbat valorile initiale
      if (this.sesionMenu[0] != -1 && this.sesionMenu[1] != -1 && this.sesionMenu[2] != -1) {
        //daca s-au schimbat, trimit id-ul pentru ca aduca inapoi reteta si a o afisa
        this.getRecipeById(this.sesionMenu[0], 'mic dejun');
        this.recipeId.breakfastIds.push(this.sesionMenu[0]);
        this.getRecipeById(this.sesionMenu[1], 'pranz');
        this.recipeId.lunchId.push(this.sesionMenu[1]);
        this.getRecipeById(this.sesionMenu[2], 'cina');
        this.recipeId.dinnerId.push(this.sesionMenu[2]);
      }
      this.kcal = provKcal;
    this.openSnackBar(
      'Nu s-au putut gasi retete pentru acest numar de kcal'
    );} else {
    this.recipeId.breakfastIds.push(this.recip.breakfastRecipe.id);
    this.recipeId.lunchId.push(this.recip.lunchRecipe.id);
    this.recipeId.dinnerId.push(this.recip.dinnerRecipe.id);}
    //sa gasit un meniu random
  }

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
