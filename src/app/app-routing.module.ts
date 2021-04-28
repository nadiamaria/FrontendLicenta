import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'account/login', pathMatch: 'full' },
  {
    path: 'account',
    loadChildren: () =>
    import('./account/account.module').then((m) => m.AccountModule),
    canActivate: [AuthGuard],
      
  },
  {
    path: 'recipes',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./favorites/favorites.module').then((m) => m.FavoritesModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
