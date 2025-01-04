import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-nouvelle-consultation-patient',
  templateUrl: './nouvelle-consultation.component.html',
  styleUrls: ['./nouvelle-consultation.component.css'],
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
})
export class NouvelleConsultationComponent implements OnInit {
  id_dossier: string | null = null;
  observations: string = '';
  diagnostic: string = '';
  isBilanChecked: boolean = false;
  errorMessage: string | null = null;
  user: any;

  displayDate: string = new Date().toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id_dossier =
      this.activatedRoute.parent?.snapshot.params['nss'] ||
      this.activatedRoute.snapshot.params['nss'];
    this.user = this.authService.getUser();
  }

  private getMySQLDateTime(): string {
    const [day, month, year] = this.displayDate.split(' ')[0].split('/');
    const time = this.displayDate.split(' ')[1];
    return `${year}-${month}-${day} ${time}`;
  }

  toggleBilan(event: any) {
    this.isBilanChecked = event.target.checked;
  }

  resetForm() {
    this.observations = '';
    this.diagnostic = '';
    this.isBilanChecked = false;
    this.errorMessage = null;
  }

  submitForm() {
    if (!this.observations || !this.diagnostic) {
      this.errorMessage = 'Les champs observation et diagnostic sont requis.';
      return;
    }

    if (!this.user?.id) {
      this.errorMessage = 'Utilisateur non trouvé.';
      return;
    }

    const consultationData = {
      motif: this.observations,
      date: this.getMySQLDateTime(),
      resume: this.diagnostic,
      userId: this.user.id,
    };

    this.http
      .post(
        `http://127.0.0.1:8000/patients/${this.id_dossier}/consultations/create/`,
        consultationData
      )
      .subscribe({
        next: (response: any) => {
          console.log('Consultation créée avec succès:', response);
          this.resetForm();
          this.errorMessage = null;

          const consultationId = response?.id;
          if (consultationId) {
            console.log('Consultation ID:', consultationId);
            const url = `/doctor/mes-patients/${this.id_dossier}/nouvelle-consultation/ordonnance/${consultationId}`;
            this.router.navigate([url]);
          } else {
            console.error('Consultation ID introuvable dans la réponse.');
            this.errorMessage = 'Erreur: ID de consultation introuvable.';
          }
        },
        error: (error) => {
          console.error(
            'Erreur lors de la création de la consultation:',
            error
          );
          this.errorMessage =
            error.error?.message ||
            'Erreur lors de la création de la consultation.';
        },
      });
  }
}
