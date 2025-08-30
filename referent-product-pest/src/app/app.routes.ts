import { Routes } from '@angular/router'; 
import { authGuard } from './guards/auth.guard'; 
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

    { path: 'app',
    loadComponent: () => import('./pages/core/layout/layout.component').then(c => c.LayoutComponent),
    data: { animation: 'pro' },
    canActivate: [authGuard],
     children: [

  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' }, canActivate: [authGuard] },
    {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent),
    data: { animation: 'pro' },
    canActivate: [authGuard]
  },
  
   {
    path: 'technical/notes/compare',
    loadComponent: () => import('./pages/pro/comparator/compare-products/compare-products.component').then(c => c.CompareProductsComponent),
    data: { animation: 'pro' },
    canActivate: [authGuard]
  },
    {
    path: 'technical/notes/mix',
    loadComponent: () => import('./pages/pro/mix/mix-technical-notes/mix-technical-notes.component').then(c => c.MixTechnicalNotesComponent),
    data: { animation: 'pro' },
    canActivate: [authGuard]
  },
  {
    path: 'technical/notes',
    loadComponent: () => import('./pages/technical-notes-list/technical-notes-list.component').then(c => c.TechnicalNotesListComponent),
    data: { animation: 'technicalnotes' },
    canActivate: [authGuard]
  },
  {
    path: 'technical/notes/:id',
    loadComponent: () => import('./pages/technical-notes/technical-notes.component').then(c => c.TechnicalNotesComponent),
    canActivate: [authGuard]
  },
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
  }
       ]
  },

  { path: '**', redirectTo: '/login' }
];

