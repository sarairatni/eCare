import { NgFor, NgStyle, NgIf } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-imagerie',
  imports: [NgFor,NgIf, NgStyle],
  templateUrl: './imagerie.component.html',
  styleUrl: './imagerie.component.css'
})
export class ImagerieComponent {
 lieu = input("Service de radiologie, Hôpital Mustapha Pacha");
    date = input("15 janvier 2024");
    radiologue = input("M. Karim Haddad");
    uploadedImage= input("/imagemedecin.png");

    resume = input (["1- Aucune anomalie détectée au niveau des poumons et du cœur", "2- Léger épaississement de la paroi bronchique, pouvant indiquer une inflammation bénigne."])
   
  
    

}
