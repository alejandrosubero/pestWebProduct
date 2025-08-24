import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MixProducTechNote } from '../models/MixProducTechNote.model';

@Injectable({
  providedIn: 'root' // Disponible en toda la aplicación como un singleton.
})
export class MixProductTechNoteService {

  // Usamos inject() para inyectar HttpClient (práctica moderna en Angular 17)
  private http = inject(HttpClient);

  // Ruta al archivo JSON dentro de la carpeta 'assets'
  private techNotesUrl = 'assets/data/mix-notes.json';

  getMixProductTechNotes(): Observable<MixProducTechNote[]> {
    return this.http.get<MixProducTechNote[]>(this.techNotesUrl);
  }
}