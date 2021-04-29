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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RecipesService } from '../shared/data/RecipesService';
import { RecipeResolverService } from '../shared/services/recipe-resolver.service';

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
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [httpInterceptorProviders, RecipesService, RecipeResolverService],
  exports: [],
})
export class HomeModule {}
