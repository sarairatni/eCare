import { NgFor } from '@angular/common';
import { Component, input, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PatientService } from '../../services/patient.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-historique',
  imports: [NgFor, RouterModule],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {
  authService=inject(AuthService);
  patientData:any;
  consultations: any[] = []; 
  http=inject(HttpClient);
  patientService=inject(PatientService)
  ordonnances: any[] = [];  
  ngOnInit(): void {
    // Retrieve user from AuthService
    
      // Step 1: Send user ID to get patient data (fetch NSS)
     console.log()
      this.patientData = this.patientService.getPatientDetail();
      const nss = this.patientData.num_securite_sociale;  // Assuming this is the NSS field
      console.log(nss);

      this.consultations = this.patientService.getConsultations();
      // Loop through consultations and fetch ordonnances for each
      this.ordonnances = this.patientService.getOrdonnances();

  
  }
 

  
 
}
