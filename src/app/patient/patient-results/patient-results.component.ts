import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-patient-results',
  imports: [NgFor],
  templateUrl: './patient-results.component.html',
  styleUrl: './patient-results.component.css'
})
export class PatientResultsComponent {
  consultations = input([
    {"Date": "15/03/2023", "Type": "Hémogramme", "Laboratoire": "Laboratoire BioSanté"},
    {"Date": "22/04/2023", "Type": "Glycémie à jeun", "Laboratoire": "Clinique MedLab"},
    {"Date": "10/05/2023", "Type": "Électrolytes", "Laboratoire": "Centre Diagnos+ Santé"},
    {"Date": "18/07/2023", "Type": "Lipidogramme", "Laboratoire": "Laboratoire BioSanté"},
    {"Date": "05/09/2023", "Type": "Fonction rénale", "Laboratoire": "Clinique MedLab"},
    {"Date": "14/11/2023", "Type": "Bilan hépatique", "Laboratoire": "Laboratoire BioSanté"},
    {"Date": "02/01/2024", "Type": "Vitamine D", "Laboratoire": "Centre Diagnos+ Santé"},
    {"Date": "19/02/2024", "Type": "TSH", "Laboratoire": "Clinique MedLab"},
    {"Date": "08/03/2024", "Type": "CRP", "Laboratoire": "Laboratoire BioSanté"},
    {"Date": "27/05/2024", "Type": "Fer sérique", "Laboratoire": "Centre Diagnos+ Santé"},
    {"Date": "12/06/2024", "Type": "Bilan thyroïdien", "Laboratoire": "Laboratoire BioSanté"},
    {"Date": "03/08/2024", "Type": "Hémoglobine glyquée", "Laboratoire": "Clinique MedLab"}
]
)

  resultats = input([
    {"Date": "12/03/2023", "Type": "Hémogramme", "Resume": "Globules rouges normaux, légère anémie détectée"},
    {"Date": "20/04/2023", "Type": "Glycémie à jeun", "Resume": "Niveau de glucose normal"},
    {"Date": "08/05/2023", "Type": "Électrolytes", "Resume": "Équilibre électrolytique stable"},
    {"Date": "15/07/2023", "Type": "Lipidogramme", "Resume": "Cholestérol LDL élevé, HDL normal"},
    {"Date": "01/09/2023", "Type": "Fonction rénale", "Resume": "Créatinine légèrement élevée, fonction rénale à surveiller"},
    {"Date": "10/11/2023", "Type": "Bilan hépatique", "Resume": "Enzymes hépatiques normales"},
    {"Date": "05/01/2024", "Type": "Vitamine D", "Resume": "Carence légère en vitamine D détectée"},
    {"Date": "17/02/2024", "Type": "TSH", "Resume": "Fonction thyroïdienne normale"},
    {"Date": "03/03/2024", "Type": "CRP", "Resume": "Aucune inflammation détectée"},
    {"Date": "25/05/2024", "Type": "Fer sérique", "Resume": "Taux de fer bas, diagnostic d'une anémie possible"},
    {"Date": "11/06/2024", "Type": "Bilan thyroïdien", "Resume": "TSH normale, T3 et T4 dans les limites"},
    {"Date": "30/07/2024", "Type": "Hémoglobine glyquée", "Resume": "Contrôle glycémique adéquat"}
]
)
}
