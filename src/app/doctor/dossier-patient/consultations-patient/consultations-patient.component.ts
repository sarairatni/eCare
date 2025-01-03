import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-consultations-patient',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './consultations-patient.component.html',
  styleUrls: ['./consultations-patient.component.css'],
})
export class ConsultationsPatientComponent {
  id_dossier: string | null = null;
  listeConsultations: any[] = [];

  constructor(private http: HttpClient, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent?.params.subscribe((params) => {
      console.log('Parent route params:', params);
      this.id_dossier = params['nss'];
      console.log('ID dossier:', this.id_dossier);
      if (this.id_dossier) {
        this.getConsultations(this.id_dossier);
      }
    });
  }

  getConsultations(dossierId: string) {
    this.http
      .get(`http://127.0.0.1:8000/patients/${dossierId}/consultations/`)
      .subscribe(
        (data: any) => {
          // Pour chaque consultation, obtenir le médecin et ajouter les détails dans la liste
          this.listeConsultations = [];
          data.consultations.forEach((consultation: any) => {
            this.http
              .get(`http://127.0.0.1:8000/medecins/${consultation.medecin_id}/`)
              .subscribe(
                (medecinData: any) => {
                  const consultationWithMedecin = {
                    date: consultation.date,
                    medecin: `Dr. ${medecinData.nom} ${medecinData.prenom}`,
                    motif: consultation.motif,
                    diagnostic: consultation.resume,
                  };
                  this.listeConsultations.push(consultationWithMedecin);
                },
                (error) => {
                  console.error(
                    'Erreur lors de la récupération du médecin:',
                    error
                  );
                }
              );
          });
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des consultations:',
            error
          );
        }
      );
  }
}
