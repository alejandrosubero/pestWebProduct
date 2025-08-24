import { Component, inject, OnInit } from '@angular/core';
import { TechnicalProductService } from '../../services/TechnicalProductService';
import { NavegateService } from '../../services/navegate.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TechnicalProduct } from '../../models/technical_product.model';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';


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
  title: string = 'Technical Notes'

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
       const sortedProducts  = products.sort((a, b) => a.title.localeCompare(b.title));
      this.allProducts = sortedProducts;
      if(this.allProducts){
        this.filteredProducts = this.allProducts;
      }
    }
    // console.log(products);
  }

buscarCoincidencias2(): void {
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

buscarCoincidencias(): void {
  const rawInput = this.searchTerm.trim().toLowerCase();
  
  // Normaliza el texto quitando acentos y convirtiendo a minúsculas
  const normalize = (text: string): string =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Obtiene una cadena de texto de todos los campos relevantes para la búsqueda
  const getSearchableText = (product: TechnicalProduct): string => {
    const title = normalize(product.title);
    const activeIngredients = normalize(product.activeIngredients);
    const spectrumOfControl = normalize(product.spectrumOfControl);
    
    return `${title} ${activeIngredients} ${spectrumOfControl}`;
  };

  // Si no hay texto o es muy corto, limpia los resultados
  if (rawInput.length < 2) {
    this.filteredProducts = [];
    return;
  }
  
  // Normaliza el término de búsqueda
  const normalizedSearchTerm = normalize(rawInput);
  
  // Lógica de búsqueda principal
  this.filteredProducts = this.allProducts.filter(product => {
    const searchableText = getSearchableText(product);
    
    // Si el término de búsqueda comienza con '*', busca por ingrediente activo
    if (normalizedSearchTerm.startsWith('*')) {
      const ingredientTerm = normalizedSearchTerm.slice(1).trim();
      return normalize(product.activeIngredients).includes(ingredientTerm);
    } 
  
    return searchableText.includes(normalizedSearchTerm);
  });
}

 back(): void {
      this.router.navigate(['/home']);
  }

 goToDetail(id: number): void {
  const routeBase = "technical/notes";
    this.navegateService.goToDetail(routeBase, id, routeBase);
  }


}
