import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nouvelle-consultation',
  templateUrl: './nouvelle-consultation.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./nouvelle-consultation.component.css'],
})
export class NouvelleConsultationComponent implements OnInit {
  observations: string = '';
  diagnostic: string = '';
  isBilanChecked: boolean = false;
  nss: string | null = null;
  constructor(
    private router: Router,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.nss = this.activatedRoute.snapshot.paramMap.get('nss');
    if (!this.nss) {
      console.error('NSS non fourni dans l’URL');
      this.router.navigate(['/doctor/mes-patients']);
    }
  }

  toggleBilan(event: Event): void {
    this.isBilanChecked = (event.target as HTMLInputElement).checked;
    if (this.isBilanChecked) {
      this.diagnostic = 'Pas établi';
    }
  }

  resetForm(): void {
    this.observations = '';
    this.diagnostic = 'Pas établi';
    this.isBilanChecked = false;
  }

  submitForm(): void {
    if (!this.nss) return;

    // Construire la route cible en fonction de isBilanChecked
    const baseRoute = `/doctor/mes-patients/${this.nss}/nouvelle-consultation`;
    const targetRoute = this.isBilanChecked
      ? `${baseRoute}/bilan`
      : `${baseRoute}/ordonnance`;

    this.router.navigate([targetRoute]);

    console.log(
      `Form submitted: observations=${this.observations}, diagnostic=${this.diagnostic}, isBilanChecked=${this.isBilanChecked}, targetRoute=${targetRoute}`
    );
  }
}
