import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  imports: [NgFor],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent {
  patient = input("Ladoul Mahdi");
  nss = input(10212587);
  medecin = input("Ladoul Mahdi");
  ordonnances = input([
    {nom: 'Ord1', etat: 0},
    {nom: 'Ord2', etat: 1},
    {nom: 'Ord3', etat: 0},
    {nom: 'Ord4', etat: 1},
    {nom: 'Ord5', etat: 2},
    {nom: 'Ord6', etat: 1},
  ]);
  imageries = input(['Radiographie du thorax', 'IRM du cerveau', 'Radiographie du thorax', 'IRM du cerveau', 'Radiographie du thorax', 'IRM du cerveau', 'Radiographie du thorax', 'IRM du cerveau',]);
  resultats = input(["Demander cértificat médical", "Demander decompte des frais d'hospitalisation"]);

  textEtat(etat: number) {
    switch(etat) {
      case 0:
        return "Validée";
      case 1:
        return "En cours de validation";
      case 2:
        return "Rejetée";
      default:
        return "État inconnu";

    }
  }
}
