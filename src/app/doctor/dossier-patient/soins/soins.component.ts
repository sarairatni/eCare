import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-soins',
  imports: [CommonModule, RouterModule],
  templateUrl: './soins.component.html',
  styleUrl: './soins.component.css',
})
export class SoinsComponent {
  listeSoins = [
    {
      id: 1,
      type: 'Pansement',
      dateHeure: '2024-12-26 14:30',
      infirmier: 'Amina Belaid',
      details: 'Changement de pansement après chirurgie au genou.',
    },
    {
      id: 2,
      type: 'Injection',
      dateHeure: '2024-12-27 10:00',
      infirmier: 'Yassine Ferhat',
      details: 'Injection d’antibiotiques pour traiter une infection.',
    },
    {
      id: 3,
      type: 'Prise de sang',
      dateHeure: '2024-12-28 08:15',
      infirmier: 'Nour El Houda Saadi',
      details: 'Analyse pour vérifier les niveaux de cholestérol.',
    },
    {
      id: 4,
      type: 'Perfusion',
      dateHeure: '2024-12-29 16:00',
      infirmier: 'Karim Othmani',
      details: 'Hydratation par perfusion après déshydratation.',
    },
    {
      id: 5,
      type: 'Examen de contrôle',
      dateHeure: '2024-12-30 09:30',
      infirmier: 'Sara Messaoud',
      details: 'Contrôle de la tension artérielle et des constantes vitales.',
    },
  ];
  selectedSoinId: number | null = null;
  
  selectedSoin: any = null;
  showPopup = false;
  openDetails(event: Event, id: number): void {
    event.preventDefault(); // Prevent default link behavior
    this.selectedSoin = this.listeSoins.find(soin => soin.id === id);
    this.showPopup = true; // Show the popup
  }

  closePopup(): void {
    this.showPopup = false; // Hide the popup
  }
}
