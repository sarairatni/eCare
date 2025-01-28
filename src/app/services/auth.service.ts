import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/user';
export interface PatientSignupData {
  username: string;
  password: string;
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  num_securite_sociale: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  adress: string;
  telephone: string;
  medecin_traitant: number;
  personne_contact?: string;
}
export interface DossierData {
nss: string;
date: string;}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';
  private authUrl = `${this.apiUrl}/authentification/`;
  
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('access_token')
  );

  constructor(private http: HttpClient) {}

  login(loginData: {
    nss: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(this.authUrl, loginData).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.tokenSubject.next(null);
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  signupPatient(data: PatientSignupData): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/`, data).pipe(
      catchError((error) => {
        console.error('Signup error:', error);
        throw error;
      })
    );
  }

  creerDossier(data: DossierData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_dossier_patient/`, data).pipe(
      catchError((error) => {
        console.error('Dossier creation error:', error);
        throw error;
      })
    );
  }
}