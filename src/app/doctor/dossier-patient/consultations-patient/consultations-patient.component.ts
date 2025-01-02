import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultations-patient',
  imports: [CommonModule, RouterModule],
  templateUrl: './consultations-patient.component.html',
  styleUrl: './consultations-patient.component.css',
})
export class ConsultationsPatientComponent {
  nss: string | null = null;

  constructor(public activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.nss = params['nss'];
      console.log('NSS du patient:', this.nss);
    });
  }

  listeConsultations = [
    {
      id: 1,
      date: '2024-12-01',
      medecin: 'Dr. Dupont',
      motif: 'Douleur abdominale',
      diagnostic:
        'Gastrite hémorragique hdh fréquents fef gverbgrthb nyujnu kik,ki',
    },
    {
      id: 2,
      date: '2024-11-20',
      medecin: 'Dr. Martin',
      motif: 'Maux de tête fréquents',
      diagnostic: 'Migraine',
    },
    {
      id: 3,
      date: '2024-11-15',
      medecin: 'Dr. Leroy',
      motif: 'Fièvre persistante',
      diagnostic: 'Infection virale',
    },
    {
      id: 4,
      date: '2024-11-10',
      medecin: 'Dr. Petit',
      motif: 'Douleur thoracique',
      diagnostic: 'Angine de poitrine',
    },
    {
      id: 5,
      date: '2024-11-05',
      medecin: 'Dr. Rousseau',
      motif: 'Toux chronique',
      diagnostic: 'Bronchite',
    },
    {
      id: 6,
      date: '2024-10-28',
      medecin: 'Dr. Fournier',
      motif: 'Douleur au dos',
      diagnostic: 'Lumbago',
    },
    {
      id: 7,
      date: '2024-10-20',
      medecin: 'Dr. Durand',
      motif: 'Fatigue généralisée',
      diagnostic: 'Anémie',
    },
    {
      id: 8,
      date: '2024-10-15',
      medecin: 'Dr. Leclerc',
      motif: 'Douleur à l’oreille',
      diagnostic: 'Otite',
    },
    {
      id: 9,
      date: '2024-10-10',
      medecin: 'Dr. Dupont',
      motif: 'Douleur articulaire',
      diagnostic: 'Arthrite',
    },
    {
      id: 10,
      date: '2024-10-05',
      medecin: 'Dr. Martin',
      motif: 'Difficulté à respirer',
      diagnostic: 'Asthme',
    },
  ];
}
