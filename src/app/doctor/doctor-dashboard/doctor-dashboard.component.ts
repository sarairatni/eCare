import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
})
export class DoctorDashboardComponent implements OnInit {
  user: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log('User iiiiiiiid:', this.user.id);
    this.getAllConsultations();
  }

  // Initialize consultations and results as empty arrays
  consultations: any[] = [];
  results: any[] = [];

  // Fetch all consultations from the backend
  public getAllConsultations() {
    this.http
      .get<any>(
        `http://127.0.0.1:8000/medecin/consultation/list/${this.user.id}/`
      )
      .subscribe({
        next: (response) => {
          console.log('Consultations response:', response);

          // Check if 'consultations' is an array
          const consultations = response.consultations; // Assuming the response has a key 'consultations'

          if (Array.isArray(consultations)) {
            // Proceed only if consultations is an array
            this.consultations = consultations;

            // Create an array of HTTP requests for patient details
            const patientRequests = consultations.map((consultation: any) =>
              this.http.get<any>(
                `http://127.0.0.1:8000/patientGetByIdDossier/${consultation.dossier_id}/`
              )
            );

            // Use forkJoin to wait for all patient requests to complete
            forkJoin(patientRequests).subscribe(
              (patients) => {
                console.log('Fetched patient data:', patients);

                // Combine the consultations and patient data
                this.results = consultations.map(
                  (consultation: any, index: number) => ({
                    nom: patients[index].nom, // Patient's name
                    nss: patients[index].num_securite_sociale, // Patient's NSS
                    date: consultation.date, // Consultation date
                    statut: 'Terminé', // Assuming status is 'Terminé'
                  })
                );

                console.log('Results with patient data:', this.results);
              },
              (error) => {
                console.error('Error fetching patient details:', error);
              }
            );
          } else {
            console.error('Expected an array, but got:', consultations);
          }
        },
        error: (error) => {
          console.error('Error fetching consultations:', error);
        },
      });
  }
}
