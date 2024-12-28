import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details-consultations',
  imports: [CommonModule, RouterModule],
  templateUrl: './details-consultations.component.html',
  styleUrl: './details-consultations.component.css',
})
export class DetailsConsultationsComponent {
  date = input('15 Janvier 2024');
  medecin = input('Dr. Fatima Lounis, Généraliste');
  motif = input('Fièvre et fatigue persistantes depuis 5 jours');
  observations = input([
    'Fièvre modérée (38.5 °C)',
    'Gorge légèrement rouge, ganglions cervicaux palpables',
    'Tension artérielle : 120/80 mmHg',
  ]);
  diagnostic = input('Angine virale probable. Angine bactérienne suspectée');
}
