import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';

import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterComponent } from './components/filter/filter.component';
import { httpInterceptorProviders } from '../shared/http-interceptors';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';


@NgModule({
  declarations: [HomePageComponent, FilterComponent, RecipePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [httpInterceptorProviders],
  exports: [],
})
export class HomeModule {}
