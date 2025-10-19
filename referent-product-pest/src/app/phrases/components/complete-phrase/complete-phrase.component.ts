import { Component, inject, OnInit } from '@angular/core';
import { PhraseService } from '../../services/phrase.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LongPressDirective } from '../../../directives/long-press.directive';
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
import { NavService } from '../../../services/nav.service';
import { NavConfig } from '../../../models/navElemet.model';
import { ConfirmDialogComponent } from '../../../pages/share/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

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
    RouterModule,
    LongPressDirective
  ],
  templateUrl: './complete-phrase.component.html',
  styleUrls: ['./complete-phrase.component.scss']
})
export class CompletePhraseComponent implements OnInit {
  phrases: Phrase[] = [];
  loading = false;
  title ='Complete Sentences';
  private navService = inject(NavService);
  isFabOpen = false;
  
  constructor(
    private db: DBService,
    private phraseService: PhraseService,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.setNav();
  }

  ngOnInit(): void {
    this.load();
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
      navConfig.goto = 'app/phrase/main';
      this.navService.setNavConfig(navConfig);
      }

  async load() {
    this.loading = true;
    try {
      const all = await this.db.getAllPhrase();
      this.phrases = (all ?? []).filter(p => p.isComplete === true);
    } catch (err) {
      console.error(err);
      this.snack.open('Error load the conplete Sentences', 'Cerrar', { duration: 2000 });
    } finally {
      this.loading = false;
    }
  }

  selectPhrase(p: Phrase) {
    this.phraseService.setCurrentString(p.phrase);
    this.router.navigate(['/app/phrase/main']);
  }


  async deletePhrase(p: Phrase | undefined) {
    if (!p?.id) return;
    const ok = await this.confirmDelete();
    if (!ok) return;
    try {
      await this.db.deletePhrase(p.id);
      this.snack.open('Phrase was delete', 'OK', { duration: 1500 });
      await this.load();
    } catch (err) {
      console.error(err);
      this.snack.open('Error...', 'close', { duration: 2000 });
    }
  }

async confirmDelete(): Promise<boolean> {
  this.isFabOpen = false;
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: { message: 'Are you sure you want to delete this Sentences?' },
  });
  const result = await firstValueFrom(dialogRef.afterClosed());
  return !!result;
}


}
