import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdonnanceService } from '../../../services/ordonnance_service/ordonnance.service';

@Component({
  selector: 'app-ordonnances-patient',
  templateUrl: './ordonnances-patient.component.html',
  styleUrls: ['./ordonnances-patient.component.css'],
  imports: [RouterModule, CommonModule],
})
export class OrdonnancesPatientComponent implements OnInit {
  listeOrdonnances: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    public activatedRoute: ActivatedRoute,
    private ordonnanceService: OrdonnanceService
  ) {}

  ngOnInit() {
    const dossierId =
      this.activatedRoute.parent?.snapshot.params['nss'] ||
      this.activatedRoute.snapshot.params['nss'];

    this.fetchOrdonnances(dossierId);
  }

  fetchOrdonnances(dossierId: number) {
    this.http
      .get<any[]>(
        `http://127.0.0.1:8000/patients/${dossierId}/list_ordonnances/`
      )
      .subscribe({
        next: (data) => {
          this.listeOrdonnances = data;

          this.listeOrdonnances.forEach((ordonnance) => {
            this.fetchMedicationsForOrdonnance(ordonnance);
          });
        },
        error: (error) => {
          this.errorMessage =
            'Failed to load ordonnances. Please try again later.';
        },
      });
  }

  fetchMedicationsForOrdonnance(ordonnance: any) {
    this.http
      .get<any>(
        `http://127.0.0.1:8000/ordonnance/${ordonnance.id}/medicaments/`
      )
      .subscribe({
        next: (response) => {
          const medications = response.medicaments;
          if (Array.isArray(medications)) {
            const medicamentNames = medications
              .map((medicament) => medicament.nom)
              .join(', ');
            ordonnance.medicamments = medicamentNames;
          }
        },
        error: (error) => {
          console.error('Error fetching medications:', error);
        },
      });
  }

  // Set the ordonnance and navigate to the detail page
  viewDetails(ordonnance: any) {
    this.ordonnanceService.setOrdonnance(ordonnance);
  }
}
