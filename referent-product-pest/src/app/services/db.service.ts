import { Injectable } from '@angular/core';
import { db } from '../db/app-db';
import { Formulation, IProduct } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class DBService {

constructor() { }

  // 🔹 Agregar producto con package y location anidados
  async addProduct(product: IProduct): Promise<number> {
    return await db.products.add(product);
  }

  // 🔹 Obtener todos los productos
  async getAllProducts(): Promise<IProduct[]> {
    return await db.products.toArray();
  }

  // 🔹 Obtener un producto por ID
  async getProductById(id: number): Promise<IProduct | undefined> {
    return await db.products.get(id);
  }

  // 🔹 Actualizar producto (incluye package/location)
 async updateProduct(product: IProduct): Promise<number> {
  if (product.id === undefined) throw new Error('Product ID is required for update');
  return await db.products.put(product); // ✅ put acepta product con id:number
}

  // 🔹 Eliminar producto por ID
  async deleteProduct(id: number): Promise<void> {
    await db.products.delete(id);
  }

  // 🔹 Buscar productos por nombre (case-insensitive)
  async searchProductsByName(search: string): Promise<IProduct[]> {
    const all = await db.products.toArray();
    return all.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🔹 Buscar por nombre del almacén (location.locationName)
  async searchProductsByLocationName(locationName: string): Promise<IProduct[]> {
    const all = await db.products.toArray();
    return all.filter(p =>
      p.package?.location?.locationName?.toLowerCase().includes(locationName.toLowerCase())
    );
  }

  // 🔹 Obtener productos con stock bajo
  async getLowStockProducts(threshold: number): Promise<IProduct[]> {
    const all = await db.products.toArray();
    return all.filter(p => p.package.currentQuantity < threshold);
  }


// ============================= Formulation ======================================================
  
  async addFormulations(formulations: Formulation): Promise<number> {
    return await db.formulations.add(formulations);
  }

  async getAllFormulations(): Promise<Formulation[]> {
    return await db.formulations.toArray();
  }

  async getFormulationsById(id: number): Promise<Formulation | undefined> {
    return await db.formulations.get(id);
  }

 async updateFormulations(formulations: Formulation): Promise<number> {
  if (formulations.id === undefined) throw new Error('Product ID is required for update');
  return await db.formulations.put(formulations);
}

  async deleteFormulations(id: number): Promise<void> {
    await db.formulations.delete(id);
  }



}
