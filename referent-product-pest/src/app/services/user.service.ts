import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private configUrl: string = 'assets/config/config.json';

  constructor(private http: HttpClient) { }

  getListUser(): Observable<User[]> {
    return this.http.get<any[]>(this.configUrl).pipe(
      map(data => {
        return data.map(u => new User(u.username, u.password, u.rol));
      }),
      catchError(error => {
        console.error('Error loading config.json', error);
        return of([]);
      })
    );
  }
}


