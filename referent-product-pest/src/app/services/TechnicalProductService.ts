import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TechnicalProduct } from '../models/technical_product.model';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicalProductService {

  // Signal inicial con array vacío
  private readonly productsSignal = signal<TechnicalProduct[]>([]);

  // Computed que expone los productos
  public readonly technicalProducts = computed(() => this.productsSignal());

  private configUrl: string = '/assets/config/technicalAnalysis1.json';

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  public loadProducts(): void {
    // ✅ Corrección: ahora sí evalúa el valor del signal
    if (this.productsSignal().length === 0) {
      this.http
        .get<TechnicalProduct[]>(this.configUrl)
        .pipe(
          catchError(err => {
            console.error('Error loading technicalAnalysis.json:', err);
            return of([]);
          })
        )
        .subscribe((products) => {
          this.productsSignal.set(products);
        });
    }
  }

  // Buscar producto por id
  getTechnicalProductBySourceFile(id: number): TechnicalProduct | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  // Devolver todos los productos
  getAllTechnicalProducts(): TechnicalProduct[] {
    return this.technicalProducts();
  }
}


// import { computed, Injectable, signal, WritableSignal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { TechnicalProduct } from '../models/technical_product.model';
// import { catchError, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TechnicalProductService {

//   private readonly productsSignal = signal<TechnicalProduct[]>([]);
//   public readonly technicalProducts = computed(() => this.productsSignal());
//   private configUrl: string = 'assets/config/technicalAnalysis.json';

//   constructor(private http: HttpClient) {
//     this.loadProducts();
//   }

//   public loadProducts(): void {
//     if (this.productsSignal.length === 0) {
//       this.http
//         .get<TechnicalProduct[]>(this.configUrl)
//         .pipe(
//           catchError(err => {
//             console.error('Error loading productos.json:', err);
//             return of([]);
//           })
//         )
//         .subscribe((products) => {
//           this.productsSignal.set(products);
//         });
//     }
//   }

//    getTechnicalProductBySourceFile(id: number): TechnicalProduct | undefined {
//     return this.productsSignal().find(p => p.id === id);
//   }

//   getAllTechnicalProducts(): TechnicalProduct[] {
//     return this.technicalProducts();
//   }

// }