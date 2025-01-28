import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrdonnanceService } from '../../../services/ordonnance_service/ordonnance.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-ordonnance',
  templateUrl: './consultation-ordonnance.component.html',
  imports: [RouterModule, CommonModule, FormsModule],
  styleUrls: ['./consultation-ordonnance.component.css'],
})
export class ConsultationOrdonnanceComponent implements OnInit {
  nss: string = '';
  consultationId: string | null = null;
  medicaments: any[] = [];
  newMedicament = {
    nom: '',
    dosage: '',
    duree: '',
  };
  showForm = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ordonnanceService: OrdonnanceService // Inject the service
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.nss = params.get('nss') || '';
      this.consultationId = params.get('consultationId') || '';
    });
  }

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

  CreateOrdonnance() {
    if (this.consultationId) {
      const ordonnanceData = {
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        medicaments: this.medicaments.map((medicament) => ({
          nom: medicament.nom,
          dosage: medicament.dosage,
          voie_administration: medicament.duree, // Correctly mapped
        })),
      };
      console.log('Ordonnance data:', ordonnanceData);
      this.ordonnanceService
        .createOrdonnance(this.consultationId, ordonnanceData)
        .subscribe({
          next: (response) => {
            console.log('Ordonnance created successfully:', response);
            this.router.navigate([
              `/doctor/mes-patients/${this.nss}/nouvelle-consultation/antecedants/`,
            ]);
          },
          error: (error) => {
            console.error('Error creating ordonnance:', error);
          },
        });
    }
  }

  submitOrdonnance() {
    this.CreateOrdonnance();
  }
}
