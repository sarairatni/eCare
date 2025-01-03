import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nouvelle-consultation-patient',
  templateUrl: './nouvelle-consultation.component.html',
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  styleUrls: ['./nouvelle-consultation.component.css'],
})
export class NouvelleConsultationComponent implements OnInit {
  id_dossier: string | null = null;
  observations: string = '';
  date: string = new Date().toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  diagnostic: string = '';
  isBilanChecked: boolean = false;
  errorMessage: string | null = null;
  user: any;

  constructor(
    private http: HttpClient,
    public activatedRoute: ActivatedRoute,
    private authService: AuthService // Correctly inject AuthService here
  ) {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.id_dossier = params['nss'];
      console.log('ID dossier:', this.id_dossier);
    });
  }

  ngOnInit(): void {
    // Fetch the user from AuthService
    this.user = this.authService.getUser();
    console.log('Authenticated user:', this.user);
  }

  // Function to toggle the Bilan checkbox
  toggleBilan(event: any) {
    this.isBilanChecked = event.target.checked;
  }

  // Function to reset the form
  resetForm() {
    this.observations = '';
    this.diagnostic = '';
    this.isBilanChecked = false;
    this.errorMessage = null;
  }

  // Function to submit the form and create the consultation
  submitForm() {
    if (!this.observations || !this.diagnostic) {
      this.errorMessage = 'Les champs observation et diagnostic sont requis';
      return;
    }

    if (!this.user || !this.user.id) {
      this.errorMessage = 'Utilisateur non trouvé';
      return;
    }

    if (!this.id_dossier) {
      this.errorMessage = 'Dossier ID est requis';
      return;
    }

    const data = {
      motif: this.observations,
      date: this.date,
      resume: this.diagnostic,
      userId: this.user.id, // Add userId to the request payload
    };

    // Log the data before making the API call
    console.log('Form Data:', {
      motif: this.observations,
      date: this.date,
      resume: this.diagnostic,
      userId: this.user.id,
    });

    // Make the API call to create the consultation
    this.http
      .post(
        `http://127.0.0.1:8000/patients/${this.id_dossier}/consultations/create/`,
        data
      )
      .subscribe(
        (response: any) => {
          console.log('Consultation created successfully', response);
          this.resetForm(); // Reset the form after successful submission
          this.errorMessage = null; // Clear any previous error messages
        },
        (error) => {
          console.error('Error creating consultation', error);
          this.errorMessage =
            'Erreur lors de la création de la consultation. Veuillez réessayer.';
        }
      );
  }
}
