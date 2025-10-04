import { Routes } from '@angular/router'; 
import { authGuard } from './guards/auth.guard'; 
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
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
        path: 'lab/test/jar',
        loadComponent: () => import('./pages/lab/test/jar-test-table/jar-test-table.component').then(c => c.JarTestTableComponent),
        data: { animation: 'lab' },
        canActivate: [authGuard]
      },
      {
        path: 'lab/field',
        loadComponent: () => import('./pages/lab/field-card/field-card.component').then(c => c.FieldCardComponent),
        data: { animation: 'lab' },
        canActivate: [authGuard]
      },
      {
        path: 'lab/unit/converter',
        loadComponent: () => import('./pages/lab/unit-converter/unit-converter.component').then(c => c.UnitConverterComponent),
        data: { animation: 'lab' },
        canActivate: [authGuard]
      },
      {
        path: 'lab/test/checklist',
        loadComponent: () => import('./pages/lab/test/tank-mix-checklist/tank-mix-checklist.component').then(c => c.TankMixChecklistComponent),
        data: { animation: 'lab' },
        canActivate: [authGuard]
      },
      {
        path: 'backup',
        loadComponent: () => import('./pages/backup/backup.component').then(c => c.BackupComponent),
        data: { animation: 'lab' },
        canActivate: [authGuard]
      },
      {
        path: 'storage',
        canActivate: [authGuard],
        children: [
          { path: 'products', loadComponent: () => import('./pages/storage/product-list/product-list.component').then(c => c.ProductListComponent), data: { animation: 'StoragePage' } },
          { path: 'products/detail/:id', loadComponent: () => import('./pages/storage/storage-product-detail/storage-product-detail.component').then(c => c.StorageProductDetailComponent), data: { animation: 'StoragePage' } },
          { path: 'products/edit/:id', loadComponent: () => import('./pages/storage/edit-product/edit-product.component').then(c => c.EditProductComponent), data: { animation: 'StoragePage' } },
          { path: 'products/register/use', loadComponent: () => import('./pages/storage/register-product-usage/register-product-usage.component').then(c => c.RegisterProductUsageComponent), data: { animation: 'StoragePage' } },
          { path: 'products/add/new', loadComponent: () => import('./pages/storage/add-product/add-product.component').then(c => c.AddProductComponent), data: { animation: 'StoragePage' } },
          { path: 'products/add/nemu', loadComponent: () => import('./pages/storage/add-menue/add-menue.component').then(c => c.AddMenueComponent), data: { animation: 'StoragePage' } },
          { path: 'products/add/product', loadComponent: () => import('./pages/storage/addition-produc/addition-produc.component').then(c => c.AdditionProducComponent), data: { animation: 'StoragePage' } },
          { path: 'products/add/product/:id', loadComponent: () => import('./pages/storage/addition-produc/addition-produc.component').then(c => c.AdditionProducComponent), data: { animation: 'StoragePage' } },
        ]
      },
      {
        path: 'phrase',
        canActivate: [authGuard],
        children: [
          { path: 'main', loadComponent: () => import('./phrases/components/main-phrase/main-phrase.component').then(c => c.MainPhraseComponent), data: { animation: 'phrase' } },
          { path: 'add/text', loadComponent: () => import('./phrases/components/add-text-phrase/add-text-phrase.component').then(c => c.AddTextPhraseComponent), data: { animation: 'phrase' } },
          { path: 'show/text', loadComponent: () => import('./phrases/components/show-text-phrase/show-text-phrase.component').then(c => c.ShowTextPhraseComponent), data: { animation: 'phrase' } },
          { path: 'work/text', loadComponent: () => import('./phrases/components/work-text-phrase/work-text-phrase.component').then(c => c.WorkTextPhraseComponent), data: { animation: 'phrase' } },
          { path: 'complete', loadComponent: () => import('./phrases/components/complete-phrase/complete-phrase.component').then(c => c.CompletePhraseComponent), data: { animation: 'phrase' } },
        ]
      }
    ]
  },

  { path: '**', redirectTo: '/login' }
];

// app/phrase/main
// app/phrase/add/text
// app/phrase/show/text
// app/phrase/work/text
// app/phrase/complete