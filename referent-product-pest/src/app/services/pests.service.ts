import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PestsService {

  private jsonUrl = 'assets/config/pests_List.json';

  // Signal privada que almacena la lista de plagas
  private pestsSignal = signal<string[]>([]);

  constructor(private http: HttpClient) {}


  loadPests(): void {
    this.http.get<{ pests: string[] }>(this.jsonUrl).pipe(
      map(response => response.pests)
    ).subscribe({
      next: (pests) => this.pestsSignal.set(pests),
      error: (err) => {
        console.error('Error cargando plagas:', err);
        this.pestsSignal.set([]); // fallback vacío
      }
    });
  }


  getPests() {
    return this.pestsSignal.asReadonly();
  }
}
