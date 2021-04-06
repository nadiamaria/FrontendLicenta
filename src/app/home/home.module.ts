import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';

import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RecipesService } from './services/RecipesService';
import { RecipesResource } from './services/resources/RecipesResource';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterComponent } from './components/filter/filter.component';
import { IngredientsService } from './services/IngredientsService';
import { IngredientsResource } from './services/resources/IngredientsResource';




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
    RecipesService,
    RecipesResource,
    IngredientsService,
    IngredientsResource
  ],
  exports: [

  ]
})
export class HomeModule { }
