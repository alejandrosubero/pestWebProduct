import { inject, Injectable } from '@angular/core';

import { Formulation, IProduct, Phrase } from '../models/interfaces';
import { DatabaseService } from '../db/database.service';

@Injectable({ providedIn: 'root' })
export class DBService {

private databaseService = inject(DatabaseService);
// this.databaseService.db

constructor() { }

  // 🔹 Agregar producto con package y location anidados
  async addProduct(product: IProduct): Promise<number> {
    return await this.databaseService.db.products.add(product);
  }

  // 🔹 Obtener todos los productos
  async getAllProducts(): Promise<IProduct[]> {
    return await this.databaseService.db.products.toArray();
  }

  // 🔹 Obtener un producto por ID
  async getProductById(id: number): Promise<IProduct | undefined> {
    return await this.databaseService.db.products.get(id);
  }

  // 🔹 Actualizar producto (incluye package/location)
 async updateProduct(product: IProduct): Promise<number> {
  if (product.id === undefined) throw new Error('Product ID is required for update');
  return await this.databaseService.db.products.put(product); // ✅ put acepta product con id:number
}

  // 🔹 Eliminar producto por ID
  async deleteProduct(id: number): Promise<void> {
    await this.databaseService.db.products.delete(id);
  }

  // 🔹 Buscar productos por nombre (case-insensitive)
  async searchProductsByName(search: string): Promise<IProduct[]> {
    const all = await this.databaseService.db.products.toArray();
    return all.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🔹 Buscar por nombre del almacén (location.locationName)
  async searchProductsByLocationName(locationName: string): Promise<IProduct[]> {
    const all = await this.databaseService.db.products.toArray();
    return all.filter(p =>
      p.package?.location?.locationName?.toLowerCase().includes(locationName.toLowerCase())
    );
  }

  // 🔹 Obtener productos con stock bajo
  async getLowStockProducts(threshold: number): Promise<IProduct[]> {
    const all = await this.databaseService.db.products.toArray();
    return all.filter(p => p.package.currentQuantity < threshold);
  }


// ============================= Formulation ======================================================
  
  async addFormulations(formulations: Formulation): Promise<number> {
    return await this.databaseService.db.formulations.add(formulations);
  }

  async getAllFormulations(): Promise<Formulation[]> {
    return await this.databaseService.db.formulations.toArray();
  }

  async getFormulationsById(id: number): Promise<Formulation | undefined> {
    return await this.databaseService.db.formulations.get(id);
  }

 async updateFormulations(formulations: Formulation): Promise<number> {
  if (formulations.id === undefined) throw new Error('Product ID is required for update');
  return await this.databaseService.db.formulations.put(formulations);
}

  async deleteFormulations(id: number): Promise<void> {
    await this.databaseService.db.formulations.delete(id);
  }

// ============================= Phrase ======================================================
  
  async addPhrase(phrase: Phrase): Promise<number> {
    return await this.databaseService.db.phrase.add(phrase);
  }

  async getAllPhrase(): Promise<Phrase[]> {
    return await this.databaseService.db.phrase.toArray();
  }

  async getPhraseById(id: number): Promise<Phrase | undefined> {
    return await this.databaseService.db.phrase.get(id);
  }

 async updatePhrase(phrase: Phrase): Promise<number> {
  if (phrase.id === undefined) throw new Error('Product ID is required for update');
  return await this.databaseService.db.phrase.put(phrase);
}

  async deletePhrase(id: number): Promise<void> {
    await this.databaseService.db.phrase.delete(id);
  }

}
