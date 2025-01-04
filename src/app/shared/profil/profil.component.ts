import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  user: any;
  patient = {
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
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    let user : any;
    user = this.authService.getUser();
    console.log(user);
    this.patient.nom = user.last_name;
    this.patient.prenom = user.first_name;
    this.patient.nss = user.num_securite_sociale || "/";
    this.patient.sexe = user.sexe || "/";
    this.patient.dateNaissance = user.date_naissance || "/";
    this.patient.telephone = user.telephone || "/";
    this.patient.adresse = user.adress || "/";
    this.patient.mutuelle = user.mutuelle || "/";
    this.patient.medecin = user.medecin || "/";
    this.patient.etatCivil = user.etat_civil || "/";
    this.patient.groupeSanguin = user.groupe_sanguin || "/";
    this.patient.profession = user.profession || "/";
    console.log(user);
  }
  
}
