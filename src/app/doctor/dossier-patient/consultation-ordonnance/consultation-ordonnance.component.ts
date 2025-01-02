import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-ordonnance',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-ordonnance.component.html',
  styleUrls: ['./consultation-ordonnance.component.css'],
})
export class ConsultationOrdonnanceComponent {
  medicaments = [
    {
      nom: '',
      dosage: '',
      duree: '',
    },
  ];
  showForm = false;

  newMedicament = {
    nom: '',
    dosage: '',
    duree: '',
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addMedicament() {
    if (
      this.newMedicament.nom &&
      this.newMedicament.dosage &&
      this.newMedicament.duree
    ) {
      this.medicaments.push({ ...this.newMedicament });
      this.resetForm();
    }
  }

  resetForm() {
    this.newMedicament = { nom: '', dosage: '', duree: '' };
    this.showForm = false;
  }
}
