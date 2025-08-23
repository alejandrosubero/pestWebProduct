import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { PestData } from '../../models/pestdata.model';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FavoritesService } from '../../services/favorites.service';
import { NavegateService } from '../../services/navegate.service';
import { ProductStoreService } from '../../services/product-store.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchInfoSheetComponent } from '../share/search-info-sheet/search-info-sheet.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TechnicalProductService } from '../../services/TechnicalProductService';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatListModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  @ViewChild('drawer') drawer!: MatSidenav;

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  uniquePests: string[] = [];
  searchTerm: string = '';
  version: string = 'v3.0.1';
  private configUrl: string = 'assets/config/products.json';
  errorMessage: string = '';
  isWideScreen = true;
  pestName: string = '';
  public isFavoriteView: boolean = false;
  private favorites: any[] = [];
  private productStoreService = inject(ProductStoreService);
  // private technicalProductService = inject(TechnicalProductService);

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private productService: ProductService,
    private favService: FavoritesService,
    private navegateService: NavegateService,
    private bottomSheet: MatBottomSheet,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,) {
           this.matIconRegistry.addSvgIcon('tecnnical', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/tecnnical.svg'));
     }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isWideScreen = !result.matches;
      });

    const prolist = this.productService.products();
    this.allProducts = prolist;
    this.filteredProducts = prolist;
    if (prolist != undefined && prolist != null && prolist.length > 0) {
      this.getUniquePests(this.allProducts);
    }

    this.checkFavorites();
    this.productStoreService.loadAll();
    // this.technicalProductService.technicalProducts();
    // const productsTechnical = this.technicalProductService.getAllTechnicalProducts();
  }

  openSearchInfo(): void {
    this.bottomSheet.open(SearchInfoSheetComponent);
  }

  checkFavorites() {
    this.favorites = this.favService.getFavorites();
    if (this.favorites != undefined && this.favorites != null && this.favorites.length > 0) {
      this.isFavoriteView = true;
      const pproducts: Product[] = this.favorites;
      const pforname = pproducts.filter(x => x.name === "ZENPROX® EC");
    }
  }

  getUniquePests(products: Product[]) {
    const pestSet = new Set<string>();
    for (const product of products) {
      product.pestsControlled.forEach(pest => pestSet.add(pest));
    }
    this.uniquePests = Array.from(pestSet);
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

   goTecnnical(): void {
     const routeBase = "technical/notes";
    this.router.navigate([routeBase]);
  }


  getPestName(phrase: string): string {
    const normalize = (text: string): string =>
      text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const searchTerm = normalize(phrase);

    for (const product of this.filteredProducts) {
      for (const pest of product.pestsControlled) {
        if (normalize(pest).includes(searchTerm)) {
          return pest;
        }
      }
    }
    return '';
  }


  getPestToGo(phrase: string, id: number): string {
    const product = this.filteredProducts.find(p => p.id === id);

    if (!product) return '';
    const normalize = (text: string): string =>
      text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const searchTerm = normalize(phrase);

    for (const pest of product.pestsControlled) {
      if (normalize(pest).includes(searchTerm)) {
        return pest;
      }
    }
    return '';
  }


  buscarCoincidencias(): void {
    const rawInput = this.searchTerm.trim().toLowerCase();

    const normalize = (text: string): string =>
      text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const getTextFields = (product: any): string => {
      const name = normalize(product.name);
      const treatment = normalize(product.applicationTreatment);
      const pests = normalize(product.pestsControlled.join(' '));

      return `${name} ${treatment} ${pests}`;
    };

    const getTextFieldsProduct = (product: any): string => {
      const name = normalize(product.name);
      return `${name}`;
    };

    //  Utilidad para crear una expresión de coincidencia exacta por palabra/frase
    const createExactMatchRegex = (phrase: string): RegExp => {
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`\\b${escaped}\\b`, 'i'); // \b => límite de palabra
    };

    // Nuevo caso: búsqueda por ingrediente activo si empieza con "*"
    if (rawInput.startsWith('*')) {
      const searchTerm = normalize(rawInput.slice(1).trim());
      if (searchTerm.length >= 2) {
        this.filteredProducts = this.allProducts.filter(product => {
          const ingredients = normalize(product.activeIngredients || '');
          return ingredients.includes(searchTerm);
        });
      } else {
        this.filteredProducts = [];
      }

    } else if (rawInput.includes('&')) {
      const searchTerm = normalize(rawInput.split('&')[1]?.trim() || '');
      if (searchTerm.length >= 2) {
        this.filteredProducts = this.allProducts.filter(product => {
          const fields = getTextFieldsProduct(product);
          return fields.includes(searchTerm);
        });
      } else {
        this.filteredProducts = [];
      }

    } else if (rawInput.includes('-')) {

      let leftRawi = '';
      let rightRawi = '';

      const [leftRaw, rightRaw] = rawInput.split('-').map(s => normalize(s.trim()));

      leftRawi = leftRaw;
      rightRawi = rightRaw;

      const leftRegex = createExactMatchRegex(leftRaw);
      const rightRegex = createExactMatchRegex(rightRaw);

      this.filteredProducts = this.allProducts.filter(product => {
        const fields = getTextFields(product);
        return leftRegex.test(fields) && rightRegex.test(fields);
      });

      this.pestName = this.getPestName(rightRawi);
      if (this.pestName === '') {
        this.pestName = this.getPestName(leftRawi);
      }

    } else {
      //  Caso: búsqueda simple (una frase completa, OR)
      const terms = normalize(rawInput).split(/\s+/);
      const phrase = terms.join(' ').trim();
      const regex = createExactMatchRegex(phrase);

      this.filteredProducts = this.allProducts.filter(product => {
        const fields = getTextFields(product);
        return regex.test(fields);
      });
      this.pestName = this.getPestName(rawInput);
    }
  }


  seleccionarPest(pest: string): void {
    this.isWideScreen = false;
    if (!this.isWideScreen) {
      this.drawer.close();
    }

    this.searchTerm = pest;
    this.buscarCoincidencias();
    this.pestName = pest;
  }

  goToDetail(id: number): void {
    let name = this.getPestToGo(this.pestName, id)
    this.navegateService.goToDetail('product', id, name);
  }

  goFavorites(): void {
    this.navegateService.goFavorites('favorites', 1);
  }

}

