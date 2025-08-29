
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MixProducTechNote } from '../models/MixProducTechNote.model';

@Injectable({
  providedIn: 'root'
})
export class MixProductTechNoteService {

  private http = inject(HttpClient);

  private readonly mixSignal = signal<MixProducTechNote[]>([]);
  public readonly mixData = computed(() => this.mixSignal());

  private techNotesUrl = 'assets/config/mixp.json';
  private configUrl: string = 'assets/config/mixp.json';



  getMixProductTechNotes(): Observable<MixProducTechNote[]> {
    return this.http.get<MixProducTechNote[]>(this.techNotesUrl);
  }


  public loadMixData(): void {
    if (this.mixSignal.length === 0) {
      this.http.get<MixProducTechNote[]>(this.configUrl)
        .pipe(catchError(err => {
          console.error('Error loading mixp.json:', err);
          return of([]);
        })
        ).subscribe((mix) => {
          this.mixSignal.set(mix);
        });
    }
  }



}