import { NgIf, NgStyle, NgFor } from '@angular/common';
import { Component, Input,  Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-popup-ajouter-radio',
  imports: [NgIf, NgStyle, NgFor],
  templateUrl: './popup-ajouter-radio.component.html',
  styleUrl: './popup-ajouter-radio.component.css'
})
export class PopupAjouterRadioComponent implements OnInit {

  user: any;
  dossierPatient: any;
  consultations: any;
  consultation_id: number = 0;

  @Input() nss: string = '';
  @Input() id: number = 0;

  typeExamen: string = "";
  resumeRapport: string = "";
  uploadedImage: string | null = null;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    // get the dossier patiend (for the id)
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
    this.http.get<any>(`http://127.0.0.1:8000/search_dossier_patient/${this.nss}/`, { headers })
      .subscribe({
        next: (response) => {
          this.dossierPatient = response;
        },
        error: (error) => {
          console.error('Error fetching dossier patient:', error);
        }
      });
    this.http.get<any>(`http://127.0.0.1:8000/patients/${this.id}/consultations/`, { headers })
    .subscribe({
      next: (response) => {
        this.consultations = response.consultations;
        console.log(this.consultations);
      },
      error: (error) => {
        console.error('Error fetching consultations:', error);
      }
    });
  }

  modifierTypeExamen(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.typeExamen = input.value;
  }

  modifierResumeRapport(event: Event): void {
    const textArea = event.target as HTMLInputElement;
    this.resumeRapport = textArea.value;
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadedImage = URL.createObjectURL(file);
    }
  }

  removeImage(): void {
    this.uploadedImage = null;
  }

  @Output() clickClose = new EventEmitter<void>();

  masquer() {
    this.clickClose.emit(); 
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = today.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  updateSelectedConsultation(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.consultation_id = parseInt(target.value);
    console.log(this.consultation_id);
  }

  submitExamenRadiologique() : void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post<any>(`http://127.0.0.1:8000/examens/radiologiques/create/`, {
      "type": this.typeExamen,
      "date": this.getTodayDate(),
      "resultat": "resultat",
      "consultation_id": this.consultation_id,
      "type_image": "radio",
      "fichier_image": this.uploadedImage,
      "compte_rendu": this.resumeRapport,
      "radiologue_id": this.user.id
    }, { headers })
      .subscribe({
        next: (response) => {
          console.log("submitted successfully");
        },
        error: (error) => {
          console.error('Error submitting examen radio:', error);
        }
      });
      this.masquer();
  }

}
