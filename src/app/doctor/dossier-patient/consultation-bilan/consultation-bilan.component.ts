import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultation-bilan',
  imports: [FormsModule, CommonModule],
  templateUrl: './consultation-bilan.component.html',
  styleUrls: ['./consultation-bilan.component.css'],
})
export class ConsultationBilanComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  nss: string = '';
  type: string = 'Bilan biologique'; // Default value
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
}
