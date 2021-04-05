import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filterForm = new FormGroup({
    ingredient1: new FormControl(''),
    ingredient2: new FormControl(''),
    ingredient3: new FormControl('')
  });

  public formSelect = new FormControl('');


  constructor() { }

  public ngOnInit() {
    // this.filterForm.patchValue({ingredient1: false, ingredient2: false, ingredient3: false});
    this.getValues();
  }



  onSubmit(){
    console.log(this.filterForm.value.ingredient1);
    this.filterForm.patchValue({ingredient1: false});
    console.log(JSON.stringify(this.filterForm.getRawValue()));
  }

  public getValues(): void {
    this.filterForm.valueChanges.subscribe((value) => {
}
