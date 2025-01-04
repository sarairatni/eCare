import { Component, input, OnInit, inject } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
    patientDetail: any;
  
    patientService = inject(PatientService);  // Inject the PatientService
  
    ngOnInit(): void {
      console.log('Patient PROFIL Detail:');
      // Access the patient detail from the PatientService
      this.patientDetail = this.patientService.getPatientDetail();
      console.log('Patient PROFIL Detail:', this.patientDetail);
    }
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
