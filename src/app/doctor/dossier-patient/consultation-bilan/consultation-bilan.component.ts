import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultation-bilan',
  imports: [FormsModule, CommonModule],
  templateUrl: './consultation-bilan.component.html',
  styleUrls: ['./consultation-bilan.component.css'],
})
export class ConsultationBilanComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  nss: string = '';
  consultationId: string = '';
  type: string = 'Bilan biologique'; // Default to Bilan biologique
  observation: string = ''; // For Bilan Biologique

  params = [
    {
      nom: 'Glycémie',
      valeur_normale: '0,7 - 1,1 g/L',
    },
    {
      nom: 'Niveaux de cholestérol',
      valeur_normale: 'Normal: < 2 g/L',
    },
    {
      nom: 'Pression artérielle',
      valeur_normale: 'Normal: 120/80 mmHg',
    },
  ];

  ngOnInit(): void {
    // Get the nss parameter from the route
    this.activatedRoute.paramMap.subscribe((params) => {
      this.nss = params.get('nss') || '';
      this.consultationId = params.get('consultationId') || '';
    });
  }

  // Navigate to antecedents page
  navigateToAntecedants() {
    this.router.navigate([
      `/doctor/mes-patients/${this.nss}/nouvelle-consultation/antecedants`,
    ]);
  }

  // Delete a parameter from the list
  deleteParam(index: number) {
    this.params.splice(index, 1);
  }

  submitBilan() {
    let endpoint: string;
    let data: any;

    if (this.type === 'Bilan biologique') {
      endpoint = `http://127.0.0.1:8000/medecin/bilan-biologique/create/${this.consultationId}/${this.nss}/`;
      data = {
        observation: this.observation,
        pression_arterielle: false,
        glycemie: false,
        cholesterol_total: false, 
      };

      // Update boolean values based on params
      this.params.forEach((param) => {
        if (param.nom === 'Glycémie') {
          data.glycemie = true;
        }
        if (param.nom === 'Niveaux de cholestérol') {
          data.cholesterol_total = true;
        }
        if (param.nom === 'Pression artérielle') {
          data.pression_arterielle = true;
        }
      });
    } else {
      endpoint = `http://127.0.0.1:8000/medecin/bilan-radiologique/create/${this.consultationId}/${this.nss}/`;
      data = {
        observation: this.observation, // Changed from description to observation to match backend
      };
    }

    this.http.post(endpoint, data).subscribe({
      next: (response) => {
        console.log(`${this.type} created successfully:`, response);
        this.router.navigate([
          `/doctor/mes-patients/${this.nss}/nouvelle-consultation/antecedants`,
        ]);
      },
      error: (error) => {
        console.error('Error creating bilan:', error);
      },
    });
  }
}
