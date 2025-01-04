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
  antecedants: any[] = [];
  showForm = false;

  newAntecedant = {
    type: '',
    nom: '',
    date: '',
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get the nss parameter from the route
    this.activatedRoute.paramMap.subscribe((params) => {
      this.nss = params.get('nss') || ''; // Store the nss parameter
      this.dossierId = params.get('dossierId') || ''; // Store the dossier_id parameter
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addAntecedant() {
    if (this.newAntecedant.nom && this.newAntecedant.type && this.newAntecedant.date) {
      this.antecedants.push({ ...this.newAntecedant });
      this.resetForm();
    }
  }

  resetForm() {
    this.newAntecedant = { nom: '', type: '', date: '' };
    this.showForm = false;
  }

  createAntecedant() {
    if (this.dossierId) {
      const antecedantData = {
        type: this.newAntecedant.type,
        description: this.newAntecedant.nom,
        date_declaration: this.newAntecedant.date,
      };

      // Send a POST request to the backend to create the antecedant
      this.http.post(`http://127.0.0.1:8000/medecin/antecedent/create/${this.dossierId}/`, antecedantData)
        .subscribe({
          next: (response) => {
            console.log('Antecedant created successfully:', response);
            this.router.navigate([`/doctor/mes-patients/${this.nss}/nouvelle-consultation/antecedants`]);
          },
          error: (error) => {
            console.error('Error creating antecedant:', error);
          },
        });
    }
  }

  terminerConsultation() {
    console.log('Consultation terminée');
    this.router.navigate([`/doctor/mes-patients/${this.nss}/consultations`]);
  }
}
