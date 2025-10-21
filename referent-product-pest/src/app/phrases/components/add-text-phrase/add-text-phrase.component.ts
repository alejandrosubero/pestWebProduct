import { DBService } from '../../../services/db.service';
import { Phrase } from '../../../models/interfaces';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NavService } from '../../../services/nav.service';
import { NavConfig } from '../../../models/navElemet.model';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule,} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-add-text-phrase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ],
  templateUrl: './add-text-phrase.component.html',
  styleUrls: ['./add-text-phrase.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class AddTextPhraseComponent {
  text = '';
  saving = false;
  private navService = inject(NavService);
  title = "Add Phrase Text";
  phraseType = 3; 
  isMensagge = false;
  isReport = true;
  isOther = false;
  action = 'Report';

  constructor(
    private db: DBService,
    private router: Router,
    private snack: MatSnackBar
  ) {
     this.setNav();
  }

  async save() {
    const trimmed = this.text?.trim() ?? '';
    if (!trimmed) {
      this.snack.open('La frase no puede estar vacía', 'Cerrar', { duration: 2000 });
      return;
    }
    
    this.saving = true;
    const p: Phrase = { phrase: trimmed, isComplete: false, type:this.phraseType };

    try {
      await this.db.addPhrase(p);
      this.snack.open('Frase guardada correctamente', 'OK', { duration: 2000 });
      this.text='';
    } catch (err: any) {
      console.error(err);
      this.snack.open('Error guardando la frase: ' + (err?.message ?? err), 'Cerrar', { duration: 3000 });
    } finally {
      this.saving = false;
    }
  }


  setNav(): void {
    this.navService.reSetNavConfig();
    let navConfig: NavConfig = new NavConfig();
    navConfig.title = this.title;
    navConfig.ico.menu = false;
    navConfig.ico.back = true;
    navConfig.ico.home = false;
    navConfig.ico.favorite = false;
    navConfig.ico.logut = false;
    navConfig.ico.label = false;
    navConfig.ico.sds = false;
    navConfig.goto = 'app/phrase/show/text';
    this.navService.setNavConfig(navConfig);
    }


  onToggleChange(activeToggle: string) {
   
    this.isMensagge = false;
    this.isReport = false;
    this.isOther = false;

    switch (activeToggle) {
      case 'mensaje':
          this.isMensagge = true;
          this.phraseType = 1;
          this.action = 'Mensagge';
        break;
      case 'report':
          this.isReport = true;
          this.phraseType = 2;
           this.action = 'Report';
        break;
      case 'other':
        this.isOther = true;
        this.phraseType = 3; 
        this.action = 'Other'
        break;
    }
  }

}


