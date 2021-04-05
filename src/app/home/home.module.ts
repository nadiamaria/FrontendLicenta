import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';

import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ListService } from './services/ListService';
import { ListResource } from './services/ListResource';
import { MatCardModule } from '@angular/material/card';
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';




@NgModule({
  declarations: [HomePageComponent, FilterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [
    ListService,
    ListResource
  ],
  exports: [

  ]
})
export class HomeModule { }
