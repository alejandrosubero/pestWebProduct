import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { PestData } from '../../models/pestdata.model';



// interface Product {
//   id: number;
//   name: string;
//   activeIngredients: string;
//   applicationTreatment: string;
//   pestsControlled: string[];
// }


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
  
    MatListModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  uniquePests: string[] = [];
  searchTerm: string = '';
  version: string = 'v1.0.0';
  private configUrl: string = 'assets/config/products.json';
  errorMessage: string = '';
  isWideScreen = true;
  pestName: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private productService : ProductService) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isWideScreen = !result.matches;
      });

      const prolist = this.productService.products(); 
      this.allProducts = prolist;
      this.filteredProducts = prolist;
        if(prolist != undefined && prolist != null && prolist.length > 0){
          this.getUniquePests(this.allProducts);
        }

    // this.http.get<Product[]>(this.configUrl).subscribe({
    //   next: (products) => {
    //     this.allProducts = products;
    //     this.filteredProducts = products;

    //     const pestSet = new Set<string>();
    //     for (const product of products) {
    //       product.pestsControlled.forEach(pest => pestSet.add(pest));
    //     }
    //     this.uniquePests = Array.from(pestSet);
    //   },
    //   error: () => {
    //     console.error('Error cargando productos.json');
    //   },
    // });
  }


getUniquePests(products : Product[]){
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

  buscarCoincidencias1(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.pestsControlled.some(pest => pest.toLowerCase().includes(term) ||
        product.applicationTreatment.toLowerCase().includes(term)
      )
    );
  }




  searchdouble(): void {
    const term = this.searchTerm.toLowerCase().trim();

    // Verificamos si hay un "-" para hacer búsqueda con AND
    if (term.includes('-')) {
      const [first, second] = term.split('-').map(t => t.trim());

      this.filteredProducts = this.allProducts.filter(product => {
        const name = product.name.toLowerCase();
        const treatment = product.applicationTreatment.toLowerCase();
        const pests = product.pestsControlled.map(p => p.toLowerCase());

        const matchFirst =
          name.includes(first) ||
          treatment.includes(first) ||
          pests.some(p => p.includes(first));

        const matchSecond =
          name.includes(second) ||
          treatment.includes(second) ||
          pests.some(p => p.includes(second));

        return matchFirst && matchSecond;
      });

    } else {
      // Búsqueda OR como ya hacías
      this.filteredProducts = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.applicationTreatment.toLowerCase().includes(term) ||
        product.pestsControlled.some(p => p.toLowerCase().includes(term))
      );
    }
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

    if (rawInput.includes('&')) {
      const searchTerm = normalize(rawInput.split('&')[1]?.trim() || '');
      if (searchTerm.length >= 2) {
        this.filteredProducts = this.allProducts.filter(product => {
          const fields = getTextFieldsProduct(product);
          return fields.includes(searchTerm);
        });
      } else {
        this.filteredProducts = []; // Si tiene menos de 2 letras, no se muestra nada
      }

  // 🔍 Caso: búsqueda con "-"
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
    this.searchTerm = pest;
    this.buscarCoincidencias();
    this.pestName = pest;
  }

  goToDetail(id: number): void {
    let name = this.getPestToGo(this.pestName, id)
    const pestData: PestData = {
      id: id,
      name: name
    };
    this.router.navigate(['/product', id], {
      state: { data: pestData }
    });
  }

  goFavorites(): void {
    this.router.navigate(['/favorites']);
  }
}
