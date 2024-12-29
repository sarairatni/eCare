import { Component, input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-analyse',
  imports: [NgFor],
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.css'
})
export class AnalyseComponent {
  labo = input("BioLab Sante");
  date = input("15 janvier 2024");
  tech = input("M. Karim Haddad")
  Parametres = input([
    { "Parametres": "Hémoglobine", "Valeur": "13.5 g/dL", "ValeurNor": "12-16 g/dL", "interpretation": "Valeur normale" },
    { "Parametres": "Glucose à jeun", "Valeur": "110 mg/dL", "ValeurNor": "70-99 mg/dL", "interpretation": "Hyperglycémie modérée" },
    { "Parametres": "Cholestérol LDL", "Valeur": "150 mg/dL", "ValeurNor": "< 130 mg/dL", "interpretation": "Niveau élevé, surveiller" },
    { "Parametres": "Créatinine", "Valeur": "1.2 mg/dL", "ValeurNor": "0.7-1.2 mg/dL", "interpretation": "Valeur limite haute" },
    { "Parametres": "Vitamine D", "Valeur": "25 ng/mL", "ValeurNor": "30-50 ng/mL", "interpretation": "Carence légère" }
  ])
  

  instructions = input(["Boire beaucoup d’eau pendant le traitement", "Éviter les aliments acides pour une meilleure efficacité de l’oméprazole"]);

}
