import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRecipeRoutingModule } from './add-recipe-routing.module';
import { AddPageComponent } from './add-page/add-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { RecipesResource } from '../shared/data/resources/RecipesResource';
import { RecipesService } from '../shared/data/RecipesService';
import { AuthResource } from '../shared/data/resources/AuthResource';
import { AuthService } from '../shared/data/AuthService';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { httpInterceptorProviders } from '../shared/http-interceptors';

@NgModule({
  declarations: [AddPageComponent],
  imports: [
    CommonModule,
    AddRecipeRoutingModule,
    MatButtonModule,
    SharedModule,
    HttpClientModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthService,
    AuthResource,
    RecipesService,
    RecipesResource,
    httpInterceptorProviders,
  ],
})
export class AddRecipeModule {}
