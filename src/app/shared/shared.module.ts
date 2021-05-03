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
import { AuthGuard } from './services/auth.guard';
import { RecipesIngredientsResource } from './data/resources/RecipesIngredientsResource';
import { CategoryResource } from './data/resources/CategoryResource';
import { TypeResource } from './data/resources/TypeResource';
import { CategoryService } from './data/CategoryService';
import { TypeService } from './data/TypeService';
import { RecipesIngredientsService } from './data/RecipesIngredientsService';

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
    RecipesIngredientsResource,
    TypeResource,
    CategoryResource,
    CategoryService,
    TypeService,
    RecipesIngredientsService,
  ],
})
export class SharedModule {}
