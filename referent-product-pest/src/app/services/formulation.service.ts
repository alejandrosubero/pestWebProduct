import { Injectable } from '@angular/core';
import { Formulation } from '../models/formulation.model';

@Injectable({ providedIn: 'root' })
export class FormulationService {
  private key = 'formulations';

  getFormulations(): Formulation[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  saveFormulation(formulation: Formulation): void {
    const all = this.getFormulations();
    const index = all.findIndex(f => f.id === formulation.id);
    if (index !== -1) {
      all[index] = formulation;
    } else {
      all.push(formulation);
    }
    localStorage.setItem(this.key, JSON.stringify(all));
  }

  deleteFormulation(id: number): void {
    const updated = this.getFormulations().filter(f => f.id !== id);
    localStorage.setItem(this.key, JSON.stringify(updated));
  }

  getFormulationById(id: number): Formulation | undefined {
    return this.getFormulations().find(f => f.id === id);
  }


updateFormulation(updated: Formulation): void {
  const formulations = this.getFormulations();
  const index = formulations.findIndex(f => f.id === updated.id);
  if (index !== -1) {
    formulations[index] = updated;
    localStorage.setItem(this.key, JSON.stringify(formulations));
  }
}


}
