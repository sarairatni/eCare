import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class ConsultationsPatientComponent implements OnInit {
  user: any = null;
  listeConsultations: any[] = [];
  id_dossier: string | null = null;

  constructor(private http: HttpClient, public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const nss = paramMap.get('nss'); // Safely retrieve the 'nss' parameter
      console.log('Parent route param nss:', nss);
      this.id_dossier = nss;
      if (this.id_dossier) {
        this.getConsultations(this.id_dossier);
      }
    });
    this.fetchExamsForConsultations();
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
                  this.getBiologique(consultation.id);
                  this.getRadiologique(consultation.id);
                  console.log('Medecin:', consultation.medecin_id, medecinData);
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

  fetchExamsForConsultations(): void {
    for (const consultation of this.listeConsultations) {
      console.log(consultation.id);
      this.getBiologique(consultation.id);
      this.getRadiologique(consultation.id);
    }
  }

  biologiques :any[] = [];
  radiologiques :any[] = [];
  getBiologique(consultationId: number): void {
    // Make a request to get ordonnances for the given consultation ID
    this.http.post<any>(`http://localhost:8000/getbiologique/`, { consultation_id: consultationId })
      .subscribe(
        biologiques => {
          this.biologiques.push(...biologiques.data);
          console.log(this.biologiques)
          console.log("biooo"); // Merge ordonnances results into the ordonnances array
        },
        error => {
          console.error(`Error fetching ordonnances for consultation ${consultationId}:`, error);
        }
      );
  }

  getRadiologique(consultationId: number): void {
    // Make a request to get ordonnances for the given consultation ID
    this.http.post<any>(`http://localhost:8000/getradiologique/`, { consultation_id: consultationId })
      .subscribe(
        radiologiques => {
          this.radiologiques.push(...radiologiques.data);
          console.log(this.radiologiques)
          console.log("radiooo"); // Merge ordonnances results into the ordonnances array
        },
        error => {
          console.error(`Error fetching ordonnances for consultation ${consultationId}:`, error);
        }
      );
  }

}
