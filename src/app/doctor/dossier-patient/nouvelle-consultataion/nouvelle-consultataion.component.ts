import { Component } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nouvelle-consultation-patient',
  templateUrl: './nouvelle-consultation.component.html',
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  styleUrls: ['./nouvelle-consultation.component.css'],
})
export class NouvelleConsultationComponent {
  id_dossier: string | null = null;
  observations: string = '';
  diagnostic: string = '';
  isBilanChecked: boolean = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.id_dossier = params['nss'];
      console.log('ID dossier:', this.id_dossier);
    });
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

    const data = {
      motif: this.observations,
      resume: this.diagnostic,
    };

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
