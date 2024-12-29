import { Component, input} from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-patient-antecedents',
  imports: [NgFor],
  templateUrl: './patient-antecedents.component.html',
  styleUrl: './patient-antecedents.component.css'
})
export class PatientAntecedentsComponent {
  maladies  = input([
    { "Type": "Infection virale", "Nom": "Grippe", "Date": "01/12/2023 - 07/12/2023" },
    { "Type": "Maladie chronique", "Nom": "Diabète de type 2", "Date": "Diagnostiqué en 2015, suivi continu" },
    { "Type": "Trouble cardiovasculaire", "Nom": "Hypertension", "Date": "Diagnostiquée en 2020, sous traitement permanent" },
    { "Type": "Maladie auto-immune", "Nom": "Arthrite rhumatoïde", "Date": "Diagnostiquée en 2018, traitement en cours" },
    { "Type": "Cancer", "Nom": "Cancer du poumon", "Date": "Diagnostiqué en 2022, traitement en cours" }
  ])
  

}
