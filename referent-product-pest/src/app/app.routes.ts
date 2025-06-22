
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { authGuard } from './guards/auth.guard';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' }, canActivate: [authGuard] },
 { path: 'product/:id', component: ProductDetailComponent, canActivate: [authGuard] },
 { path: 'favorites', component: FavoritesComponent, data: { animation: 'FavoritesPage' }, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
