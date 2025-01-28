import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ajouter-analyse-bio',
  imports: [CommonModule, RouterModule],
  templateUrl: './ajouter-analyse-bio.component.html',
  styleUrl: './ajouter-analyse-bio.component.css',
})
export class AjouterAnalyseBioComponent implements OnInit {
  listeAnalysesBio : any;
  showPopup = false;
  dpi_id: string | null = null;

  user: any;
  consultations: any;

  typeExamen: string = "";
  consultation_id: number = 0;
  resultat: string = "";
  valeurMesuree: string = "";
  valeurNormale: string = "";
  valeurs: string = "";
  interpretation: string = "";


  togglePopup(event: Event): void {
    const target = event.target as HTMLElement;
    const parent = event.currentTarget as HTMLElement;
    if (target === parent) {
      this.showPopup = !this.showPopup;
    }
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService) {}

  modifierType(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.typeExamen = input.value;
  }

  modifierValeurMesuree(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valeurMesuree = input.value;
  }

  modifierValeurNormale(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valeurNormale = input.value;
  }

  modifierInterpretation(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.interpretation = input.value;
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.route.paramMap.subscribe((params) => {
      this.dpi_id = params.get('dpi_id');
    });
    // headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // get the analyses biologiques list
    this.http.get<any>(`http://127.0.0.1:8000/examens/biologiques/`, { headers })
      .subscribe({
        next: (response) => {
          this.listeAnalysesBio = response;
          console.log(this.listeAnalysesBio);
        },
        error: (error) => {
          console.error('Error fetching analyses biologiques:', error);
        }
      });
      this.http.get<any>(`http://127.0.0.1:8000/patients/${this.dpi_id}/consultations/`, { headers })
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

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
  }

  updateSelectedConsultation(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.consultation_id = parseInt(target.value);
    console.log(this.consultation_id);
  }

  splitValeurs(input: string): [string, string] {
    const parts = input.split('/');
    return [parts[0], parts[1]];
  }

  submitParameter(): void {
    // console.log('Parameter submitted');
    // logique submisssion parametre danalyse ajouté
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(this.typeExamen);
    console.log(this.getTodayDate());
    console.log(this.resultat);
    console.log(this.consultation_id);
    console.log(this.valeurs);
    console.log("upward");
    console.log(this.user.id);
    console.log(this.interpretation);
    this.http.post<any>(`http://127.0.0.1:8000/examens/biologiques/create/`, {
      "type": "biologique",
      "date": this.getTodayDate(),
      "resultat": "resultat",
      "consultation_id": this.consultation_id,
      "parametres": this.typeExamen,
      "valeurs": this.valeurMesuree + "/" + this.valeurNormale,
      "graphique_tendance": "upward",
      "laborantin_id": this.user.id,
      "interpretation": this.interpretation
    }, { headers })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Error submitting examen bio:', error);
        }
      });
      this.showPopup = !this.showPopup;
      this.updateListe(headers);
  }

  updateListe(headers: HttpHeaders) {
    // get the analyses biologiques list
    this.http.get<any>(`http://127.0.0.1:8000/examens/biologiques/`, { headers })
      .subscribe({
        next: (response) => {
          this.listeAnalysesBio = response;
          console.log(this.listeAnalysesBio);
        },
        error: (error) => {
          console.error('Error fetching analyses biologiques:', error);
        }
      });
  }
}
