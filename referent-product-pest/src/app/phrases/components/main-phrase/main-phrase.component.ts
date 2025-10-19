import { Component, inject, OnInit } from '@angular/core';
import { PhraseService } from '../../services/phrase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { DBService } from '../../../services/db.service';
import { Phrase } from '../../../models/interfaces';
import { NavService } from '../../../services/nav.service';
import { NavConfig } from '../../../models/navElemet.model';

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
    RouterModule,
    ClipboardModule
  ],
  templateUrl: './main-phrase.component.html',
  styleUrls: ['./main-phrase.component.scss']
})
export class MainPhraseComponent implements OnInit{
  textarea = '';
  loading = false;
  private navService = inject(NavService);
  title = 'Main Phrase';
  tempText = '';
  isFabOpen = false;

  constructor(
    public phraseService: PhraseService,
    private db: DBService,
    private snack: MatSnackBar,
    private router: Router,
    private clipboard: Clipboard
  ) {
    this.setNav();
  }

  ngOnInit(): void {
    this.started();
  }

   toggleFab() {
    this.isFabOpen = !this.isFabOpen;
  }
  
  started(){
    this.tempText = this.phraseService.getCurrentString();
      if(this.tempText != ''){
        this.textarea = this.tempText;
      }
  }

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
      this.snack.open('There is no text to save', 'Cerrar', { duration: 1500 });
      return;
    }
    try {
      const p: Phrase = { phrase: trimmed, isComplete: true };
      await this.db.addPhrase(p);
      this.snack.open('Saved as a complete sentence', 'OK', { duration: 1500 });
    } catch (err) {
      console.error(err);
      this.snack.open('Error saving', 'Cerrar', { duration: 2000 });
    }
  }

  navigate(routeBase: string) {
    this.router.navigate([routeBase]);
  }

  goHome(): void {
    const routeBase = "app/home";
    this.navigate(routeBase);
  }

  setNav(): void {
    this.navService.reSetNavConfig();
    let navConfig: NavConfig = new NavConfig();
    navConfig.title = this.title;
    navConfig.ico.menu = true;
    navConfig.ico.back = false;
    navConfig.ico.home = false;
    navConfig.ico.favorite = false;
    navConfig.ico.logut = false;
    navConfig.ico.label = false;
    navConfig.ico.sds = false;
    navConfig.goto = 'app/phrase/main';
    this.navService.setNavConfig(navConfig);
    }

 reset() {
    this.phraseService.resetCurrentString();
    this.phraseService.resetList();
    this.textarea = '';
    this.tempText = '';
  }

  copyClipboard(){
      try {
        this.clipboard.copy(this.textarea);
        this.snack.open('Text copied to clipboard', 'OK', { duration: 1500 });
      } catch {
        this.snack.open('Could not copy automatically. Please select and copy manually.', 'OK', { duration: 2000 });
      }
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
