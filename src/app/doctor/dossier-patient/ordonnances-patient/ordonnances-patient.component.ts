import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordonnances-patient',
  imports: [RouterModule, CommonModule],
  templateUrl: './ordonnances-patient.component.html',
  styleUrl: './ordonnances-patient.component.css',
})
export class OrdonnancesPatientComponent {
  constructor(public activatedRoute: ActivatedRoute) {}
  listeOrdonnances = [
    {
      id: 1,
      date: '2024-12-27',
      medecin: 'Dr. Ahmed Bensalem',
      medicamments: 'Paracétamol, Ibuprofène',
      etat: 'Complétée',
    },
    {
      id: 2,
      date: '2024-12-20',
      medecin: 'Dr. Farah Khelifa',
      medicamments: 'Amoxicilline, Vitamine C',
      etat: 'En attente',
    },
    {
      id: 3,
      date: '2024-12-15',
      medecin: 'Dr. Samir Boukacem',
      medicamments: 'Aspirine, Doliprane',
      etat: 'Annulée',
    },
    {
      id: 4,
      date: '2024-12-10',
      medecin: 'Dr. Nadia Chibane',
      medicamments: 'Metformine, Atorvastatine',
      etat: 'Complétée',
    },
    {
      id: 5,
      date: '2024-12-05',
      medecin: 'Dr. Karim Meziane',
      medicamments: 'Lisinopril, Oméprazole',
      etat: 'En attente',
    },
    {
      id: 5,
      date: '2024-12-05',
      medecin: 'Dr. Karim Meziane',
      medicamments: 'Lisinopril, Oméprazole',
      etat: 'En attente',
    },
    {
      id: 5,
      date: '2024-12-05',
      medecin: 'Dr. Karim Meziane',
      medicamments: 'Lisinopril, Oméprazole',
      etat: 'En attente',
    },
    {
      id: 5,
      date: '2024-12-05',
      medecin: 'Dr. Karim Meziane',
      medicamments: 'Lisinopril, Oméprazole',
      etat: 'En attente',
    },
    {
      id: 5,
      date: '2024-12-05',
      medecin: 'Dr. Karim Meziane',
      medicamments: 'Lisinopril, Oméprazole',
      etat: 'En attente',
    },
  ];
}
