import { Injectable, signal, Signal } from '@angular/core';

/**
 * Service que administra dos signals:
 * - currentStringSignal: Signal<string>
 * - listSignal: Signal<string[]>
 *
 * Expone métodos para operar sobre copias (protección contra mutación).
 */
@Injectable({
  providedIn: 'root'
})
export class PhraseService {
  private currentStringSignal = signal<string>('');
  private listSignal = signal<string[]>([]);

  constructor() {}

  // Signals direct access (optional)
  getCurrentStringSignal(): Signal<string> {
    return this.currentStringSignal;
  }
  getListSignal(): Signal<string[]> {
    return this.listSignal;
  }

  // Simple getters that return copies
  getCurrentString(): string {
    const v = this.currentStringSignal();
    return v === undefined || v === null ? '' : String(v);
  }

  setCurrentString(value: string): void {
    this.currentStringSignal.set(value ?? '');
  }

  resetCurrentString(): void {
    this.currentStringSignal.set('');
  }

  getList(): string[] {
    // return shallow copy
    return [...this.listSignal()];
  }

  addToList(item: string): void {
    const trimmed = (item ?? '').trim();
    if (!trimmed) return;
    const next = [...this.listSignal(), trimmed];
    this.listSignal.set(next);
  }

  removeFromList(index: number): void {
    const arr = this.getList();
    if (index < 0 || index >= arr.length) return;
    arr.splice(index, 1);
    this.listSignal.set(arr);
  }

  moveInList(previousIndex: number, currentIndex: number): void {
    const arr = this.getList();
    if (
      previousIndex < 0 ||
      previousIndex >= arr.length ||
      currentIndex < 0 ||
      currentIndex >= arr.length
    ) {
      return;
    }
    const [item] = arr.splice(previousIndex, 1);
    arr.splice(currentIndex, 0, item);
    this.listSignal.set(arr);
  }

  resetList(): void {
    this.listSignal.set([]);
  }

  generateTxt(): string {
    const arr = this.listSignal();
    // join with exactly one space, no trimming on ends since join doesn't add extra
    return arr.join(' ');
  }
}
