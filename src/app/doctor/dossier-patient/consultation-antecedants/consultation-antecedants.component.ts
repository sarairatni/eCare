import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultation-antecedants',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './consultation-antecedants.component.html',
  styleUrls: ['./consultation-antecedants.component.css'],
})
export class ConsultationAntecedantsComponent implements OnInit {
  nss: string = '';
  dossierId: string | null = null;
  antecedants: any[] = []; // Array of antecedents
  showForm = false;

  newAntecedant = {
    type: '',
    nom: '',
    date: '',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Log route parameters
    this.activatedRoute.paramMap.subscribe((params) => {
      this.nss = params.get('nss') || ''; // Store the nss parameter
      this.dossierId = params.get('nss') || ''; // Store the dossier_id parameter

      // Debugging logs
      console.log('Route parameters:');
      console.log('nss:', this.nss);
      console.log('dossierId:', this.dossierId);
    });
  }

  toggleForm() {
    console.log('Toggling form visibility:', this.showForm);
    this.showForm = !this.showForm;
  }

  addAntecedant() {
    if (
      this.newAntecedant.nom &&
      this.newAntecedant.type &&
      this.newAntecedant.date
    ) {
      console.log('Adding new antecedant:', this.newAntecedant);
      this.antecedants.push({ ...this.newAntecedant });
      this.resetForm();
    } else {
      console.warn(
        'Missing required fields for antecedant:',
        this.newAntecedant
      );
    }
  }

  resetForm() {
    console.log('Resetting form fields.');
    this.newAntecedant = { nom: '', type: '', date: '' };
    this.showForm = false;
  }

  createAntecedants() {
    if (this.dossierId) {
      console.log('Creating antecedants for dossierId:', this.dossierId);

      this.antecedants.forEach((antecedant, index) => {
        console.log(`Creating antecedant ${index + 1}:`, antecedant);

        const antecedantData = {
          type: antecedant.type,
          description: antecedant.nom,
          date_declaration: antecedant.date,
        };

        // Log the data being sent in the HTTP request
        console.log('Sending data to backend:', antecedantData);

        this.http
          .post(
            `http://127.0.0.1:8000/medecin/antecedent/create/${this.dossierId}/`,
            antecedantData
          )
          .subscribe({
            next: (response) => {
              console.log('Antecedant created successfully:', response);
            },
            error: (error) => {
              console.error('Error creating antecedant:', error);
            },
            complete: () => {
              console.log(
                `Antecedant ${index + 1} creation request completed.`
              );
            },
          });
      });

      // After all antecedants are created, navigate to the next page
      console.log(
        'All antecedants submitted, navigating to consultations page.'
      );
      this.router.navigate([`/doctor/mes-patients/${this.nss}/consultations`]);
    } else {
      console.error('Dossier ID is missing. Cannot create antecedants.');
    }
  }
}
