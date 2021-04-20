import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritePageComponent } from './components/favorite-page/favorite-page.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from '../shared/http-interceptors';

@NgModule({
  declarations: [FavoritePageComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
})
export class FavoritesModule {}
