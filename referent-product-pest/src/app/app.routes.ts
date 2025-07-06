
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
import { ProductListComponent } from './pages/storage/product-list/product-list.component';
import { AddProductComponent } from './pages/storage/add-product/add-product.component';
import { EditProductComponent } from './pages/storage/edit-product/edit-product.component';
import { StorageProductDetailComponent } from './pages/storage/storage-product-detail/storage-product-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' }, canActivate: [authGuard] },
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [authGuard] },
  { path: 'favorites/:id', component: FavoritesComponent, data: { animation: 'FavoritesPage' }, canActivate: [authGuard] },
  { path: 'formulations', component: FormulationsListComponent, data: { animation: 'FormulationPage' }, canActivate: [authGuard] },
  { path: 'formulation/add', component: FormulationAddComponent, data: { animation: 'FormulationPage' }, canActivate: [authGuard] },
  { path: 'formulation/:id', component: FormulationDetailComponent, data: { animation: 'FormulationPage' }, canActivate: [authGuard] },
  { path: 'formulation/edit/:id', component: FormulationEditComponent, data: { animation: 'FormulationPage' }, canActivate: [authGuard] },
  { path: 'storage/products', component: ProductListComponent, data: { animation: 'StoragePage' }, canActivate: [authGuard] },
  { path: 'storage/products/add', component: AddProductComponent, data: { animation: 'StoragePage' }, canActivate: [authGuard] },
  { path: 'storage/products/detail/:id', component: StorageProductDetailComponent, data: { animation: 'StoragePage' }, canActivate: [authGuard] },
  { path: 'storage/products/edit/:id', component: EditProductComponent, data: { animation: 'StoragePage' }, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
