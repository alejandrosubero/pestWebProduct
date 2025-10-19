import { Component, inject, OnInit } from '@angular/core';
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
import { NavService } from '../../../services/nav.service';
import { NavConfig } from '../../../models/navElemet.model';
import { LongPressDirective } from '../../../directives/long-press.directive';
import { ConfirmDialogComponent } from '../../../pages/share/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

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
    MatProgressSpinnerModule,
    LongPressDirective
  ],
  templateUrl: './show-text-phrase.component.html',
  styleUrls: ['./show-text-phrase.component.scss']
})
export class ShowTextPhraseComponent implements OnInit {
  phrases: Phrase[] = [];
  loading = false;
  private navService = inject(NavService);
  title = "list of Phrase";
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

  async load() {
    this.loading = true;
    try {
      const all = await this.db.getAllPhrase();
      this.phrases = (all ?? []).filter(p => p.isComplete === false);
    } catch (err) {
      console.error(err);
      this.snack.open('Error to load phrases', 'close', { duration: 2000 });
    } finally {
      this.loading = false;
    }
  }

  selectPhrase(p: Phrase) {
    this.snack.open('put in list', 'OK', { duration: 500 });
    this.phraseService.addToList(p.phrase);
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
    data: { message: 'Are you sure you want to delete this phrase?' },
  });
  
  const result = await firstValueFrom(dialogRef.afterClosed());
  return !!result;
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
      navConfig.goto = 'app/phrase/work/text';
      this.navService.setNavConfig(navConfig);

      //  private navService = inject(NavService);
      //   title = "Add Phrase Text";
      }

      addNew(){
        this.router.navigate(['/app/phrase/add/text']);
      }
}
