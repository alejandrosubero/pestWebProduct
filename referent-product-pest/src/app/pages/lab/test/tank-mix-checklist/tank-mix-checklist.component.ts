import { Component, inject } from '@angular/core';
import { NavService } from '../../../../services/nav.service';
import { NavConfig } from '../../../../models/navElemet.model';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-tank-mix-checklist',
  standalone: true,
  imports: [
    CommonModule,
            MatButtonModule,
            MatIconModule,
            MatListModule
  ],
  templateUrl: './tank-mix-checklist.component.html',
  styleUrl: './tank-mix-checklist.component.scss'
})
export class TankMixChecklistComponent {

  private navService = inject(NavService);
  public title: string = 'Tank Mix checklist';

  lang: 'en' | 'es' = 'en';

  constructor(){
    this.setNav();
  }

  toggleLang(lang: 'en' | 'es') {
    this.lang = lang;
  }

  printPage() {
    window.print();
  }

  resetChecks() {
    document.querySelectorAll<HTMLInputElement>('input[type=checkbox]')
      .forEach(cb => cb.checked = false);
  }

  async copyChecklist() {
    const contentId = this.lang === 'en' ? 'content-en' : 'content-es';
    const checks = Array.from(
      document.querySelectorAll<HTMLInputElement>(`#${contentId} input[type=checkbox]`)
    );

    const labels = checks.map(cb =>
      `${cb.nextElementSibling?.textContent?.trim()} — ${cb.checked ? '✅' : '❌'}`
    );

    const header =
      this.lang === 'en'
        ? "Tank-Mix Checklist (Paul's)\n"
        : 'Laminita de Campo — Verificación de Mezclas\n';

    const text = header + labels.join('\n');

    try {
      await navigator.clipboard.writeText(text);
      alert('Checklist copied to clipboard');
    } catch {
      alert('Unable to copy. Copy manually.');
    }
  }


  setNav(): void {

    this.navService.reSetNavConfig();

    let navConfig: NavConfig = new NavConfig();
    navConfig.title = this.title;
    navConfig.ico.menu = false;
    navConfig.ico.back = true;
    navConfig.ico.home = true;
    navConfig.ico.favorite = false;
    navConfig.ico.logut = false;
    navConfig.ico.label = false;
    navConfig.ico.sds = false;
    navConfig.goto = 'app/lab/field';
    this.navService.setNavConfig(navConfig);
  }
}
