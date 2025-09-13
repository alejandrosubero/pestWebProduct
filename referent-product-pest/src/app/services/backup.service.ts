
// src/app/services/backup.service.ts
import { Injectable } from '@angular/core';
import { db } from '../db/app-db';

@Injectable({ providedIn: 'root' })
export class BackupService {

  constructor() {}

  // 📌 Devuelve todos los datos como JSON
  async exportAll(): Promise<any> {
    return {
      products: await db.products.toArray(),
      packages: await db.packages.toArray(),
      usageRecords: await db.usageRecords.toArray(),
      formulations: await db.formulations.toArray(),
      legacyProducts: await db.legacyProducts.toArray(),
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
        await db.products.add(p);
      }
    }
    if (json.packages) {
      for (const pkg of json.packages) {
        delete pkg.id;
        await db.packages.add(pkg);
      }
    }
    if (json.usageRecords) {
      for (const r of json.usageRecords) {
        delete r.id;
        await db.usageRecords.add(r);
      }
    }
    if (json.formulations) {
      for (const f of json.formulations) {
        delete f.id;
        await db.formulations.add(f);
      }
    }
    if (json.legacyProducts) {
      for (const lp of json.legacyProducts) {
        delete lp.id;
        await db.legacyProducts.add(lp);
      }
    }
  }

  // 📌 Borra toda la base de datos
  async clearAll(): Promise<void> {
    await db.delete();
    window.location.reload();
  }
}



// // src/app/services/backup.service.ts
// import { Injectable } from '@angular/core';
// import { db } from '../db/app-db';

// @Injectable({ providedIn: 'root' })
// export class BackupService {

//   constructor() {}

//   // 📌 Exportar todas las tablas a un JSON y descargar
//   async exportData(): Promise<void> {
//     const data = {
//       products: await db.products.toArray(),
//       packages: await db.packages.toArray(),
//       usageRecords: await db.usageRecords.toArray(),
//       formulations: await db.formulations.toArray(),
//       legacyProducts: await db.legacyProducts.toArray(),
//     };

//     const jsonStr = JSON.stringify(data, null, 2);
//     const blob = new Blob([jsonStr], { type: 'application/json' });
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `pestcontrol-backup-${new Date().toISOString()}.json`;
//     a.click();

//     window.URL.revokeObjectURL(url);
//   }

//   // 📌 Importar datos desde un JSON (ignora IDs)
//   async importData(file: File): Promise<void> {
//     const text = await file.text();
//     const json = JSON.parse(text);

//     // ✅ Insertar sin ID para que Dexie cree uno nuevo
//     if (json.products) {
//       for (const p of json.products) {
//         delete p.id;
//         await db.products.add(p);
//       }
//     }

//     if (json.packages) {
//       for (const pkg of json.packages) {
//         delete pkg.id;
//         await db.packages.add(pkg);
//       }
//     }

//     if (json.usageRecords) {
//       for (const record of json.usageRecords) {
//         delete record.id;
//         await db.usageRecords.add(record);
//       }
//     }

//     if (json.formulations) {
//       for (const f of json.formulations) {
//         delete f.id;
//         await db.formulations.add(f);
//       }
//     }

//     if (json.legacyProducts) {
//       for (const lp of json.legacyProducts) {
//         delete lp.id;
//         await db.legacyProducts.add(lp);
//       }
//     }
//   }

//   // 📌 Borrar completamente la base de datos
//   async clearDatabase(): Promise<void> {
//     await db.delete(); // Borra toda la DB
//     window.location.reload(); // Recargar la app para reiniciar estado
//   }



// async getBackupBlob(): Promise<Blob> {
//   const data = {
//     products: await db.products.toArray(),
//     packages: await db.packages.toArray(),
//     usageRecords: await db.usageRecords.toArray(),
//     formulations: await db.formulations.toArray(),
//     legacyProducts: await db.legacyProducts.toArray(),
//   };
//   const jsonStr = JSON.stringify(data, null, 2);
//   return new Blob([jsonStr], { type: 'application/json' });
// }



// }
