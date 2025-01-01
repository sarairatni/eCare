import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mes-patients',
  imports: [CommonModule, RouterModule],
  templateUrl: './mes-patients.component.html',
  styleUrl: './mes-patients.component.css',
})
export class MesPatientsComponent {
  listePatients = [
    {
      nss: 10000001,
      nom: 'Iratni',
      prenom: 'Sara Amina',
      age: 34,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000002,
      nom: 'Martin',
      prenom: 'Jean',
      age: 39,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000003,
      nom: 'Durand',
      prenom: 'Pierre',
      age: 46,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000004,
      nom: 'Leclerc',
      prenom: 'Luc',
      age: 32,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000005,
      nom: 'Lemoine',
      prenom: 'Marie',
      age: 37,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000006,
      nom: 'Petit',
      prenom: 'Claude',
      age: 29,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000007,
      nom: 'Rousseau',
      prenom: 'Anne',
      age: 44,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000008,
      nom: 'Fournier',
      prenom: 'Jacques',
      age: 59,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000009,
      nom: 'Petit',
      prenom: 'Éric',
      age: 29,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000010,
      nom: 'Rousseau',
      prenom: 'Sophie',
      age: 44,
      date_dentree: '2024-12-26',
    },
    {
      nss: 10000011,
      nom: 'Fournier',
      prenom: 'Bernard',
      age: 59,
      date_dentree: '2024-12-26',
    },
  ];
  
  constructor(private router: Router) {}

  navigateToConsultations(nss: number) {
    this.router.navigate([`/doctor/mes-patients/${nss}/consultations`]);
  }
}
