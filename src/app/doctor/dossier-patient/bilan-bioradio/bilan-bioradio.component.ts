import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bilan-bioradio',
  imports: [CommonModule,RouterModule],
  templateUrl: './bilan-bioradio.component.html',
  styleUrl: './bilan-bioradio.component.css',
})
export class BilanBioradioComponent {
  date = input('15 janvier 2024');
  medecin = input('Dr.Fatima Lounis, Généraliste');
  type = input('Bilan sanguin');
  parametres = input([
    { parametre: 'Glycémie à jeun', valeur: '0,7 - 1,1 g/L' },
    { parametre: 'Amoxicilline', valeur: '< 2 g/L' },
    { parametre: 'Oméprazole', valeur: '< 1,5 g/L' },
    { parametre: 'Hémoglobine', valeur: '12 - 16 g/dL' },
  ]);
  instructions = input([
    'Présentez-vous à jeun',
    'Prenez rendez-vous avant le 15/01/2024',
  ]);
}
