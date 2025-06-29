
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { authGuard } from './guards/auth.guard';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FormulationsListComponent } from './pages/formulations-list/formulations-list.component';
import { FormulationAddComponent } from './pages/formulation-add/formulation-add.component';
import { FormulationDetailComponent } from './pages/formulation-detail/formulation-detail.component';
import { FormulationEditComponent } from './pages/formulation-edit/formulation-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' }, canActivate: [authGuard] },
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [authGuard] },
  { path: 'favorites', component: FavoritesComponent, data: { animation: 'FavoritesPage' }, canActivate: [authGuard] },
  {path: 'formulations', component: FormulationsListComponent },
  { path: 'formulation/add', component: FormulationAddComponent },
  { path: 'formulation/:id', component: FormulationDetailComponent },
  { path: 'formulation/edit/:id', component: FormulationEditComponent },
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
