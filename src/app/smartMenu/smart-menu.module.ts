import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartMenuRoutingModule } from './smart-menu-routing.module';
import { SmartMenuComponent } from './components/smart-menu/smart-menu.component';
import { AuthService } from '../shared/data/AuthService';
import { AuthResource } from '../shared/data/resources/AuthResource';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SmartMenuComponent],
  imports: [CommonModule, SmartMenuRoutingModule, HttpClientModule],
  providers: [AuthService, AuthResource, SharedModule],
})
export class SmartMenuModule {}
