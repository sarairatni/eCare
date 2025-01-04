import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Injectable({
  providedIn: 'root',
})
export class PatientGuard implements CanActivate {
  constructor(private router: Router, private patientService: PatientService) {}

  canActivate(): boolean {
    const patientDetail = this.patientService.getPatientDetail();
    if (!patientDetail) {
      this.router.navigate(['/patient/dashboard']); // Redirect to dashboard if patientDetail is missing
      return false;
    }
    return true;
  }
}
