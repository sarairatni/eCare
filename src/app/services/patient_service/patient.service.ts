import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface Patient {
  num_securite_sociale: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  adress: string;
  telephone: string;
  medecin_traitant: any; // You can create a proper type for this
  personne_contact: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getPatientByDossierId(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patientGetByIdDossier/${id}/`)
      .pipe(
        tap(response => {
          console.log('API Response:', response);
        }),
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }
}