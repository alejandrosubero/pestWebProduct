import { inject, Injectable, signal } from '@angular/core';
import { IUsageRecord } from '../models/interfaces';
import { DatabaseService } from '../db/database.service';
// import { db } from '../db/app-db'; 

@Injectable({ providedIn: 'root' })
export class UsageRecordStoreService {

private databaseService = inject(DatabaseService);


  private readonly _record = signal<IUsageRecord | null>(null);
  readonly record = this._record;

  constructor() {
    this.load(); 
  }

  async load(): Promise<void> {
    const all = await this.databaseService.db.usageRecords.toArray();

    this._record.set(all.length ? all[0] : null);
  }


  async createIfNotExists(newRecord: IUsageRecord): Promise<void> {
    const count = await this.databaseService.db.usageRecords.count();
    if (count === 0) {
      await this.databaseService.db.usageRecords.add(newRecord);
      await this.load();
    } else {
      console.warn('Ya existe un registro de uso. No se creó uno nuevo.');
    }
  }

   async update(updated: IUsageRecord): Promise<void> {
    //Asignar usageDate si no se provee
    if (!updated.usageDate) {
      updated.usageDate = new Date().toISOString();
    }
    
      const current = this._record();
    // Si no hay ID definido
    if (!updated.id) {
      this.clear();
      await this.databaseService.db.usageRecords.add(updated);
      await this.load();
      return;
    }
    //Actualizar o reemplazar el registro existente
    await this.databaseService.db.usageRecords.put(updated);
    await this.load();
  }

  async update1(updated: IUsageRecord): Promise<void> {
    //Asignar usageDate si no se provee
    if (!updated.usageDate) {
      updated.usageDate = new Date().toISOString();
    }

    // Si no hay ID definido
    if (!updated.id) {
      const current = this._record();

      if (!current) {
        //Buscar directamente en la base de datos
        const all = await this.databaseService.db.usageRecords.toArray();
        if (all.length === 0) {
          // ➕ No hay registros: crear uno nuevo
          await this.databaseService.db.usageRecords.add(updated);
          await this.load();
          return;
        } else {
          // Ya hay uno: usar su ID para actualizarlo
          updated.id = all[0].id;
        }
      } else {
        //Hay uno en memoria: usar su ID
        updated.id = current.id;
      }
    }
    //Actualizar o reemplazar el registro existente
    await this.databaseService.db.usageRecords.put(updated);
    await this.load();
  }


  // 🔁 Eliminar el registro actual (opcional)
  async clear(): Promise<void> {
    await this.databaseService.db.usageRecords.clear();
    this._record.set(null);
  }
}
