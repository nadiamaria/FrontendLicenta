import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IngredientsItem } from 'src/app/shared/data/dataModel/ingredientItem';
import { IngredientsService } from 'src/app/shared/data/IngredientsService';
import { EventBusService } from 'src/app/shared/services/event-bus.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public ingredients: IngredientsItem[];

  // public formSelect = new FormControl('');

  public myFormGroup: FormGroup;

  constructor(
    private ingredientsService: IngredientsService,
    private eventBus: EventBusService
  ) {}

  public ngOnInit() {
    // this.getValues();
    this.ingredientsService.getAllIngredients().subscribe((ingredients) => {
      // console.log(ingredients);
      this.ingredients = ingredients;
      let group = {};
      this.ingredients.forEach((ingredient) => {
        group[ingredient.name] = new FormControl('');
      });
      this.myFormGroup = new FormGroup(group);
    });

    // let group={}
    // this.ingredients.forEach(ingredient =>{
    //   group[ingredient.name] = new FormControl('');
    // })
    // this.myFormGroup = new FormGroup(group);
  }

  public getIngredients() {
    // console.log(this.myFormGroup.value);
    this.eventBus.emit({
      name: 'filterChanged',
      value: this.myFormGroup.value,
    });
  }

  // onSubmit(){
  //   console.log(this.formSelect.value.ingredient1);
  //   this.formSelect.patchValue({ingredient1: false});
  //   // console.log(JSON.stringify(this.formSelect.getRawValue()));
  // }

  // public getValues(): void {
  //   this.formSelect.valueChanges.subscribe((value) => {console.log(value)});
  // }
}
