import { Component, input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-analyse',
  imports: [NgFor],
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.css'
})
export class AnalyseComponent implements OnInit {
   constructor(private route: ActivatedRoute, private patientService: PatientService) {}
   ordId:any;
   imagerie:any;
   ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.ordId = params.get('id'); 
      console.log(this.ordId);
      const f1 = this.patientService.getBiologique();
      console.log(f1);
      this.imagerie = f1.find(cons => cons.id.toString() === this.ordId); // 'id' corresponds to the dynamic segment in the URL
      console.log("Imagerie ID:", this.imagerie);
      this.Parametres = this.createParametersArray(this.imagerie.parametres, this.imagerie.valeurs, this.imagerie.interpretations);
      console.log('sadijoew', this.Parametres);
    });
   }
    createParametersArray(parametres: string, valeurs: string, interpretations: string): { parameter: string, value: string }[] {
    const parametresArray = parametres.split('/')
    const valeursArray = valeurs.split('/')
    const interArray = interpretations.split('/')
    
  
    return parametresArray.map((parameter, index) => ({
      parameter,
      value: valeursArray[index],
      interpretation: interArray[index]
    }));
   }
  labo = input("BioLab Sante");
  date = input("15 janvier 2024");
  tech = input("M. Karim Haddad")
  Parametres : any;
  

  instructions = input(["Boire beaucoup d’eau pendant le traitement", "Éviter les aliments acides pour une meilleure efficacité de l’oméprazole"]);

}
