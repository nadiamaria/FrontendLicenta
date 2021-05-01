import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/shared/data/CategoryService';
import { CategoryItem } from 'src/app/shared/data/dataModel/categoryItem';
import { IngredientsItem } from 'src/app/shared/data/dataModel/ingredientItem';
import { TypeItem } from 'src/app/shared/data/dataModel/typeItem';
import { IngredientsService } from 'src/app/shared/data/IngredientsService';
import { TypeService } from 'src/app/shared/data/TypeService';
import { EventBusService } from 'src/app/shared/services/event-bus.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public ingredients: IngredientsItem[];
  public categorys: CategoryItem[];
  public types: TypeItem[];

  public show: boolean = false;

  private subscription: Subscription = new Subscription();

  public myFilterGroup: FormGroup;

  constructor(
    private ingredientsService: IngredientsService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private eventBus: EventBusService,
    private fb: FormBuilder
  ) {}

  public ngOnInit() {
    this.ingredientsService.getAllIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
      let group = {};
      this.ingredients.forEach((ingredient) => {
        group[ingredient.name] = new FormControl(false);
      });
      group['categorys'] = new FormControl('');
      group['types'] = new FormControl('');
      this.myFilterGroup = new FormGroup(group);
      this.myFilterGroup.valueChanges.subscribe((data) =>
        this.sendFilter(data)
      );
    });

    this.categoryService.findCategory().subscribe((categorys) => {
      this.categorys = categorys;
      let group = {};
    });

    this.typeService.findType().subscribe((types) => {
      this.types = types;
      let group = {};
    });

    this.subscription.add(
      this.eventBus.on('showForm').subscribe((data: number) => {
        this.show = !data;
      })
    );
  }

  public sendFilter(data: any) {
    let filterData: formInterface = {
      category: '',
      type: '',
      ingredients: [],
    };
    for (let filter in data) {
      if (filter == 'categorys') filterData.category = data[filter];
      else if (filter == 'types') filterData.type = data[filter];
      else if (data[filter] == true) filterData.ingredients.push(filter);
    }

    this.eventBus.emit({
      name: 'filterChanged',
      value: filterData,
    });
  }

  public showForm() {
    this.eventBus.emit({
      name: 'showForm',
      value: this.show,
    });
  }

  public resetForm() {
    let data = this.myFilterGroup.value;
    for (let filter in data) {
      if (filter == 'categorys')
        this.myFilterGroup.controls[filter].setValue('');
      else if (filter == 'types')
        this.myFilterGroup.controls[filter].setValue('');
      else if (data[filter] == true)
        this.myFilterGroup.controls[filter].setValue(false);
    }
  } //sa fac functie pentru uncheked
}

export interface formInterface {
  ingredients: any[];
  category: string;
  type: string;
}
