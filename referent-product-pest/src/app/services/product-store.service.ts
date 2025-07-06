// src/app/services/product-store.service.ts
import { Injectable, computed, inject, signal } from '@angular/core';
import { IProduct, IUsageRecord, PackageSummary } from '../models/interfaces';
import { DBService } from './db.service';
import { UsageRecordStoreService } from './usage-record-store.service';
import { from } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ProductStoreService {

  public usageRecordStoreService = inject(UsageRecordStoreService);
  private readonly db = inject(DBService);

  private readonly _products = signal<IProduct[]>([]);
  readonly products = computed(() => this._products());

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly filter = signal<string>(''); // 🔍 Filtro por nombre

  readonly filteredProducts = computed(() => {
    const keyword = this.filter().toLowerCase();
    return this.products().filter(p =>
      p.name.toLowerCase().includes(keyword)
    );
  });


  constructor() {
    this.loadAll();
  }


  async loadAll(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.db.getAllProducts();
      this._products.set(data);
    } catch (err) {
      this.error.set('Error al cargar los productos');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }


  async save(product: IProduct): Promise<void> {
    from(this.db.addProduct(product)).subscribe({
      next: (id) => {
        const idproduct = id;
        from(this.loadAll()).subscribe({
          next: (a) => {
            const pUpdate = this.findById(id);
            if (pUpdate != undefined && pUpdate != null) {
              pUpdate.package.productId = `${pUpdate.id}`;
              from(this.db.updateProduct(pUpdate)).subscribe({
                next: (p) => {
                  this.loadAll();
                }
              })
            }
          }
        });
      },
      error: (err) => console.error('Error:', err)
    });
  }


  async update(product: IProduct): Promise<void> {
    await this.db.updateProduct(product);
    await this.loadAll();
    console.log('produc',product);
  }



  async delete(id: number): Promise<void> {
    await this.db.deleteProduct(id);
    await this.loadAll();
  }


  findById(id: number): IProduct | undefined {
    return this._products().find(p => p.id === id);
  }


  setFilter(value: string): void {
    this.filter.set(value);
  }


  getPackageSummary(): PackageSummary {
    const data = this.products();
    let inUse = 0, inStock = 0, empty = 0;

    for (const p of data) {
      switch (p.package.status) {
        case 'In Use': inUse++; break;
        case 'In Stock': inStock++; break;
        case 'Empty': empty++; break;
      }
    }

    return { inUse, inStock, empty };
  }


  async applyUsage(record: IUsageRecord): Promise<void> {
    const product = this.findById(Number(record.productId));
    if (!product) {
      this.error.set('Producto no encontrado para aplicar uso');
      return;
    }

    product.package.currentQuantity -= record.quantityUsed;

    if (product.package.currentQuantity < 0) {
      product.package.currentQuantity = 0;
    }

    if (product.package.currentQuantity === 0) {
      product.package.status = 'Empty';
    }
    
    await this.db.updateProduct(product);
    await this.loadAll();
    await this.usageRecordStoreService.update(record);

  }


}

