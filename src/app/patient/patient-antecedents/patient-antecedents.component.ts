import { Component, input} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-patient-antecedents',
  imports: [NgFor, NgIf],
  templateUrl: './patient-antecedents.component.html',
  styleUrl: './patient-antecedents.component.css'
})
export class PatientAntecedentsComponent {
  isPopupVisible = false;
  selectedMed: any = null;

  // Sample maladies data
  maladies() {
    return [
      {
        Type: 'Maladie Chronique',
        Nom: 'Diabète',
        Date: '2023-01-15',
        Details: 'Le diabète est une maladie chronique affectant la régulation de la glycémie.',
      },
      {
        Type: 'Maladie Chronique',
        Nom: 'Diabète',
        Date: '2023-01-15',
        Details: 'Le diabète est une maladie chronique affectant la régulation de la glycémie.',
      },
      {
        Type: 'Maladie Chronique',
        Nom: 'Diabète',
        Date: '2023-01-15',
        Details: 'Le diabète est une maladie chronique affectant la régulation de la glycémie.',
      },
      {
        Type: 'Maladie Chronique',
        Nom: 'Diabète',
        Date: '2023-01-15',
        Details: 'Le diabète est une maladie chronique affectant la régulation de la glycémie.',
      },
      {
        Type: 'Infection',
        Nom: 'Grippe',
        Date: '2023-10-05',
        Details: 'La grippe est une infection virale courante causant de la fièvre, des frissons et une fatigue.',
      },
    ];
  }

  openPopup(med: any) {
    this.selectedMed = med;
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
    this.selectedMed = null;
  }
  

}
