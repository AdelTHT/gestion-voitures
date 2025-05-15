import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUser: User | null = null;
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          const user = users[0];
          if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  register(username: string, password: string): Observable<User> {
    // Vérifier si l'utilisateur existe déjà
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          throw new Error('Username already exists');
        }
        
        const newUser: Omit<User, 'id'> = {
          username,
          password,
          role: 'USER'  // Par défaut, les nouveaux utilisateurs sont USER
        };
        
        return this.http.post<User>(this.apiUrl, newUser);
      })
    );
  }
}