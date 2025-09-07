import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface JarTestRate {
  labelRate: number; // oz/gal
  pintOz: number;
  pintMl: number;
  quartOz: number;
  quartMl: number;
}

@Component({
  selector: 'app-jar-test-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jar-test-table.component.html',
  styleUrl: './jar-test-table.component.scss'
})
export class JarTestTableComponent {

jarRates: JarTestRate[] = [
    { labelRate: 0.0625, pintOz: 0.008, pintMl: 0.23, quartOz: 0.016, quartMl: 0.46 },
    { labelRate: 0.125, pintOz: 0.016, pintMl: 0.46, quartOz: 0.031, quartMl: 0.92 },
    { labelRate: 0.2, pintOz: 0.025, pintMl: 0.74, quartOz: 0.05, quartMl: 1.48 },
    { labelRate: 0.25, pintOz: 0.031, pintMl: 0.92, quartOz: 0.062, quartMl: 1.85 },
    { labelRate: 0.33, pintOz: 0.041, pintMl: 1.22, quartOz: 0.083, quartMl: 2.44 },
    { labelRate: 0.5, pintOz: 0.062, pintMl: 1.85, quartOz: 0.125, quartMl: 3.7 },
    { labelRate: 0.75, pintOz: 0.094, pintMl: 2.77, quartOz: 0.188, quartMl: 5.55 },
    { labelRate: 1, pintOz: 0.125, pintMl: 3.7, quartOz: 0.25, quartMl: 7.39 },
    { labelRate: 1.5, pintOz: 0.188, pintMl: 5.55, quartOz: 0.375, quartMl: 11.09 },
    { labelRate: 2, pintOz: 0.25, pintMl: 7.39, quartOz: 0.5, quartMl: 14.79 },
    { labelRate: 4, pintOz: 0.5, pintMl: 14.79, quartOz: 1, quartMl: 29.57 }
  ];

  customRate: number | null = null;
  calculated: JarTestRate | null = null;

  // Conversión personalizada
  convertValue: number | null = null;
  convertUnit: string = 'fl-oz';
  conversions: { unit: string, value: number }[] = [];

  calculate() {
    if (this.customRate !== null && this.customRate >= 0) {
      const pintOz = this.customRate / 8;
      const quartOz = this.customRate / 4;
      this.calculated = {
        labelRate: this.customRate,
        pintOz: parseFloat(pintOz.toFixed(3)),
        pintMl: parseFloat((pintOz * 29.5735).toFixed(2)),
        quartOz: parseFloat(quartOz.toFixed(3)),
        quartMl: parseFloat((quartOz * 29.5735).toFixed(2))
      };
    } else {
      this.calculated = null;
    }
  }

  // 🔹 Función de conversión de unidades
  convertUnits() {
    if (this.convertValue === null || this.convertValue < 0) {
      this.conversions = [];
      return;
    }

    const val = this.convertValue;
    let flOz = 0;

    switch (this.convertUnit) {
      case 'fl-oz':
        flOz = val;
        break;
      case 'ml':
        flOz = val / 29.5735;
        break;
      case 'tsp':
        flOz = val / 6;
        break;
      case 'tbsp':
        flOz = val / 2;
        break;
      case 'gal':
        flOz = val * 128;
        break;
      case 'qt':
        flOz = val * 32;
        break;
      case 'pt':
        flOz = val * 16;
        break;
      case 'l':
        flOz = val * 33.814;
        break;
    }

    this.conversions = [
      { unit: 'Fl oz', value: parseFloat(flOz.toFixed(3)) },
      { unit: 'mL', value: parseFloat((flOz * 29.5735).toFixed(2)) },
      { unit: 'Tsp', value: parseFloat((flOz * 6).toFixed(2)) },
      { unit: 'Tbsp', value: parseFloat((flOz * 2).toFixed(2)) },
      { unit: 'Pints', value: parseFloat((flOz / 16).toFixed(3)) },
      { unit: 'Quarts', value: parseFloat((flOz / 32).toFixed(3)) },
      { unit: 'Gallons', value: parseFloat((flOz / 128).toFixed(3)) },
      { unit: 'Liters', value: parseFloat((flOz / 33.814).toFixed(3)) }
    ];
  }
}
