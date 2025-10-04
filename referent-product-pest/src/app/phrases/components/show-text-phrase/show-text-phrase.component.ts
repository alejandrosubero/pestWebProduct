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
import { Phrase } from '../../../models/interfaces';
import { DBService } from '../../../services/db.service';

@Component({
  selector: 'app-show-text-phrase',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './show-text-phrase.component.html',
  styleUrls: ['./show-text-phrase.component.scss']
})
export class ShowTextPhraseComponent implements OnInit {
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
      this.phrases = (all ?? []).filter(p => p.isComplete === false);
    } catch (err) {
      console.error(err);
      this.snack.open('Error cargando frases', 'Cerrar', { duration: 2000 });
    } finally {
      this.loading = false;
    }
  }

  selectPhrase(p: Phrase) {
    this.phraseService.setCurrentString(p.phrase);
    this.router.navigate(['/work-text-phrase']);
  }

  async deletePhrase(p: Phrase | undefined) {
    if (!p?.id) return;
    const ok = confirm('¿Eliminar frase?');
    if (!ok) return;
    try {
      await this.db.deletePhrase(p.id);
      this.snack.open('Frase eliminada', 'OK', { duration: 1500 });
      await this.load();
    } catch (err) {
      console.error(err);
      this.snack.open('Error eliminando', 'Cerrar', { duration: 2000 });
    }
  }
}
