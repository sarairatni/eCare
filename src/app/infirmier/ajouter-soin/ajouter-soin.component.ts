import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PopupAjouterSoinComponent } from '../../components/popup-ajouter-soin/popup-ajouter-soin.component';

@Component({
  selector: 'app-ajouter-soin',
  imports: [CommonModule, RouterModule, PopupAjouterSoinComponent, NgIf],
  templateUrl: './ajouter-soin.component.html',
  styleUrl: './ajouter-soin.component.css'
})
export class AjouterSoinComponent {
  popupVisible : boolean = false;
  listeDPIs = [
    {
      id: 1,
      nom: 'Dupont Jean',
      nss: '1234567890123',
      age: 35,
      date_entree: '2023-01-10',
    },
    {
      id: 2,
      nom: 'Martin Claire',
      nss: '1234567890124',
      age: 29,
      date_entree: '2022-08-15',
    },
    {
      id: 3,
      nom: 'Lemoine Marc',
      nss: '1234567890125',
      age: 40,
      date_entree: '2021-05-20',
    },
    {
      id: 4,
      nom: 'Benoit Sophie',
      nss: '1234567890126',
      age: 55,
      date_entree: '2023-11-12',
    },
    {
      id: 5,
      nom: 'Pires Alexandre',
      nss: '1234567890127',
      age: 60,
      date_entree: '2022-06-05',
    },
    {
      id: 6,
      nom: 'Legrand Claire',
      nss: '1234567890128',
      age: 50,
      date_entree: '2020-02-22',
    },
    {
      id: 7,
      nom: 'Vidal Philippe',
      nss: '1234567890129',
      age: 45,
      date_entree: '2023-03-18',
    },
    {
      id: 8,
      nom: 'Garnier Bernard',
      nss: '1234567890130',
      age: 32,
      date_entree: '2021-09-30',
    },
    {
      id: 9,
      nom: 'Nguyen Marie',
      nss: '1234567890131',
      age: 28,
      date_entree: '2022-04-11',
    },
    {
      id: 10,
      nom: 'Dupuis Julien',
      nss: '1234567890132',
      age: 39,
      date_entree: '2021-12-01',
    },
    {
      id: 11,
      nom: 'Moreau Alice',
      nss: '1234567890133',
      age: 60,
      date_entree: '2023-08-17',
    },
    {
      id: 12,
      nom: 'Boucher Michel',
      nss: '1234567890134',
      age: 48,
      date_entree: '2022-07-22',
    },
    {
      id: 13,
      nom: 'Hernandez Clara',
      nss: '1234567890135',
      age: 33,
      date_entree: '2021-11-14',
    },
    {
      id: 14,
      nom: 'Roux Thomas',
      nss: '1234567890136',
      age: 38,
      date_entree: '2020-05-07',
    },
    {
      id: 15,
      nom: 'Lemoine Isabelle',
      nss: '1234567890137',
      age: 53,
      date_entree: '2023-02-27',
    },
  ];


  selectedNss: string = '';

  constructor(private router: Router) {}

  selectDPI(nss: string): void {
    this.selectedNss= nss; // Stocker l'ID sélectionné
  }

  afficherPopup(): void {
    this.popupVisible = true;
  }

  masquerPopup(): void {
    this.popupVisible = false;
  }
}
