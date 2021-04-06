import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IngredientsItem } from '../../services/dataModel/ingredientItem';
import { IngredientsService } from '../../services/IngredientsService';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public ingredients: IngredientsItem[];

  public formSelect = new FormControl('');


  constructor(private ingredientsService: IngredientsService) { }

  public ngOnInit() {
    this.getValues();
    this.ingredientsService.getAllIngredients().subscribe(ingredients => {
      console.log(ingredients);
      this.ingredients = ingredients;
    });
  }



  onSubmit(){
    console.log(this.formSelect.value.ingredient1);
    this.formSelect.patchValue({ingredient1: false});
    // console.log(JSON.stringify(this.formSelect.getRawValue()));
  }

  public getValues(): void {
    this.formSelect.valueChanges.subscribe((value) => {console.log(value)});
  }

}



