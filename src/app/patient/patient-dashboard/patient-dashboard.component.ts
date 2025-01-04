import { NgFor } from '@angular/common';
import { Component, input, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { PatientService } from '../../services/patient.service';
@Component({
  selector: 'app-patient-dashboard',
  imports: [NgFor],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {
  patientData : any;
  consultations: any[] = []; 
  authService=inject(AuthService);
  http=inject(HttpClient);
  patientService = inject(PatientService);  
  ngOnInit(): void {
    // Retrieve user from AuthService
    const user = this.authService.getUser();

    if (user && user.id) {
      const requestBody = {
        user_id: user.id
      };

      // Make the HTTP POST request to the backend
      this.http.post('http://localhost:8000/getpatients/', requestBody).subscribe({
        next: (response: any) => {
          console.log('Patient data:', response);
          this.patientData = response.patient;
          this.patientService.setPatientDetail(this.patientData);
          this.getDossierByNss(response.patient.num_securite_sociale);
          
        },
        error: (error) => {
          console.error('Error fetching patient data:', error);
        }
      });
    } else {
      console.error('User is not logged in or user_id is missing.');
    }
    
  }

getDossierByNss(nss: string): void {
    const requestBody = { nss: nss };  // Send NSS to get dossier_id

    this.http.post('http://localhost:8000/getdossier/', requestBody).subscribe({
      next: (response: any) => {
        console.log('Dossier ID:', response);
        const dossierId = response.dossier_id;  // Get dossier_id from the response

        // Step 4: Use dossier_id to get consultations
        this.getConsultationsByDossierId(dossierId);
      },
      error: (error) => {
        console.error('Error fetching dossier data:', error);
      }
    });
  }
  fetchOrdonnancesForConsultations(): void {
    for (const consultation of this.consultations) {
      console.log(consultation.id);
      this.getOrdonnances(consultation.id);
    }
  }

  fetchExamsForConsultations(): void {
    for (const consultation of this.consultations) {
      console.log(consultation.id);
      this.getBiologique(consultation.id);
      this.getRadiologique(consultation.id);
    }
  }
  biologiques :any[] = [];
  radiologiques :any[] = [];
  getBiologique(consultationId: number): void {
    // Make a request to get ordonnances for the given consultation ID
    this.http.post<any>(`http://localhost:8000/getbiologique/`, { consultation_id: consultationId })
      .subscribe(
        biologiques => {
          this.biologiques.push(...biologiques.data);
          console.log(this.biologiques)
          console.log("biooo"); // Merge ordonnances results into the ordonnances array
        },
        error => {
          console.error(`Error fetching ordonnances for consultation ${consultationId}:`, error);
        }
      );
  }

  getRadiologique(consultationId: number): void {
    // Make a request to get ordonnances for the given consultation ID
    this.http.post<any>(`http://localhost:8000/getradiologique/`, { consultation_id: consultationId })
      .subscribe(
        radiologiques => {
          this.radiologiques.push(...radiologiques.data);
          console.log(this.radiologiques)
          console.log("radiooo"); // Merge ordonnances results into the ordonnances array
        },
        error => {
          console.error(`Error fetching ordonnances for consultation ${consultationId}:`, error);
        }
      );
  }

  getOrdonnances(consultationId: number): void {
    // Make a request to get ordonnances for the given consultation ID
    this.http.post<any>(`http://localhost:8000/get_ordonnances/`, { consultation_id: consultationId })
      .subscribe(
        ordonnances => {
          this.ordonnances.push(...ordonnances.data);
          console.log(this.ordonnances)
          console.log("a"); // Merge ordonnances results into the ordonnances array
        },
        error => {
          console.error(`Error fetching ordonnances for consultation ${consultationId}:`, error);
        }
      );
  }

  getConsultationsByDossierId(dossier_id: string): void {
    const requestBody = { dossier_id: dossier_id };  // Send dossier_id to get consultations
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    this.http.post('http://localhost:8000/getconsultations/', requestBody,{headers : headers}).subscribe({
      next: (response: any) => {
        const consultations = response.consultations.map((consultation: any) => {
          return {
            id:consultation.id,
            date: consultation.date,           // Assuming the API response has a 'date' field
            medecin: "a",  // Replace 'medecin_name' with the actual field name in the response
            motif: consultation.motif,         // Assuming the API response has a 'motif' field
            diagnostic: consultation.resume // Assuming the API response has a 'diagnostic' field
          };
        })
        this.patientService.setConsultations(consultations); 
        this.consultations = consultations;
        this.fetchOrdonnancesForConsultations();
        this.fetchExamsForConsultations();
        this.patientService.setBiologique(this.biologiques);
        this.patientService.setRadiologique(this.radiologiques);
        this.patientService.setOrdonnances(this.ordonnances);
        console.log('Consultations data:', consultations); 
         // Store consultations
      },
      error: (error) => {
        console.error('Error fetching consultations:', error);
      }
    });
  }
   
  
  
  patient = input("Ladoul Mahdi");
  nss = input(10212587);
  medecin = input("Ladoul Mahdi");
  ordonnances: any[] = [];  
  

  textEtat(etat: boolean) {
    switch(etat) {
      case true:
        return "Validée";
      case false:
        return "Pas Validée";
      default:
        return "État inconnu";

    }
  }
}
