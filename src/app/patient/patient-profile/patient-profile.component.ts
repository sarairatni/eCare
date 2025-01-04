import { Component, OnInit, inject } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-profile',
  imports: [],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css'
})
export class PatientProfileComponent implements OnInit {
  patientService = inject(PatientService);
   ngOnInit(): void {
     
  }

}
