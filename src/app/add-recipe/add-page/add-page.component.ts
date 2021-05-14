import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CategoryService } from 'src/app/shared/data/CategoryService';
import { CategoryItem } from 'src/app/shared/data/dataModel/categoryItem';
import { IngredientsItem } from 'src/app/shared/data/dataModel/ingredientItem';
import { insertRecipesIngredientsItem } from 'src/app/shared/data/dataModel/insertRecipeIngerdientDto';
import { insertRecipeItemDto } from 'src/app/shared/data/dataModel/insertRecipeItemDto';
import { RecipesIngredientsItem } from 'src/app/shared/data/dataModel/RecipesIngredientsItem';
import { TypeItem } from 'src/app/shared/data/dataModel/typeItem';
import { IngredientsService } from 'src/app/shared/data/IngredientsService';
import { RecipesIngredientsService } from 'src/app/shared/data/RecipesIngredientsService';
import { RecipesService } from 'src/app/shared/data/RecipesService';
import { TypeService } from 'src/app/shared/data/TypeService';
import { EventBusService } from 'src/app/shared/services/event-bus.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  public myRecipeGroup: FormGroup;
  public ingredients: IngredientsItem[];
  public categorys: CategoryItem[];
  public types: TypeItem[];
  public group = {};
  public nrIngredients = [];
  public nr = 0;
  public ingredientsInput: Subject<any> = new Subject<any>();
  private subscription: Subscription = new Subscription();
  private subscriptionButton: Subscription = new Subscription();
  public foundRecipe: string;
  public recipeId: number = -1;
  public buttonPressed: boolean = false;
  public recipeIngredientItem: insertRecipesIngredientsItem = {
    unit_mas: ' ',
    cant_ingr: -1,
    ingredientId: -1,
    recipeId: -1,
  };
  public valueChangeRecipe: number = 0;

  public constructor(
    private ingredientsService: IngredientsService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private recipesService: RecipesService,
    private recipeIngredientsService: RecipesIngredientsService,
    private _snackBar: MatSnackBar,
    private eventBus: EventBusService
  ) {}

  public ngOnInit(): void {
    this.subscriptionButton.add(
      this.eventBus.on('sendButtonPressed').subscribe((ev) => {
        if (this.myRecipeGroup.status == 'INVALID') this.buttonPressed = true;
        if (this.myRecipeGroup.status != 'INVALID') this.buttonPressed = false;
      })
    );

    this.ingredientsService.getAllIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
    });

    this.categoryService.findCategory().subscribe((categorys) => {
      this.categorys = categorys;
    });

    this.typeService.findType().subscribe((types) => {
      this.types = types;
    });

    this.group['categorys'] = new FormControl('', Validators.required);
    this.group['types'] = new FormControl('', Validators.required);
    this.group['recipe_name'] = new FormControl('', Validators.required);
    this.group['recipe_description'] = new FormControl('', Validators.required);
    this.group['recipe_image'] = new FormControl('', Validators.required);
    this.group['recipe_instruction'] = new FormControl('', Validators.required);
    this.group['recipe_kcal'] = new FormControl('', Validators.required);
    this.myRecipeGroup = new FormGroup(this.group);

    this.ingredientsInput.subscribe(() => {
      this.nrIngredients.push(this.nr);
      this.group['ingredient_name' + this.nr] = new FormControl(
        '',
        Validators.required
      );
      this.group['ingredient_cantity' + this.nr] = new FormControl(
        '',
        Validators.required
      );
      this.group['ingredient_unit' + this.nr] = new FormControl(
        '',
        Validators.required
      );
      this.nr += 1;
      this.myRecipeGroup = new FormGroup(this.group);
    });

    this.ingredientsInputs();

    this.myRecipeGroup.get('recipe_name').valueChanges.subscribe((x) => {
      this.valueChangeRecipe = 0;
      this.trySearch();
    });
  }

  public async trySearch() {
    while (this.valueChangeRecipe <= 3) {
      this.valueChangeRecipe++;
      await this.delay(1);
      if (this.valueChangeRecipe == 0) {
        this.valueChangeRecipe = 4;
        break;
      }
      if (this.valueChangeRecipe == 3) this.searchRecipeExists();
    }
  }

  public ingredientsInputs() {
    this.ingredientsInput.next();
  }

  public ingredientsClose(form: any) {
    console.log(form);
    this.myRecipeGroup.removeControl('ingredient_name' + form);
    this.myRecipeGroup.removeControl('ingredient_cantity' + form);
    this.myRecipeGroup.removeControl('ingredient_unit' + form);

    // this.nrIngredients.slice(this.nrIngredients.indexOf('ingredient_name' + form),this.nrIngredients.indexOf('ingredient_name' + form)+1);
    this.nrIngredients.splice(this.nrIngredients.indexOf(form),1)
    console.log(this.nrIngredients);
    console.log(this.myRecipeGroup.controls);
  }


  public async sendJson() {
    Object.keys(this.myRecipeGroup.controls).forEach((field) => {
      // {1}
      const control = this.myRecipeGroup.get(field); // {2}
      control.markAsTouched({ onlySelf: true }); // {3}
    });
    this.eventBus.emit({ name: 'sendButtonPressed', value: '1' });
    if (this.myRecipeGroup.status != 'INVALID') {
      let recipeItem: insertRecipeItemDto = {
        name: '',
        instruction: '',
        description: '',
        image: '',
        kcal: -1,
        recipeCategoryId: -1,
        recipeTypeId: -1,
      };
      let indexId: number;
      //daca am ingredient
      this.foundRecipe = '';
      this.searchRecipeExists();
      if (this.foundRecipe == '' || this.foundRecipe == 'notFound') {
        for (let index in this.myRecipeGroup.value)
          if (index.includes('ingredient_name')) {
            let found = false;
            for (let ingredient of this.ingredients) {
              if (ingredient.name == this.myRecipeGroup.value[index])
                found = true;
            }
            if (found == false) this.postIngredient(index);
            this.ingredientsService
              .getAllIngredients()
              .subscribe((ingredients) => {
                this.ingredients = ingredients;
              });
          }
        //pentru category
        for (let category of this.categorys) {
          if (category.category_name == this.myRecipeGroup.value['categorys'])
            recipeItem.recipeCategoryId = category.id;
        }
        //pentru type
        for (let type of this.types) {
          if (type.type_name == this.myRecipeGroup.value['types'])
            recipeItem.recipeTypeId = type.id;
        }
        //pentru recipe
        recipeItem.description = this.myRecipeGroup.value['recipe_description'];
        recipeItem.image = this.myRecipeGroup.value['recipe_image'];
        recipeItem.instruction = this.myRecipeGroup.value['recipe_instruction'];
        recipeItem.name = this.myRecipeGroup.value['recipe_name'];
        recipeItem.kcal = this.myRecipeGroup.value['recipe_kcal'];
        await this.postRecipe(recipeItem);
        //pentru recipeIngredients
        // await this.delay(0.5);
        for (let index in this.myRecipeGroup.value) {
          if (index.includes('ingredient_name')) {
            indexId = +index.replace(/[^0-9\.]+/g, '');
            this.recipeIngredientItem.cant_ingr = this.myRecipeGroup.value[
              'ingredient_cantity' + indexId
            ];
            this.recipeIngredientItem.unit_mas = this.myRecipeGroup.value[
              'ingredient_unit' + indexId
            ];
            //nu apuca sa de-a insert sau sa se updateze
            for (let ingredient of this.ingredients)
              if (
                ingredient.name ==
                this.myRecipeGroup.value['ingredient_name' + indexId]
              )
                this.recipeIngredientItem.ingredientId = ingredient.id;

            this.recipeIngredientItem.recipeId = this.recipeId;
            this.postRecipeIngredient(this.recipeIngredientItem);
          }
        }

        this.foundRecipe = '';
      } else this.foundRecipe = 'found';
    }
  }

  public async postIngredient(data: string) {
    let ingredient: IngredientsItem = {
      name: this.myRecipeGroup.value[data],
    };
    await this.subscription.add(
      this.ingredientsService
        .insert(ingredient)
        .subscribe((x) => this.ingredients.push(x))
    );
  }

  public postRecipe(data: insertRecipeItemDto) {
    return new Promise<number>((resolve, reject) => {
      this.recipesService.insert(data).subscribe((x) => {
        this.recipeId = x.id;
        resolve(x.id);
      });
    });
  }

  public postRecipeIngredient(data: insertRecipesIngredientsItem) {
    this.subscription.add(
      this.recipeIngredientsService
        .insert(data)
        .subscribe((x) => this.openSnackBar('sent'))
    );
  }

  public searchRecipeExists() {
    this.recipesService.getAllRecipes(null, null).subscribe((recipes) => {
      this.foundRecipe = 'notFound';
      for (let recipe of recipes)
        if (recipe.name.toLowerCase() === this.myRecipeGroup.value['recipe_name'].toLowerCase())
          this.foundRecipe = 'found';
      if (this.foundRecipe !== 'found') this.foundRecipe = 'notFound';
    });
  }

  public delay(n) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n * 1000);
    });
  }

  public openSnackBar(data: string) {
    this._snackBar.open('Reteta a fost adaugata cu succes', 'Close', {
      duration: 3000,
    });
  }

  public verifyValability(id: number) {
    if (
      this.myRecipeGroup.controls.categorys.errors &&
      this.myRecipeGroup.controls.categorys.touched
    )
      return true;
    else return false;
  }
}
