import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {

  private readonly VERSION_KEY = 'app_version';
  private currentVersion: string | null = null;
  private checkIntervalMs = 5 * 60 * 1000; // cada 5 minutos

  constructor(private http: HttpClient) {
    this.start();
  }


async start(){
  try {
    const tempVersion = localStorage.getItem(this.VERSION_KEY);
    if (tempVersion != undefined && tempVersion != null && tempVersion != '') {
      this.currentVersion = tempVersion;
    } else {
      this.checkVersion();
    }
  } catch (error){
    console.log('Error to check Version... ');
    this.initVersionCheck();
  }
}


  /**
   * Inicia la verificación de versión y opcionalmente la comprobación periódica.
   */
  async initVersionCheck(periodic = true): Promise<void> {
    await this.checkVersion();

    if (periodic) {
      setInterval(() => {
        this.checkVersion();
      }, this.checkIntervalMs);
    }
  }

  /**
   * Verifica si hay una nueva versión y fuerza la recarga si es necesario.
   */
  private async checkVersion(): Promise<void> {
    try {
      const versionData = await firstValueFrom(
        this.http.get<{ version: string }>('/assets/config/version.json', {
          headers: { 'Cache-Control': 'no-cache' }
        })
      );

      const newVersion = versionData.version;
      this.currentVersion = newVersion;

      const storedVersion = localStorage.getItem(this.VERSION_KEY);

      if (storedVersion && storedVersion !== newVersion) {
        console.log(`Nueva versión detectada (${newVersion}). Recargando...`);
        localStorage.setItem(this.VERSION_KEY, newVersion);
        window.location.reload();
      } else if (!storedVersion) {
        localStorage.setItem(this.VERSION_KEY, newVersion);
      }
    } catch (err) {
      console.error('Error al verificar la versión:', err);
    }
  }

  /**
   * Devuelve la versión actual cargada.
   */
  getVersion(): string | null {
    return this.currentVersion || localStorage.getItem(this.VERSION_KEY);
  }
}
