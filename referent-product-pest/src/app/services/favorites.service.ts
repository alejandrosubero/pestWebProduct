import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private key = 'favorites';

  getFavorites(): any[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  addToFavorites(product: any): void {
    const current = this.getFavorites();
    if (!current.some(p => p.id === product.id)) {
      current.push(product);
      localStorage.setItem(this.key, JSON.stringify(current));
    }
  }

  removeFromFavorites(productId: number): void {
    const updated = this.getFavorites().filter(p => p.id !== productId);
    localStorage.setItem(this.key, JSON.stringify(updated));
  }

  isFavorite(productId: number): boolean {
    let response: boolean = false;
    if (productId != undefined && productId != null){
          response = this.getFavorites().some(p => p.id === productId);
    }
    return response;
  }
}
