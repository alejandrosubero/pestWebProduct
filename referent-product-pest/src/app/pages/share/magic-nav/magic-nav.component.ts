import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type TabType = "favorites" | "formulations" | "storage";

@Component({
  selector: 'app-magic-nav',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './magic-nav.component.html',
  styleUrl: './magic-nav.component.scss'
})
export class MagicNavComponent {

@Output() stepChanged = new EventEmitter<TabType>();

  tabs = [
    { id: 'favorites' as TabType, label: 'FAVORITES', icon: 'star' },
    { id: 'formulations' as TabType, label: 'FORMULATIONS', icon: 'science' },
    { id: 'storage' as TabType, label: 'STORAGE', icon: 'inventory_2' }
  ];

  currentStep: TabType = 'favorites';

  setStep(step: TabType) {
    this.currentStep = step;
    this.stepChanged.emit(step);
  }
}