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
    this.filterForm.valueChanges.subscribe((value) => {console.log(value)});}
}

import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Content } from 'src/app/models/content';
import { Data, EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() public content: Content;
  @Input() public subsectionID: number;
  @Input() public sectionID: number;

  public errors = true;
  public formCheckbox = new FormControl('', Validators.required);
  public selectedOptionValues: string[] = [];

  public constructor(private eventBus: EventBusService) { }

  public getSelectedOptionsValue(check: any, id: number): void {
    if (this.selectedOptionValues) {
      this.errors = false;
    } else {
      this.errors = true;
    }
    if (check.value) {
      this.selectedOptionValues.push(this.content?.item?.option[id]);
    }
    else {
      this.selectedOptionValues = this.selectedOptionValues.filter(m => m != this.content?.item?.option[id]);
    }
    if (this.selectedOptionValues.length === 0 && this.errors === false){
      this.errors = true;
    }

    const data: Data =
      {
        section_id: this.sectionID,
        subsection_id: this.subsectionID,
        id: this.content.id,
        value: this.selectedOptionValues,
        type: this.content.type,
        errors: this.errors
      };

    this.eventBus.emit({ name: 'FormChangeEvent', value: data });
  }
}



