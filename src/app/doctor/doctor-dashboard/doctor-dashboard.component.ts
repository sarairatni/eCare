import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
})
export class DoctorDashboardComponent {
  constructor(private http: HttpClient) {}

  // Initialize consultations and results as empty arrays
  consultations: any[] = [];
  results: any[] = [];

  // Fetch all consultations from the backend
  public getAllConsultations() {
    this.http
      .get<any[]>('http://127.0.0.1:8000/medecin/consultation/list/')
      .subscribe(
        (data) => {
          console.log('Consultations data:', data); // Log consultations data

          // Loop through each consultation to fetch the corresponding patient details
          data.forEach((consultation: any) => {
            this.http
              .get<any>(
                `http://127.0.0.1:8000/patientGetByIdDossier/${consultation.dossier_id}/`
              )
              .subscribe(
                (patient) => {
                  console.log('Fetched patient data:', patient); // Log patient data

                  // Create a new object with patient and consultation data
                  const result = {
                    nom: patient.nom, // Patient's name
                    nss: patient.num_securite_sociale, // Patient's NSS
                    date: consultation.date, // Consultation date
                    statut: 'Terminé', // Assuming status is 'Terminé'
                  };

                  // Push the result into the results array
                  this.results.push(result);

                  // After all patients are processed, log the final results
                  console.log('Results with patient data:', this.results);
                },
                (error) => {
                  console.error('Error fetching patient details:', error);
                }
              );
          });
        },
        (error) => {
          console.error('Error fetching consultations:', error);
        }
      );
  }

  // Call getAllConsultations when the component initializes
  ngOnInit() {
    this.getAllConsultations();
  }
}
