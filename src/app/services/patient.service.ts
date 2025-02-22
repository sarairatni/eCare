import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
  // Create a BehaviorSubject to hold the patient detail
  private patientDetailSource = new BehaviorSubject<any>(null); // Initially no patient detail
  private consultationsSource = new BehaviorSubject<any[]>([]); // Initially empty consultations array
  private ordonnancesSource = new BehaviorSubject<any[]>([]); // Initially empty consultations array
  private dossierPatientSource = new BehaviorSubject<any>(null); // Initially no dossier patient data

  // Observables for each piece of data
  patientDetail$ = this.patientDetailSource.asObservable();
  consultations$ = this.consultationsSource.asObservable();
  ordonnances$ = this.ordonnancesSource.asObservable();
  dossierPatient$ = this.dossierPatientSource.asObservable();
  private biologiqueSource = new BehaviorSubject<any[]>([]); // For biological exams
  private radiologiqueSource = new BehaviorSubject<any[]>([]);
  biologique$ = this.biologiqueSource.asObservable(); // Observable for biological exams
  radiologique$ = this.radiologiqueSource.asObservable();
  // Set and Get for patient detail
  setPatientDetail(patientDetail: any): void {
    this.patientDetailSource.next(patientDetail);
  }
  getPatientDetail() {
    return this.patientDetailSource.getValue();
  }
  setBiologique(biologique: any[]): void {
    this.biologiqueSource.next(biologique);
  }
  getBiologique() {
    return this.biologiqueSource.getValue();
  }

  // Set and Get for radiological exams
  setRadiologique(radiologique: any[]): void {
    this.radiologiqueSource.next(radiologique);
  }
  getRadiologique() {
    return this.radiologiqueSource.getValue();
  }
  // Set and Get for consultations
  setConsultations(consultations: any[]): void {
    this.consultationsSource.next(consultations);
  }
  getConsultations() {
    return this.consultationsSource.getValue();
  }
  setOrdonnances(consultations: any[]): void {
    this.ordonnancesSource.next(consultations);
  }
  getOrdonnances() {
    return this.ordonnancesSource.getValue();
  }
  addConsultation(consultation: any): void {
    const currentConsultations = this.getConsultations();
    this.consultationsSource.next([...currentConsultations, consultation]);
  }

  // Set and Get for dossier patient
  setDossierPatient(dossierPatient: any): void {
    this.dossierPatientSource.next(dossierPatient);
  }
  getDossierPatient() {
    return this.dossierPatientSource.getValue();
  }
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