import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import {
  Medecin,
  MedecinService,
} from '../../services/medecin_service/medecin.service';

@Component({
  selector: 'app-creer-dpi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [MedecinService],
  templateUrl: './creer-dpi.component.html',
  styleUrls: ['./creer-dpi.component.css'],
})
export class CreerDpiComponent implements OnInit {
  form: FormGroup;
  showError: boolean = false;
  medecins: Medecin[] = [];
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private medecinService: MedecinService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      nss: ['', Validators.required],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      date_naissance: ['', Validators.required],
      prenom: ['', Validators.required],
      num_tel: ['', Validators.required],
      med_traitant: ['', Validators.required],
      contact: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadMedecins();
  }

  loadMedecins(): void {
    this.medecinService.getMedecins().subscribe({
      next: (medecins) => {
        this.medecins = medecins;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
        this.errorMessage = 'Failed to load doctors list';
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;

      const signupData = {
        username: formData.username,
        password: formData.password,
        role: 'patient',
        email: formData.email,
        first_name: formData.prenom,
        last_name: formData.nom,
        num_securite_sociale: formData.nss,
        nom: formData.nom,
        prenom: formData.prenom,
        date_naissance: formData.date_naissance,
        adress: formData.adresse,
        telephone: formData.num_tel,
        medecin_traitant: formData.med_traitant,
        personne_contact: formData.contact,
      };

      // First create the patient
      this.authService.signupPatient(signupData).subscribe({
        next: (response) => {
          // After patient creation, create the dossier
          const dossierData = {
            date_creation: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
            num_securite_sociale: formData.nss,
          };

          this.http
            .post('http://127.0.0.1:8000/create_dossier_patient/', dossierData)
            .subscribe({
              next: (dossierResponse) => {
                console.log('Patient and dossier created successfully');
                this.showError = false;
                this.form.reset();
              },
              error: (dossierError) => {
                console.error('Error creating dossier:', dossierError);
                this.errorMessage = 'Failed to create patient dossier';
                this.showError = true;
              },
            });
        },
        error: (error) => {
          console.error('Error creating patient:', error);
          this.errorMessage =
            error.error?.message || 'Failed to create patient';
          this.showError = true;
        },
      });
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields';
    }
  }
}
