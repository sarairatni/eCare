import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-historique-ordonnance-consultation',
  imports: [NgFor],
  templateUrl: './historique-ordonnance-consultation.component.html',
  styleUrl: './historique-ordonnance-consultation.component.css'
})
export class HistoriqueOrdonnanceConsultationComponent {
  medecin = input("Dr. Ahmed Benali, Cardiologue");
  date = input("15 janvier 2024");
  etat = input("Validée");
  medicaments = input([
    {nom: "Paracétamol", dosage: "500mg", frequence: "3 fois par jour", duree: "7 jours", commentaire: "Prendre après les repas"},
    {nom: "Amoxicilline", dosage: "1g", frequence: "2 fois par jour", duree: "10 jours", commentaire: "Respecter les heures"},
    {nom: "Oméprazole", dosage: "20mg", frequence: "1 fois par jour", duree: "14 jours", commentaire: "A jeun"},
  ]);

  instructions = input(["Boire beaucoup d’eau pendant le traitement", "Éviter les aliments acides pour une meilleure efficacité de l’oméprazole"]);

}
