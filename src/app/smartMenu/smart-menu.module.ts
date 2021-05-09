import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartMenuRoutingModule } from './smart-menu-routing.module';
import { SmartMenuComponent } from './components/smart-menu/smart-menu.component';
import { AuthService } from '../shared/data/AuthService';
import { AuthResource } from '../shared/data/resources/AuthResource';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RecipesService } from '../shared/data/RecipesService';
import { RecipesResource } from '../shared/data/resources/RecipesResource';
import { RecipeCardComponent } from '../shared/components/recipe-card/recipe-card.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RandomKcalService } from '../shared/services/random-kcal.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { httpInterceptorProviders } from '../shared/http-interceptors';

@NgModule({
  declarations: [SmartMenuComponent],
  imports: [
    CommonModule,
    SmartMenuRoutingModule,
    HttpClientModule,
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [
    AuthService,
    AuthResource,
    RecipesService,
    RecipesResource,
    RandomKcalService,
    httpInterceptorProviders,
  ],
})
export class SmartMenuModule {}
