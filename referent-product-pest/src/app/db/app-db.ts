// src/app/db/app-db.ts
import Dexie, { Table } from 'dexie';
import { IProduct, IPackage, IUsageRecord, Formulation, Product, } from '../models/interfaces';

export class AppDB extends Dexie {
  products!: Table<IProduct, number>;
  packages!: Table<IPackage, string>;
  usageRecords!: Table<IUsageRecord, number>;
  formulations!: Table<Formulation, number>;
  legacyProducts!: Table<Product, number>;

  constructor() {
    super('PestControlDB');

    this.version(1).stores({
      products: '++id, name, type',
      packages: '++id, productId, locationId, status',
      usageRecords: '++id, productId, usageDate',
      formulations: '++id, title',
      legacyProducts: '++id, name',
    });
  }
}

export const db = new AppDB();
