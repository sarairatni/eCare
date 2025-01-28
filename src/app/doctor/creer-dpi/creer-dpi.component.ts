import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
  templateUrl: './creer-dpi.component.html',
  styleUrls: ['./creer-dpi.component.css'],
})
export class CreerDpiComponent implements OnInit {
  form: FormGroup;
  showError: boolean = false;
  medecins: Medecin[] = [];
  errorMessage: string = '';
 
  constructor(
    private medecinService: MedecinService,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder
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
