import { NgFor } from '@angular/common';
import { Component, input, OnInit, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';
@Component({
  selector: 'app-historique-ordonnance',
  imports: [NgFor, RouterModule],
  templateUrl: './historique-ordonnance.component.html',
  styleUrl: './historique-ordonnance.component.css'
})
export class HistoriqueOrdonnanceComponent implements OnInit {
  medecin = input("Dr. Ahmed Benali, Cardiologue");
  date = input("15 janvier 2024");
  ordId : any;
  ordonnance:any;
  medicaments = input([
    {nom: "Paracétamol", dosage: "500mg", frequence: "3 fois par jour", duree: "7 jours", commentaire: "Prendre après les repas"},
    {nom: "Amoxicilline", dosage: "1g", frequence: "2 fois par jour", duree: "10 jours", commentaire: "Respecter les heures"},
    {nom: "Oméprazole", dosage: "20mg", frequence: "1 fois par jour", duree: "14 jours", commentaire: "A jeun"},
  ]);
  constructor(private route: ActivatedRoute, private patientService: PatientService) {}
  ngOnInit(): void {
    // Access the 'id' parameter from the route
    this.route.paramMap.subscribe(params => {
      this.ordId = params.get('id'); 
      
      console.log(this.ordId);
      const f1 = this.patientService.getOrdonnances();
      console.log(f1);
      this.ordonnance = f1.find(cons => cons.ordonnance_id.toString() === this.ordId); // 'id' corresponds to the dynamic segment in the URL
      console.log("oRDONNANCE ID:", this.ordonnance);
    });

  }
  instructions = input(["Boire beaucoup d’eau pendant le traitement", "Éviter les aliments acides pour une meilleure efficacité de l’oméprazole"]);
}
