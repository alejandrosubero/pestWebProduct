import { Component } from '@angular/core';
import { PhraseService } from '../../services/phrase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DBService } from '../../../services/db.service';
import { Phrase } from '../../../models/interfaces';

@Component({
  selector: 'app-main-phrase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './main-phrase.component.html',
  styleUrls: ['./main-phrase.component.scss']
})
export class MainPhraseComponent {
  textarea = '';
  loading = false;

  constructor(
    public phraseService: PhraseService,
    private db: DBService,
    private snack: MatSnackBar
  ) {}

  generateIntoTextarea() {
    const text = this.phraseService.generateTxt();
    this.textarea = text;
    this.snack.open('Texto generado en el editor', 'OK', { duration: 1200 });
  }

  async getOneComplete() {
    this.loading = true;
    try {
      const all = await this.db.getAllPhrase();
      const complete = (all ?? []).filter(p => p.isComplete === true);
      if (!complete.length) {
        this.snack.open('No hay frases completas guardadas', 'OK', { duration: 1500 });
        return;
      }
      const chosen = complete[Math.floor(Math.random() * complete.length)];
      this.textarea = chosen.phrase;
      this.snack.open('Frase completa cargada', 'OK', { duration: 1200 });
    } catch (err) {
      console.error(err);
      this.snack.open('Error cargando frases completas', 'Cerrar', { duration: 2000 });
    } finally {
      this.loading = false;
    }
  }

  async saveAsComplete() {
    const trimmed = (this.textarea ?? '').trim();
    if (!trimmed) {
      this.snack.open('No hay texto para guardar', 'Cerrar', { duration: 1500 });
      return;
    }
    try {
      const p: Phrase = { phrase: trimmed, isComplete: true };
      await this.db.addPhrase(p);
      this.snack.open('Guardado como frase completa', 'OK', { duration: 1500 });
    } catch (err) {
      console.error(err);
      this.snack.open('Error guardando', 'Cerrar', { duration: 2000 });
    }
  }
}
