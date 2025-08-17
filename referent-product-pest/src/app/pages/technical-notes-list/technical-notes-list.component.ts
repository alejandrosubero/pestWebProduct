import { Component, inject, OnInit } from '@angular/core';
import { TechnicalProductService } from '../../services/TechnicalProductService';
import { DomSanitizer } from '@angular/platform-browser';
import { NavegateService } from '../../services/navegate.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TechnicalProduct } from '../../models/technical_product.model';
import { PestData } from '../../models/pestdata.model';

import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';


import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SearchInfoSheetComponent } from '../share/search-info-sheet/search-info-sheet.component';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites.service';
import { ProductStoreService } from '../../services/product-store.service';


@Component({
  selector: 'app-technical-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule
],
  templateUrl: './technical-notes-list.component.html',
  styleUrl: './technical-notes-list.component.scss'
})
export class TechnicalNotesListComponent {

  filteredProducts: TechnicalProduct[] = [];
  allProducts: TechnicalProduct[] = [];
  searchTerm: string = '';

 constructor(
    private technicalProductService: TechnicalProductService,
    private navegateService: NavegateService,
    private router: Router,
  ) {
    this.getAllProducts();
  }

    getAllProducts(): void {
    const products = this.technicalProductService.getAllTechnicalProducts();
    if(products){
      this.allProducts = products;
    }
    console.log(products);
  }

buscarCoincidencias(): void {
  const rawInput = this.searchTerm.trim().toLowerCase();

  const normalize = (text: string): string =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const getRelevantFields = (product: TechnicalProduct): string => {
    const title = normalize(product.title);
    const activeIngredients = normalize(product.activeIngredients);
    const spectrumOfControl = normalize(product.spectrumOfControl);

    return `${title} ${activeIngredients} ${spectrumOfControl}`;
  };

  const createExactMatchRegex = (phrase: string): RegExp => {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i');
  };

  if (rawInput.startsWith('*')) {
    const searchTerm = normalize(rawInput.slice(1).trim());
    if (searchTerm.length >= 2) {
      this.filteredProducts = this.allProducts.filter(product =>
        normalize(product.activeIngredients).includes(searchTerm)
      );
    } else {
      this.filteredProducts = [];
    }
  } else {
    const terms = normalize(rawInput).split(/\s+/);
    const phrase = terms.join(' ').trim();
    const regex = createExactMatchRegex(phrase);

    this.filteredProducts = this.allProducts.filter(product =>
      regex.test(getRelevantFields(product))
    );
  }
}

 back(): void {
      this.router.navigate(['/home']);
  }

 goToDetail(id: number): void {
  const routeBase = "technical/notes";
    this.navegateService.goToDetail(routeBase, id, routeBase);
  }


}
