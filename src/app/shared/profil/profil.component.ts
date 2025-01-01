import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  patient = input({
    nom: "Ladoul",
    prenom: "Mahdi",
    nss: "10212587",
    sexe: "Masculin",
    dateNaissance: "13/05/2004",
    telephone: "0123456789",
    adresse: "l'adresse de patient",
    mutuelle: "Dr. Ladoul",
    medecin: "Dr. Ladoul",
    etatCivil: "Célibataire",
    groupeSanguin: "B-",
    profession: "Professeur"
  })
}
