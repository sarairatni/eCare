import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultation-ordonnance',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-ordonnance.component.html',
  styleUrls: ['./consultation-ordonnance.component.css'],
})
export class ConsultationOrdonnanceComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {} // Inject Router and ActivatedRoute
  nss: string = '';
  consultationId: string | null = null;
  ngOnInit(): void {
    // Get the nss parameter from the route
    this.activatedRoute.paramMap.subscribe((params) => {
      this.nss = params.get('nss') || '';
      this.consultationId = params.get('consultationId') || '';
    });
  }

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

  navigateToAntecedants() {
    this.router.navigate([
      `/doctor/mes-patients/${this.nss}/nouvelle-consultation/antecedants`,
    ]);
  }
}
