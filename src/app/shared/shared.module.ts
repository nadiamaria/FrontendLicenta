import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from './components/menu/menu.component';
import { FavoritesResource } from './data/resources/FavoritesResource';
import { FavoritesService } from './data/FavoritesService';
import { IngredientsResource } from './data/resources/IngredientsResource';
import { IngredientsService } from './data/IngredientsService';
import { RecipesResource } from './data/resources/RecipesResource';
import { RecipesService } from './data/RecipesService';
import { AuthService } from './data/AuthService';
import { AuthResource } from './data/resources/AuthResource';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    RecipeCardComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [LayoutComponent, RecipeCardComponent],
  providers: [
    RecipesService,
    RecipesResource,
    IngredientsService,
    IngredientsResource,
    FavoritesService,
    FavoritesResource,
    AuthService,
    AuthResource,
  ],
})
export class SharedModule {}
