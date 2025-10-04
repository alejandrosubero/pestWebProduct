import { Component } from '@angular/core';
import { PhraseService } from '../../services/phrase.service';
import { computed } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';


import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { DBService } from '../../../services/db.service';
import { Phrase } from '../../../models/interfaces';

@Component({
  selector: 'app-work-text-phrase',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    DragDropModule,
    MatListModule,
    ClipboardModule
  ],
  templateUrl: './work-text-phrase.component.html',
  styleUrls: ['./work-text-phrase.component.scss']
})
export class WorkTextPhraseComponent {
  listComputed = computed(() => this.phraseService.getListSignal()());
  currentComputed = computed(() => this.phraseService.getCurrentStringSignal()());

  constructor(
    public phraseService: PhraseService,
    private snack: MatSnackBar,
    private db: DBService,
    private router: Router,
    private clipboard: Clipboard
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    this.phraseService.moveInList(event.previousIndex, event.currentIndex);
  }

  openAddDialog() {
    const value = this.phraseService.getCurrentString();
    const result = prompt('Agregar frase a la lista', value ?? '');
    if (result === null) return;
    const trimmed = (result ?? '').trim();
    if (!trimmed) {
      this.snack.open('No se agregó: cadena vacía', 'Cerrar', { duration: 1500 });
      return;
    }
    this.phraseService.addToList(trimmed);
    this.snack.open('Agregado a la lista', 'OK', { duration: 1200 });
  }

  async generate() {
    const text = this.phraseService.generateTxt();
    if (!text?.trim()) {
      this.snack.open('Lista vacía. Añade elementos antes de generar.', 'OK', { duration: 1500 });
      return;
    }

    const doSave = confirm(`Texto generado:\n\n${text}\n\n¿Deseas guardarlo como Phrase completa?`);
    if (doSave) {
      try {
        const phrase: Phrase = { phrase: text, isComplete: true };
        await this.db.addPhrase(phrase);
        this.snack.open('Frase completa guardada', 'OK', { duration: 1500 });
        this.router.navigate(['/complete-phrase']);
      } catch (err) {
        console.error(err);
        this.snack.open('Error guardando frase completa', 'Cerrar', { duration: 2000 });
      }
    } else {
      try {
        this.clipboard.copy(text);
        this.snack.open('Texto copiado al portapapeles', 'OK', { duration: 1500 });
      } catch {
        this.snack.open('No se pudo copiar automáticamente. Selecciona y copia manualmente.', 'OK', { duration: 2000 });
      }
    }
  }

  addNewPhraseView() {
    this.router.navigate(['/add-text-phrase']);
  }

  cancel() {
    this.phraseService.resetCurrentString();
    this.phraseService.resetList();
    this.router.navigate(['/main-phrase']);
  }

  removeAt(index: number) {
    this.phraseService.removeFromList(index);
  }
}
