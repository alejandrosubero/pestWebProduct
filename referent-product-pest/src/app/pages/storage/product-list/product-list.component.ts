import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms'; // For ngModel
import { ProductStoreService } from '../../../services/product-store.service';
import { PackageStatus } from '../../../models/interfaces';
import { NavegateService } from '../../../services/navegate.service';
import { Router } from '@angular/router';
import { PestData } from '../../../models/pestdata.model';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
     CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  
 private router = inject(Router);
 private navegateService = inject( NavegateService);
 private store = inject(ProductStoreService);
 public searchQuery = '';


 ngOnInit() {}


   // Accesos rápidos
  get products() {
        const produtsList = this.store.filteredProducts();
        const sortedProducts = produtsList.sort((a, b) => a.name.localeCompare(b.name));
    return sortedProducts;
        // return this.store.filteredProducts();
  }

  get loading() {
    return this.store.loading();
  }

  get error() {
    return this.store.error();
  }


applyFilter(): void {
  this.store.setFilter(this.searchQuery);
}

clearSearch(): void {
  this.searchQuery = '';
  this.applyFilter();
}


  async deleteProduct(id: number) {
    if (confirm('¿Eliminar este producto?')) {
      await this.store.delete(id);
    }
  }

  statusClass(status: string): string {
    return status.replace(/\s/g, '');
  }


 getStatusClass(status: PackageStatus): string {
    switch (status) {
      case 'In Stock': return 'status-in-stock';
      case 'In Use': return 'status-in-use';
      case 'Empty': return 'status-empty';
      default: return '';
    }
  }


  onDetail(id: number | undefined): void {
    if (id !== undefined) { 
      this.navegateService.goToDetail('storage/products/detail', id, '');
    } else {
      console.warn('Attempting to browse in detail with an undefined ID.');
    }
  }


  onBackClick(): void {
    this.navegateService.goFavorites('storage', 1);
  }


  onAddNew(): void {
   this.router.navigate(['/storage/products/add']);
  }

}
