import { NgFor, NgStyle, NgIf } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-imagerie',
  imports: [NgFor,NgIf, NgStyle],
  templateUrl: './imagerie.component.html',
  styleUrl: './imagerie.component.css'
})
export class ImagerieComponent implements OnInit {
   constructor(private route: ActivatedRoute, private patientService: PatientService) {}
   ordId:any;
   imagerie:any;
   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ordId = params.get('id'); 
      console.log(this.ordId);
      const f1 = this.patientService.getRadiologique();
      console.log(f1);
      this.imagerie = f1.find(cons => cons.id.toString() === this.ordId); // 'id' corresponds to the dynamic segment in the URL
      console.log("Imagerie ID:", this.imagerie);
    });
   }
    lieu = input("Service de radiologie, Hôpital Mustapha Pacha");
    date = input("15 janvier 2024");
    radiologue = input("M. Karim Haddad");
    uploadedImage= input("/imagemedecin.png");

    resume = input (["1- Aucune anomalie détectée au niveau des poumons et du cœur", "2- Léger épaississement de la paroi bronchique, pouvant indiquer une inflammation bénigne."])
   
  
    

}
