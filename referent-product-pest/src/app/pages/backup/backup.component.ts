// src/app/components/backup/backup.component.ts
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BackupService } from '../../services/backup.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../share/confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarHorizontalPosition, MatSnackBarLabel, MatSnackBarRef, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  isFabOpen = false;
  durationInSeconds = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  private backupService = inject(BackupService);
  

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }


  // 📤 Export / Share Backup
  async export() {
    try {
      const blob = await this.backupService.getBackupBlob();
      const file = new File([blob], `backup-${new Date().toISOString()}.json`, { type: 'application/json' });

      // ✅ Web Share API si está disponible y soporta archivos
      if (navigator.share && (navigator as any).canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: 'Backup',
            text: 'PestControlDB Backup',
            files: [file],
          });
          console.log('✅ Backup shared');
          return;
        } catch (err: any) {
          console.warn('⚠️ Share cancelled or failed, falling back to download:', err);
        }
      }

      // ⬇️ Fallback → descarga
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      console.log('⬇️ Backup downloaded');
      this.openSnackBar('⬇️ Backup downloaded');
    } catch (error) {
        this.durationInSeconds = 5;
      console.error('❌ Error exporting backup', error);
       this.openSnackBar('❌ Error exporting backup');
    }
  }

  // 📥 Abrir selector de archivo
  openFilePicker() {
    this.fileInput.nativeElement.click();
  }

  // 📥 Import Backup
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      try {
        const text = await file.text();
        const json = JSON.parse(text);
        await this.backupService.importAll(json);
            this.openSnackBar('✅ Backup imported successfully');
  
      } catch (err) {
        this.durationInSeconds = 5;
        console.error('❌ Error importing backup', err);
           this.openSnackBar('❌ Error importing backup');
      } finally {
        input.value = '';
        this.durationInSeconds = 3;
      }
    }
  }

  // 🗑️ Clear all DBs
  async clear() {
    await this.backupService.clearAll();
    this.showSnackBar('🗑️ All databases cleared');
  }


  confirmDelete(): void {
    this.isFabOpen = false;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this formulation?' },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clear();
      }
    });
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'Ok', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  showSnackBar(text: string): void {
    this.durationInSeconds = 6;
    const snackRef = this._snackBar.open(text, 'OK', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    snackRef.onAction().subscribe(() => {
     window.location.reload();
    });
  }


}


