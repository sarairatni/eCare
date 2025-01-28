import { Component, OnInit } from '@angular/core';
import { NavbarDoctorComponent } from '../../../components/navbar-doctor/navbar-doctor.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Patient, PatientService } from '../../../services/patient_service/patient.service';


@Component({
  selector: 'app-dpi-layout',
  standalone: true,
  imports: [NavbarDoctorComponent, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './dpi-layout.component.html',
  styleUrls: ['./dpi-layout.component.css'],
})
export class DpiLayoutComponent implements OnInit {
  user: Patient | null = null;
  id_dossier: string | null = null;
  error: string | null = null;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the ID from the route params
    this.route.params.subscribe(params => {
      this.id_dossier = params['nss'];
      if (this.id_dossier) {
        this.loadPatientData();
      }
    });
  }

  private loadPatientData(): void {
    if (!this.id_dossier) return;

    this.patientService.getPatientByDossierId(this.id_dossier)
      .subscribe({
        next: (patient) => {
          console.log('Received patient data:', patient);
          this.user = patient;
        },
        error: (error) => {
          console.error('Error loading patient:', error);
          this.error = 'Failed to load patient data';
        }
      });
  }
}