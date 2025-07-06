// src/app/services/usage-record-store.service.ts
import { Injectable, signal } from '@angular/core';
import { IUsageRecord } from '../models/interfaces';
import { db } from '../db/app-db'; // Asegúrate de que db.usageRecords exista

@Injectable({ providedIn: 'root' })
export class UsageRecordStoreService {

  private readonly _record = signal<IUsageRecord | null>(null);
  readonly record = this._record;

  constructor() {
    this.load(); // Cargar automáticamente al iniciar
  }

  // 🔄 Cargar el único registro (si existe)
  async load(): Promise<void> {
    const all = await db.usageRecords.toArray();
    this._record.set(all.length ? all[0] : null);
  }

  // ➕ Crear solo si no existe uno
  async createIfNotExists(newRecord: IUsageRecord): Promise<void> {
    const count = await db.usageRecords.count();
    if (count === 0) {
      await db.usageRecords.add(newRecord);
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

    // Si no hay ID definido
    if (!updated.id) {
      const current = this._record();

      if (!current) {
        //Buscar directamente en la base de datos
        const all = await db.usageRecords.toArray();
        if (all.length === 0) {
          // ➕ No hay registros: crear uno nuevo
          await db.usageRecords.add(updated);
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
    await db.usageRecords.put(updated);
    await this.load();
  }


  // 🔁 Eliminar el registro actual (opcional)
  async clear(): Promise<void> {
    await db.usageRecords.clear();
    this._record.set(null);
  }
}
