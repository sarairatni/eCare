import { Component, Input,  Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-popup-ajouter-soin',
  imports: [],
  templateUrl: './popup-ajouter-soin.component.html',
  styleUrl: './popup-ajouter-soin.component.css'
})
export class PopupAjouterSoinComponent implements OnInit {

  user: any;
  dossierPatient: any;

  @Input() nss: string = '';
  @Input() id: string = '';
  typeSoin: string = "";
  description: string = "";
  observation: string = "";

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
  }

  modifierTypeSoin(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.typeSoin = input.value;
  }

  modifierDescription(event: Event): void {
    const textArea = event.target as HTMLInputElement;
    this.description = textArea.value;
  }

  modifierObservation(event: Event): void {
    const textArea = event.target as HTMLInputElement;
    this.observation = textArea.value;
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

  submitSoin() : void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post<any>(`http://127.0.0.1:8000/soins/create/`, {
      "type": this.typeSoin,
      "date": this.getTodayDate(),
      "description": this.description,
      "observation": this.observation,
      "nss": this.nss,
      "infirmier_id": this.user.id,
      "dossier_id": this.dossierPatient.id
    }, { headers })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Error fetching dossier patient:', error);
        }
      });
      this.masquer();
  }

}
