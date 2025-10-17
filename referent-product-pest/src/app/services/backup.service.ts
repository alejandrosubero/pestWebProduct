
// src/app/services/backup.service.ts
import { inject, Injectable } from '@angular/core';
import { DatabaseService } from '../db/database.service';

@Injectable({ providedIn: 'root' })
export class BackupService {

  private databaseService = inject(DatabaseService);
  // this.databaseService.db
  
  constructor() {}

  // 📌 Devuelve todos los datos como JSON
  async exportAll(): Promise<any> {
    return {
      products: await this.databaseService.db.products.toArray(),
      packages: await this.databaseService.db.packages.toArray(),
      usageRecords: await this.databaseService.db.usageRecords.toArray(),
      formulations: await this.databaseService.db.formulations.toArray(),
      legacyProducts: await this.databaseService.db.legacyProducts.toArray(),
    };
  }

  // 📌 Devuelve un Blob listo para descargar o compartir
  async getBackupBlob(): Promise<Blob> {
    const data = await this.exportAll();
    const jsonStr = JSON.stringify(data, null, 2);
    return new Blob([jsonStr], { type: 'application/json' });
  }

  // 📌 Importa datos desde un objeto JSON (ignora IDs)
  async importAll(json: any): Promise<void> {
    if (json.products) {
      for (const p of json.products) {
        delete p.id;
        await this.databaseService.db.products.add(p);
      }
    }
    if (json.packages) {
      for (const pkg of json.packages) {
        delete pkg.id;
        await this.databaseService.db.packages.add(pkg);
      }
    }
    if (json.usageRecords) {
      for (const r of json.usageRecords) {
        delete r.id;
        await this.databaseService.db.usageRecords.add(r);
      }
    }
    if (json.formulations) {
      for (const f of json.formulations) {
        delete f.id;
        await this.databaseService.db.formulations.add(f);
      }
    }
    if (json.legacyProducts) {
      for (const lp of json.legacyProducts) {
        delete lp.id;
        await this.databaseService.db.legacyProducts.add(lp);
      }
    }
  }

  // 📌 Borra toda la base de datos
  async clearAll(): Promise<void> {
    await this.databaseService.resetDatabase();
    window.location.reload();
  }
}


