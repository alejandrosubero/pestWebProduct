import { Injectable } from '@angular/core';
import { AppDB } from '../db/app-db'; // importa tu clase AppDB
import { IProduct } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
    private _db: AppDB;

    constructor() {
        this._db = new AppDB();
    }

    // Getter para acceder fácilmente a la base desde otros servicios
    get db(): AppDB {
        return this._db;
    }

    // Método para resetear toda la base
    async resetDatabase(): Promise<void> {
        await this._db.delete();
        this._db = new AppDB();
        await this._db.open();
    }

    // Ejemplo de método que antes usaba "db"
    async addProduct(product: IProduct): Promise<number> {
        return await this._db.products.add(product);
    }

    async getAllProducts(): Promise<IProduct[]> {
        return await this._db.products.toArray();
    }
}
