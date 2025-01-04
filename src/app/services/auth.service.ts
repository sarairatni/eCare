// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/authentification/';
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('access_token'));
 
  constructor(private http: HttpClient) {}

  // Login method to authenticate the user
  login(loginData: { nss: string, password: string, role: string }): Observable<any> {
    return this.http.post(this.apiUrl, loginData).pipe(
      catchError(error => {
        console.error('Login error:', error);
        throw error;  // You can handle this more gracefully depending on your needs
      })
    );
  }

  // Store JWT in localStorage and set it in the BehaviorSubject
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
  }

  // Retrieve the token from localStorage or BehaviorSubject
  getToken(): string | null {
    return this.tokenSubject.value;
  }

  // Clear token and reset the subject
  logout(): void {
    localStorage.removeItem('access_token');
    this.tokenSubject.next(null);
  }
  
  // Get user role from the localStorage
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getRole(): string | null {
    return localStorage.getItem('role');  // Assuming role is stored in localStorage
  }

  // Set user role in localStorage
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
  }
  setRole(role: string): void {
    localStorage.setItem('role', role);
  }
}
