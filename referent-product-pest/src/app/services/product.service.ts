// src/app/services/product.service.ts
import { Injectable, computed, effect, signal } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../models/product.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly productsSignal = signal<Product[]>([]);
  public readonly products = computed(() => this.productsSignal());
  private configUrl: string = 'assets/config/products.json';

  constructor(private http: HttpClient) {
    this.loadProducts();
  }


  public loadProducts(): void {
    if (this.productsSignal.length === 0) {
      this.http
        .get<Product[]>(this.configUrl)
        .pipe(
          catchError(err => {
            console.error('Error loading productos.json:', err);
            return of([]);
          })
        )
        .subscribe((products) => {
          this.productsSignal.set(products);
        });
    }
  }

  getProductById(id: number): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }
}
