// src/app/components/backup/backup.component.ts
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BackupService } from '../../services/backup.service';

@Component({
  selector: 'app-backup',
   standalone: true,
  imports: [],
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent {
  private backupService = inject(BackupService);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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
    } catch (error) {
      console.error('❌ Error exporting backup', error);
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
        alert('✅ Backup imported successfully');
      } catch (err) {
        console.error('❌ Error importing backup', err);
        alert('Error importing backup');
      } finally {
        input.value = '';
      }
    }
  }

  // 🗑️ Clear all DBs
  async clear() {
    if (confirm('Are you sure you want to delete ALL databases?')) {
      await this.backupService.clearAll();
      alert('🗑️ All databases cleared');
    }
  }
}


