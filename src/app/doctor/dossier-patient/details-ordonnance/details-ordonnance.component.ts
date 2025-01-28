import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdonnanceService } from '../../../services/ordonnance_service/ordonnance.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-ordonnance',
  imports: [CommonModule, RouterModule],
  templateUrl: './details-ordonnance.component.html',
  styleUrl: './details-ordonnance.component.css',
})
export class DetailsOrdonnanceComponent implements OnInit {
  ordonnance: any = {};
  private medicamentsData: any[] = [];
  constructor(
    private ordonnanceService: OrdonnanceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.ordonnance = this.ordonnanceService.getOrdonnance();
    console.log('lodonnance dans detailllllll', this.ordonnance);
    if (this.ordonnance && this.ordonnance.id) {
      this.fetchMedicaments(this.ordonnance.id);
    }
  }

  get medecin(): string {
    return this.ordonnance?.medecin || 'Médecin inconnu';
  }

  get date(): string {
    return this.ordonnance?.date || 'Date non spécifiée';
  }

  get medicaments(): any[] {
    return this.medicamentsData;
  }

  private fetchMedicaments(id: number): void {
    this.http
      .get<any>(`http://127.0.0.1:8000/ordonnance/${id}/medicaments/`)
      .subscribe({
        next: (response) => {
          this.medicamentsData = response.medicaments || [];
        },
        error: (error) => {
          console.error('Error fetching medicaments:', error);
          this.medicamentsData = [];
        },
      });
  }
  // input([
  //   {
  //     nom: 'Paracétamol',
  //     dosage: '500mg',
  //     frequence: '3 fois par jour',
  //     duree: '7 jours',
  //     commentaire: 'Prendre après les repas',
  //   },
  //   {
  //     nom: 'Amoxicilline',
  //     dosage: '1g',
  //     frequence: '2 fois par jour',
  //     duree: '10 jours',
  //     commentaire: 'Respecter les heures',
  //   },
  //   {
  //     nom: 'Oméprazole',
  //     dosage: '20mg',
  //     frequence: '1 fois par jour',
  //     duree: '14 jours',
  //     commentaire: 'A jeun',
  //   },
  // ]);

  instructions = input([
    'Boire beaucoup d’eau pendant le traitement',
    'Éviter les aliments acides pour une meilleure efficacité de l’oméprazole',
  ]);
}
