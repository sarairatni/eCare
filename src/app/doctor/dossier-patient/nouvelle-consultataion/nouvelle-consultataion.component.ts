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
  displayDate: string = new Date().toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  diagnostic: string = '';
  isBilanChecked: boolean = false;
  errorMessage: string | null = null;
  user: any;

  // Convert to MySQL format before sending
  private getMySQLDateTime(): string {
    const parts = this.displayDate.split(' ')[0].split('/');
    const time = this.displayDate.split(' ')[1];
    return `${parts[2]}-${parts[1]}-${parts[0]} ${time}`;
  }

  constructor(
    private http: HttpClient,
    private router: Router,  // Inject Router
    public activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.activatedRoute.parent?.params.subscribe((params) => {
      console.log('Route params:', params);
      this.id_dossier = params['nss'];
      console.log('ID dossier:', this.id_dossier);
    });
  }

  ngOnInit(): void {
    const parentParams = this.activatedRoute.parent?.snapshot.params['nss'];
    const currentParams = this.activatedRoute.snapshot.params['nss'];

    this.id_dossier = parentParams || currentParams;

    console.log('Retrieved ID dossier:', this.id_dossier);

    this.user = this.authService.getUser();
    console.log('Authenticated user:', this.user);
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
      this.errorMessage = 'Les champs observation et diagnostic sont requis';
      return;
    }

    if (!this.user?.id) {
      this.errorMessage = 'Utilisateur non trouvé';
      return;
    }

    const consultationData = {
      motif: this.observations,
      date: this.getMySQLDateTime(),
      resume: this.diagnostic,
      userId: this.user.id,
    };

    // Log the data being sent
    console.log('Sending data:', consultationData);

    this.http
      .post(
        `http://127.0.0.1:8000/patients/${this.id_dossier}/consultations/create/`,
        consultationData
      )
      .subscribe({
        next: (response: any) => {
          console.log('Consultation created successfully:', response);
          this.resetForm();
          this.errorMessage = null;

          // Navigate to the ordonnance page after success
          const url = `/doctor/mes-patients/${this.id_dossier}/nouvelle-consultation/ordonnance`;
          this.router.navigate([url]);  // Navigate to the new route
        },
        error: (error) => {
          console.error('Error details:', error);
          this.errorMessage =
            error.error?.message || 'Erreur lors de la création de la consultation';
        },
      });
  }
}
