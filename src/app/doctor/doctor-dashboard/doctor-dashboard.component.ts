import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css',
})
export class DoctorDashboardComponent {
  consultations = [
    {
      nomPatient: 'Dupont Jean',
      nss: '1234567890123',
      age: 45,
      statut: 'En cours',
    },
    {
      nomPatient: 'Dupont Jean',
      nss: '1234567890123',
      age: 45,
      statut: 'En cours',
    },
    {
      nomPatient: 'Dupont Jean',
      nss: '1234567890123',
      age: 45,
      statut: 'En cours',
    },
    {
      nomPatient: 'Dupont Jean',
      nss: '1234567890123',
      age: 45,
      statut: 'En cours',
    },
    {
      nomPatient: 'Dupont Jean',
      nss: '1234567890123',
      age: 45,
      statut: 'En cours',
    },
    {
      nomPatient: 'Martin Claire',
      nss: '9876543210987',
      age: 34,
      statut: 'Terminé',
    },
    {
      nomPatient: 'Bernard Luc',
      nss: '1231231231231',
      age: 29,
      statut: 'Annulé',
    },
    {
      nomPatient: 'Durand Sophie',
      nss: '7897897897897',
      age: 52,
      statut: 'En cours',
    },
    {
      nomPatient: 'Dupont Jean',
      nss: '1234567890123',
      age: 45,
      statut: 'En cours',
    },
    {
      nomPatient: 'Dupont Jean',
      nss: '1234567890123',
      age: 45,
      statut: 'En cours',
    },
    {
      nomPatient: 'Dupont Jean',
      nss: '1234567890123',
      age: 45,
      statut: 'En cours',
    },
    {
      nomPatient: 'Dupont Jean',
      nss: '1234567890123',
      age: 45,
      statut: 'En cours',
    },
  ];
}
