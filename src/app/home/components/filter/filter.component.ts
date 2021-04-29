import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  public show: boolean = false;

  // public formSelect = new FormControl('');
  private subscription: Subscription = new Subscription();

  public myFormGroup: FormGroup;

  constructor(
    private ingredientsService: IngredientsService,
    private eventBus: EventBusService
  ) {}

  public ngOnInit() {
    this.ingredientsService.getAllIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
      let group = {};
      this.ingredients.forEach((ingredient) => {
        group[ingredient.name] = new FormControl(false);
      });
      this.myFormGroup = new FormGroup(group);
    });

    this.subscription.add(
      this.eventBus.on('showForm').subscribe((data: number) => {
        this.show = !data;
      })
    );

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

  public showForm() {
    this.eventBus.emit({
      name: 'showForm',
      value: this.show,
    });
  }
}
