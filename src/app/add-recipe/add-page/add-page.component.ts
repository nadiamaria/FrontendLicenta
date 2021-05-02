import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CategoryService } from 'src/app/shared/data/CategoryService';
import { CategoryItem } from 'src/app/shared/data/dataModel/categoryItem';
import { IngredientsItem } from 'src/app/shared/data/dataModel/ingredientItem';
import { TypeItem } from 'src/app/shared/data/dataModel/typeItem';
import { IngredientsService } from 'src/app/shared/data/IngredientsService';
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

  public constructor(
    private ingredientsService: IngredientsService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private eventBus: EventBusService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.ingredientsService.getAllIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
    });

    this.categoryService.findCategory().subscribe((categorys) => {
      this.categorys = categorys;
    });

    this.typeService.findType().subscribe((types) => {
      this.types = types;
    });

    this.group['categorys'] = new FormControl('');
    this.group['types'] = new FormControl('');
    this.group['recipe_name'] = new FormControl('');
    this.group['recipe_description'] = new FormControl('');
    this.group['recipe_image'] = new FormControl('');
    this.group['recipe_kcal'] = new FormControl('');
    this.ingredientsInputs();
    this.myRecipeGroup = new FormGroup(this.group);

    this.ingredientsInput.subscribe(() => {
      this.nrIngredients.push(this.nr);
      this.group['ingredient_name' + this.nr] = new FormControl('');
      this.group['ingredient_cantity' + this.nr] = new FormControl('');
      this.group['ingredient_unit' + this.nr] = new FormControl('');
      this.nr += 1;
      this.myRecipeGroup = new FormGroup(this.group);
    });
  }

  public ingredientsInputs() {
    this.ingredientsInput.next();
  }

  public sendJson() {
    let str = '';
    console.log(this.myRecipeGroup.value);
    //You can also pass a regex to this function. In the following example, it would replace everything except numerics:
    for (let index in this.myRecipeGroup.value)
      if (index.includes('ingredient_name')) {
        this.postIngredient(index);
      }
  }

  public postIngredient(data: string) {
    let ingredient: IngredientsItem = {
      name: this.myRecipeGroup.value[data],
    };
    this.subscription.add(
      this.ingredientsService
        .insert(ingredient)
        .subscribe((x) => console.log(x))
    );
  }

  public postRecipe() {}

  public postRecipeIngredient() {}
}
