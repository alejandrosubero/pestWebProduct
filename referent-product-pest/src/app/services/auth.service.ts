
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

private loggedIn = signal<boolean>(false);

  login() {
    this.loggedIn.set(true);
  }

  logout() {
    this.loggedIn.set(false);
  }

  isAuthenticated(): boolean {
    return this.loggedIn();
  }

}




