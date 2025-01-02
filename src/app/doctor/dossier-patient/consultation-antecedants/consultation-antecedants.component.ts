import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultation-antecedants',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './consultation-antecedants.component.html',
  styleUrl: './consultation-antecedants.component.css',
})
export class ConsultationAntecedantsComponent implements OnInit {
  nss: string = '';
  ngOnInit(): void {
    // Get the nss parameter from the route
    this.activatedRoute.paramMap.subscribe((params) => {
      this.nss = params.get('nss') || ''; // Store the nss parameter
    });
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  antecedants = [
    {
      type: '',
      nom: '',
      date: '',
    },
  ];
  showForm = false;

  newAntecedant = {
    type: '',
    nom: '',
    date: '',
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addAntecedant() {
    if (
      this.newAntecedant.nom &&
      this.newAntecedant.type &&
      this.newAntecedant.date
    ) {
      this.antecedants.push({ ...this.newAntecedant });
      this.resetForm();
    }
  }

  resetForm() {
    this.newAntecedant = { nom: '', type: '', date: '' };
    this.showForm = false;
  }

  terminerConsultation() {
    console.log('Consultation terminée');
    this.router.navigate([`/doctor/mes-patients/${this.nss}/consultations`]);
  }
}
