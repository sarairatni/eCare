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
      this.nss = params.get('nss') || ''; // Store the nss parameter
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

  // Form submission for Bilan Biologique or Radiologique
  submitBilan() {
    const dossierId = 'example_dossier_id'; // Replace with actual dossier ID
    const consultationId = 'example_consultation_id'; // Replace with actual consultation ID

    let endpoint: string;
    let data: any;

    // Default values for the attributes
    let pression_arterielle: boolean = false;
    let glycemie: boolean = false;
    let cholestérol_total: boolean = false;

    // Loop through the params array and set the boolean values based on the presence of certain values
    this.params.forEach((param) => {
      if (param.nom === 'Glycémie') {
        glycemie = true;
      }
      if (param.nom === 'Niveaux de cholestérol') {
        cholestérol_total = true;
      }
      if (param.nom === 'Pression artérielle') {
        pression_arterielle = true;
      }
    });

    // Check the type and assign the endpoint and data accordingly
    if (this.type === 'Bilan biologique') {
      endpoint = `http://127.0.0.1:8000/medecin/bilan-biologique/create/${consultationId}/${dossierId}/`;
      data = {
        observation: this.observation,
        pression_arterielle: pression_arterielle,
        glycemie: glycemie,
        cholestérol_total: cholestérol_total,
      };
    } else if (this.type === 'Bilan radiologique') {
      endpoint = `http://127.0.0.1:8000/medecin/bilan-radiologique/create/${consultationId}/${dossierId}/`;
      data = {
        description: this.observation,
      };
    } else {
      console.error('Invalid bilan type');
      return; // Early exit if the type is invalid
    }

    // Now the endpoint will always have a value before it's used
    this.http.post(endpoint, data).subscribe({
      next: (response) => {
        console.log(`${this.type} created successfully:`, response);
        // Navigate or perform any other action after successful creation
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
