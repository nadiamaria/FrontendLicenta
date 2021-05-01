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
import { MatDialogModule } from '@angular/material/dialog';
import { FavoriteDialogComponent } from './components/favorite-dialog/favorite-dialog.component';
import { RecipesIngredientsService } from '../shared/data/RecipesIngredientsService';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomePageComponent,
    FilterComponent,
    RecipePageComponent,
    FavoriteDialogComponent,
  ],
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
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
  ],
  providers: [
    httpInterceptorProviders,
    RecipesService,
    RecipeResolverService,
    RecipesIngredientsService,
  ],
  exports: [],
})
export class HomeModule {}
