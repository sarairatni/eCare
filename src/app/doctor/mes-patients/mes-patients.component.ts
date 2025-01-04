import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Define an interface for patient data
interface Patient {
  id: number;
  nom: string;
  nss: string;
  date_naissance: string;
  dossier_id: string;
  telephone: string;
  age?: number;
  date_dentree?: string;
}

@Component({
  selector: 'app-mes-patients',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './mes-patients.component.html',
  styleUrls: ['./mes-patients.component.css'],
})
export class MesPatientsComponent implements OnInit {
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
    this.fetchPatients();
  }
  listePatients: Patient[] = [];

  fetchPatients(): void {
    // Create the payload with the user's ID
    const payload = {
      userId: this.user.id, // Send the user's ID here
    };

    // Send a POST request to the backend with the user ID
    this.http
      .post<any>('http://127.0.0.1:8000/medecin/patients/', payload)
      .subscribe(
        (response) => {
          const patientsWithDossier: Patient[] = [];
          response.patients.forEach((patient: any) => {
            this.http
              .get<any>(
                `http://127.0.0.1:8000/search_dossier_patient_by_id/${patient.id}/`
              )
              .subscribe(
                (dossierResponse) => {
                  const dossierId =
                    dossierResponse?.dossier_patient?.id || 'N/A';
                  const date_dentree =
                    dossierResponse?.dossier_patient?.date_creation || '_';
                  const patientData: Patient = {
                    id: patient.id,
                    nom: patient.nom,
                    nss: patient.num_securite_sociale,
                    telephone: patient.telephone,
                    date_naissance: patient.date_naissance,
                    dossier_id: dossierId,
                    date_dentree: date_dentree,
                    age: this.calculateAge(patient.date_naissance),
                  };

                  patientsWithDossier.push(patientData);

                  // Update the list only when all responses are received
                  if (patientsWithDossier.length === response.patients.length) {
                    this.listePatients = patientsWithDossier;
                  }
                },
                (error) => {
                  console.error('Error fetching dossier data:', error);
                  const fallbackPatientData: Patient = {
                    id: patient.id,
                    nom: patient.nom,
                    nss: patient.num_securite_sociale,
                    telephone: patient.telephone,
                    date_naissance: patient.date_naissance,
                    dossier_id: 'N/A',
                  };
                  patientsWithDossier.push(fallbackPatientData);

                  if (patientsWithDossier.length === response.patients.length) {
                    this.listePatients = patientsWithDossier;
                  }
                }
              );
          });
        },
        (error) => {
          console.error('Error fetching patients:', error);
        }
      );
  }

  calculateAge(date_naissance: string): number {
    const birthDate = new Date(date_naissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  navigateToConsultations(dossier_id: string): void {
    if (dossier_id !== 'N/A') {
      this.router.navigate([
        `/doctor/mes-patients/${dossier_id}/consultations`,
      ]);
    } else {
      console.error('No dossier ID available for this patient');
    }
  }
}
