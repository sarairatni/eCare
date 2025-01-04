import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface Soin {
  id: number;
  type: string;
  date: string;
  infirmier_id: string;
  description: string;
  observation: string;
}

interface Infirmier {
  nom: string;
  prenom: string;
  email: string;
}

@Component({
  selector: 'app-soins',
  imports: [CommonModule, RouterModule],
  templateUrl: './soins.component.html',
  styleUrl: './soins.component.css',
})
export class SoinsComponent implements OnInit {
  id_dossier: string | null = null;
  listeSoins: any[] = [];
  selectedSoin: any = null;
  showPopup = false;

  constructor(private http: HttpClient, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.id_dossier = params['nss'];
      if (this.id_dossier) {
        this.fetchSoins(this.id_dossier);
      }
    });
  }

  ngOnInit() {
    if (this.id_dossier) {
      this.fetchSoins(this.id_dossier);
    }
  }

  fetchInfirmierDetails(infirmierId: string) {
    return this.http.get<Infirmier>(
      `http://127.0.0.1:8000/infirmiers/${infirmierId}/`
    );
  }

  fetchSoins(dossierId: string) {
    this.http
      .get<{ soins: Soin[] }>(
        `http://127.0.0.1:8000/patient/soins/${dossierId}/`
      )
      .pipe(
        switchMap((response) => {
          const infirmierRequests = response.soins.map((soin) =>
            this.fetchInfirmierDetails(soin.infirmier_id).pipe(
              map((infirmier) => ({
                ...soin,
                infirmierNom: `${infirmier.nom} ${infirmier.prenom}`,
              }))
            )
          );
          return forkJoin(infirmierRequests);
        })
      )
      .subscribe({
        next: (soinsWithInfirmiers) => {
          this.listeSoins = soinsWithInfirmiers.map((soin) => ({
            id: soin.id,
            type: soin.type,
            dateHeure: soin.date,
            infirmier: soin.infirmierNom,
            details: soin.description,
            observation: soin.observation,
          }));
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des soins:', error);
        },
      });
  }

  openDetails(event: Event, id: number): void {
    event.preventDefault();
    this.selectedSoin = this.listeSoins.find((soin) => soin.id === id);
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
