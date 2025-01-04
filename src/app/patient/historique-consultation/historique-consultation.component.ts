import { NgFor } from '@angular/common';
import { Component, input, OnInit, inject  } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';
@Component({
  selector: 'app-historique-consultation',
  imports: [NgFor, RouterModule],
  templateUrl: './historique-consultation.component.html',
  styleUrl: './historique-consultation.component.css'
})
export class HistoriqueConsultationComponent implements OnInit {
  date = input("15 Janvier 2024");
  medecin = input("Dr. Fatima Lounis, Généraliste");
  patientService=inject(PatientService)
  consultation :any
  motif = input("Fièvre et fatigue persistantes depuis 5 jours");
  observations = input(["Fièvre modérée (38.5 °C)", "Gorge légèrement rouge, ganglions cervicaux palpables", "Tension artérielle : 120/80 mmHg",
  ]);
  consultationId: string | null = null;
  diagnostic = input("Angine virale probable. Angine bactérienne suspectée");
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    // Access the 'id' parameter from the route
    this.route.paramMap.subscribe(params => {
      this.consultationId = params.get('id'); 
      
      console.log(this.consultationId);
      const f1 = this.patientService.getConsultations();
      console.log(f1);
      this.consultation = f1.find(cons => cons.id.toString() === this.consultationId); // 'id' corresponds to the dynamic segment in the URL
      console.log("Consultation ID:", this.consultation);
    });

  }

}
