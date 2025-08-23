import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TechnicalProductService } from '../../../../services/TechnicalProductService';
import { NavegateService } from '../../../../services/navegate.service';
import { Router } from '@angular/router';
import { TechnicalProduct } from '../../../../models/technical_product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

type ComparableKeys = keyof TechnicalProduct;

@Component({
  selector: 'app-compare-products',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule
  ],
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.scss']
})
export class CompareProductsComponent implements OnInit {

  products: TechnicalProduct[] = [];
  allProducts: TechnicalProduct[] = [];
  quickCompare = false;
  selectedProducts: (TechnicalProduct | null)[] = [null, null];
  title: string = 'Comparator Technical Notes'

  fields: ComparableKeys[] = [
    'productOverview',
    'activeIngredients',
    'howItWorks',
    'spectrumOfControl',
    'applicationRates',
    'applicationTips',
    'Advantages',
    'safetyEnvironmentalNotes',
    'physicalChemicalProperties'
  ];

  constructor(
    private technicalProductService: TechnicalProductService,
    private navegateService: NavegateService,
    private router: Router
  ) {
    this.getAllProducts();
  }

  getAllProducts(): void {
    const products = this.technicalProductService.getAllTechnicalProducts();
    if (products) {
       const sortedProducts  = products.sort((a, b) => a.title.localeCompare(b.title));
      this.allProducts = sortedProducts;
      this.products = this.allProducts;
    }
  }

  ngOnInit(): void { }

  selectProduct(product: TechnicalProduct): void {
    if (this.selectedProducts.includes(product)) {
      this.selectedProducts = this.selectedProducts.filter(p => p !== product);
    } else if (this.selectedProducts.length < 2) {
      this.selectedProducts.push(product);
    }
  }

  toggleQuickCompare(): void {
    this.quickCompare = !this.quickCompare;
  }

  isDifferent(field: ComparableKeys): boolean {
    if (this.selectedProducts.length !== 2) return false;

    const firstValue = this.selectedProducts[0]?.[field] || '';
    const secondValue = this.selectedProducts[1]?.[field] || '';
    return firstValue !== secondValue;
  }


  countDifferences(): number {
    return this.fields.filter(field => this.isDifferent(field)).length;
  }


  // get displayedColumns(): string[] {
  //   return this.nonNullSelectedProducts.map(p => p.title || 'unknown');
  // }
  get displayedColumns(): string[] {
  return this.nonNullSelectedProducts.map((p, i) => 'col-' + p.id + '-' + i);
}

  get nonNullSelectedProducts(): TechnicalProduct[] {
    return this.selectedProducts.filter((p): p is TechnicalProduct => p !== null);
  }


  formatFieldName(field: string): string {
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  back(): void {
    this.router.navigate(['/home']);
  }

}
