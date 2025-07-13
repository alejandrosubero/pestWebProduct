
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
// import { HomeComponent } from './pages/home/home.component';

// import { authGuard } from './guards/auth.guard';
// import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
// import { FavoritesComponent } from './pages/favorites/favorites.component';
// import { FormulationsListComponent } from './pages/formulations-list/formulations-list.component';
// import { FormulationAddComponent } from './pages/formulation-add/formulation-add.component';
// import { FormulationDetailComponent } from './pages/formulation-detail/formulation-detail.component';
// import { FormulationEditComponent } from './pages/formulation-edit/formulation-edit.component';
// import { ProductListComponent } from './pages/storage/product-list/product-list.component';
// import { AddProductComponent } from './pages/storage/add-product/add-product.component';
// import { EditProductComponent } from './pages/storage/edit-product/edit-product.component';
// import { StorageProductDetailComponent } from './pages/storage/storage-product-detail/storage-product-detail.component';
// import { RegisterProductUsageComponent } from './pages/storage/register-product-usage/register-product-usage.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'home', component: HomeComponent, data: { animation: 'HomePage' }, canActivate: [authGuard] },
//   { path: 'product/:id', component: ProductDetailComponent, canActivate: [authGuard] },
//   { path: 'favorites/:id', component: FavoritesComponent, data: { animation: 'FavoritesPage' }, canActivate: [authGuard] },
//   { path: 'formulations', component: FormulationsListComponent, data: { animation: 'FormulationPage' }, canActivate: [authGuard] },
//   { path: 'formulation/add', component: FormulationAddComponent, data: { animation: 'FormulationPage' }, canActivate: [authGuard] },
//   { path: 'formulation/:id', component: FormulationDetailComponent, data: { animation: 'FormulationPage' }, canActivate: [authGuard] },
//   { path: 'formulation/edit/:id', component: FormulationEditComponent, data: { animation: 'FormulationPage' }, canActivate: [authGuard] },
//   { path: 'storage/products', component: ProductListComponent, data: { animation: 'StoragePage' }, canActivate: [authGuard] },
//   { path: 'storage/products/add', component: AddProductComponent, data: { animation: 'StoragePage' }, canActivate: [authGuard] },
//   { path: 'storage/products/detail/:id', component: StorageProductDetailComponent, data: { animation: 'StoragePage' }, canActivate: [authGuard] },
//   { path: 'storage/products/edit/:id', component: EditProductComponent, data: { animation: 'StoragePage' }, canActivate: [authGuard] },
//   { path: 'storage/products/register/use', component: RegisterProductUsageComponent, data: { animation: 'StoragePage' }, canActivate: [authGuard] },
//   { path: '**', redirectTo: '/login' }

// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule { }



import { Routes } from '@angular/router'; 
import { authGuard } from './guards/auth.guard'; 
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' }, canActivate: [authGuard] },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then(c => c.ProductDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'favorites/:id',
    loadComponent: () => import('./pages/favorites/favorites.component').then(c => c.FavoritesComponent),
    data: { animation: 'FavoritesPage' },
    canActivate: [authGuard]
  },
  {
    path: 'formulations',
    loadComponent: () => import('./pages/formulations-list/formulations-list.component').then(c => c.FormulationsListComponent),
    data: { animation: 'FormulationPage' },
    canActivate: [authGuard]
  },
  {
    path: 'formulation/add',
    loadComponent: () => import('./pages/formulation-add/formulation-add.component').then(c => c.FormulationAddComponent),
    data: { animation: 'FormulationPage' },
    canActivate: [authGuard]
  },
  {
    path: 'formulation/:id',
    loadComponent: () => import('./pages/formulation-detail/formulation-detail.component').then(c => c.FormulationDetailComponent),
    data: { animation: 'FormulationPage' },
    canActivate: [authGuard]
  },
  {
    path: 'formulation/edit/:id',
    loadComponent: () => import('./pages/formulation-edit/formulation-edit.component').then(c => c.FormulationEditComponent),
    data: { animation: 'FormulationPage' },
    canActivate: [authGuard]
  },

  {
    path: 'storage', 
    canActivate: [authGuard],
    children: [
      { path: 'products', loadComponent: () => import('./pages/storage/product-list/product-list.component').then(c => c.ProductListComponent), data: { animation: 'StoragePage' } },
      { path: 'products/add', loadComponent: () => import('./pages/storage/add-product/add-product.component').then(c => c.AddProductComponent), data: { animation: 'StoragePage' } },
      { path: 'products/detail/:id', loadComponent: () => import('./pages/storage/storage-product-detail/storage-product-detail.component').then(c => c.StorageProductDetailComponent), data: { animation: 'StoragePage' } },
      { path: 'products/edit/:id', loadComponent: () => import('./pages/storage/edit-product/edit-product.component').then(c => c.EditProductComponent), data: { animation: 'StoragePage' } },
      { path: 'products/register/use', loadComponent: () => import('./pages/storage/register-product-usage/register-product-usage.component').then(c => c.RegisterProductUsageComponent), data: { animation: 'StoragePage' } },
    ]
  },

  { path: '**', redirectTo: '/login' }
];

