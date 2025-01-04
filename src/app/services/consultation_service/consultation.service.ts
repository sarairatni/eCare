import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private consultation: any = null;

  setConsultation(consultation: any): void {
    this.consultation = consultation;
    console.log('ConsultatioOoOOoOooooOOnNn:', consultation);
  }

  getConsultation(): any {
    return this.consultation;
  }

  clearConsultation(): void {
    this.consultation = null;
  }
}
