import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [LayoutComponent, HeaderComponent, RecipeCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule
  ],
  exports: [
    LayoutComponent,
    RecipeCardComponent
  ]
})
export class SharedModule { }
