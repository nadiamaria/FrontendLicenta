import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';

import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RecipesService } from './services/RecipesService';
import { RecipesResource } from './services/resources/RecipesResource';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [
    RecipesService,
    RecipesResource
  ],
  exports: [

  ]
})
export class HomeModule { }
