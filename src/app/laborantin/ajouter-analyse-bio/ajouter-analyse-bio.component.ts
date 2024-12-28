import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ajouter-analyse-bio',
  imports: [CommonModule, RouterModule],
  templateUrl: './ajouter-analyse-bio.component.html',
  styleUrl: './ajouter-analyse-bio.component.css',
})
export class AjouterAnalyseBioComponent implements OnInit {
  listeAnalysesBio = [
    {
      id: 1,
      param: 'Glucose',
      valeur_mesuree: 95,
      valeur_normale: '70-100',
      interpretation: 'Normale',
    },
    {
      id: 2,
      param: 'Hémoglobine',
      valeur_mesuree: 13.5,
      valeur_normale: '12-16',
      interpretation: 'Normale',
    },
    {
      id: 3,
      param: 'Cholestérol',
      valeur_mesuree: 220,
      valeur_normale: '125-200',
      interpretation: 'Élevé',
    },
    {
      id: 4,
      param: 'Triglycérides',
      valeur_mesuree: 150,
      valeur_normale: '50-150',
      interpretation: 'Limite',
    },
    {
      id: 5,
      param: 'Créatinine',
      valeur_mesuree: 1.2,
      valeur_normale: '0.6-1.3',
      interpretation: 'Normale',
    },
    {
      id: 6,
      param: 'Protéine C réactive (CRP)',
      valeur_mesuree: 8,
      valeur_normale: '< 10',
      interpretation: 'Normale',
    },
    {
      id: 7,
      param: 'Acide urique',
      valeur_mesuree: 7.5,
      valeur_normale: '3.5-7.2',
      interpretation: 'Élevé',
    },
    {
      id: 8,
      param: 'Bilirubine',
      valeur_mesuree: 0.8,
      valeur_normale: '0.2-1.2',
      interpretation: 'Normale',
    },
    {
      id: 9,
      param: 'Transaminases (ALT)',
      valeur_mesuree: 55,
      valeur_normale: '10-40',
      interpretation: 'Élevé',
    },
    {
      id: 10,
      param: 'Globules blancs',
      valeur_mesuree: 7500,
      valeur_normale: '4000-11000',
      interpretation: 'Normale',
    },
  ];
  dpi_id: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.dpi_id = params.get('dpi_id');
      console.log('dpi_id:', this.dpi_id);
    });
  }
}
