import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-historique',
  imports: [NgFor],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {
  consultations = input([
    {date: "12/01/2024", medecin: "Dr. Ahmed, Cardiologue", motif: "Douleur abdominale", diagnostic: "repos recommandé"},
    {date: "05/12/2023", medecin: "Dr. Fatima, Généraliste", motif: "Fièvre et fatigue", diagnostic: "Infection virale"},
    {date: "25/09/2024", medecin: "Dr. Fatima, Généraliste", motif: "Mal aux chevilles", diagnostic: "Demande de radio"},
  ])

  ordonnances = input([
    {date: "12/01/2024", medecin: "Dr. Ahmed, Cardiologue", medicaments: "Paracétamol, Amoxiciline", duree: "7 jours"},
    {date: "05/12/2023", medecin: "Dr. Fatima, Généraliste", medicaments: "Ibuprofène", duree: "5 jours"},
  ])
}
