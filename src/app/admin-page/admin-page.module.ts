import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import { httpInterceptorProviders } from '../shared/http-interceptors';
import { SharedModule } from '../shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { UsersResource } from '../shared/data/resources/UsersResource';
import { UsersService } from '../shared/data/UsersService';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [httpInterceptorProviders, UsersResource, UsersService],
})
export class AdminPageModule {}
