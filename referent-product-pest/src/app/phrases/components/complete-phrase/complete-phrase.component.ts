import { Component, OnInit } from '@angular/core';
import { PhraseService } from '../../services/phrase.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Phrase } from '../../../models/interfaces';
import { DBService } from '../../../services/db.service';

@Component({
  selector: 'app-complete-phrase',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './complete-phrase.component.html',
  styleUrls: ['./complete-phrase.component.scss']
})
export class CompletePhraseComponent implements OnInit {
  phrases: Phrase[] = [];
  loading = false;

  constructor(
    private db: DBService,
    private phraseService: PhraseService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.loading = true;
    try {
      const all = await this.db.getAllPhrase();
      this.phrases = (all ?? []).filter(p => p.isComplete === true);
    } catch (err) {
      console.error(err);
      this.snack.open('Error cargando completas', 'Cerrar', { duration: 2000 });
    } finally {
      this.loading = false;
    }
  }

  selectPhrase(p: Phrase) {
    this.phraseService.setCurrentString(p.phrase);
    this.router.navigate(['/work-text-phrase']);
  }

  copyPhrase(p: Phrase | undefined) {
    if (!p) return;
    navigator.clipboard?.writeText(p.phrase).then(() => {
      this.snack.open('Copiado al portapapeles', 'OK', { duration: 1200 });
    }).catch(() => {
      this.snack.open('No se pudo copiar', 'Cerrar', { duration: 1500 });
    });
  }
}
