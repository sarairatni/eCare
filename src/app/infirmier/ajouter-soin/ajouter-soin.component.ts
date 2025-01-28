import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PopupAjouterSoinComponent } from '../../components/popup-ajouter-soin/popup-ajouter-soin.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

interface Dpi {
  id: number;
  nom: string;
  nss: string;
  age: number;
  numero_telephone: string;
}

@Component({
  selector: 'app-ajouter-soin',
  imports: [CommonModule, RouterModule, PopupAjouterSoinComponent, NgIf, HttpClientModule],
  templateUrl: './ajouter-soin.component.html',
  styleUrls: ['./ajouter-soin.component.css']
})
export class AjouterSoinComponent implements OnInit {
  recherche: string = "";
  popupVisible: boolean = false;
  listePatients: any;
  selectedNss: string = '';
  listeDPIs: Dpi[] = [];
  filteredListeDPIs: Dpi[] = [];
  @Input() nss: string = '';
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}
 
  updateRecherche(e: Event): void {
    this.recherche = (e.target as HTMLInputElement).value;
    this.filteredListeDPIs = this.listeDPIs.filter((dpi: Dpi) => {
      return dpi.nss.toLowerCase().includes(this.recherche.toLowerCase()) || this.recherche === "";
    });
  }

  private calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  remplirListe(fetched: any[], displayable: Dpi[]): void {
    displayable.length = 0;
    fetched.forEach(element => {
      displayable.push({
        id: element.id,
        nom: `${element.nom} ${element.prenom}`,
        nss: element.num_securite_sociale,
        age: this.calculateAge(element.date_naissance),
        numero_telephone: element.telephone
      });
    });
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.get<any[]>('http://127.0.0.1:8000/patients/', { headers }).subscribe({
      next: (response) => {
        if (response && Array.isArray(response)) {
          this.listePatients = response;
          this.remplirListe(this.listePatients, this.listeDPIs);
          this.remplirListe(this.listePatients, this.filteredListeDPIs);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching patient list:', error);
      }
    });
  }

  selectDPI(nss: string): void {
    console.log("celui ", nss);
    this.selectedNss = nss;
  }

  afficherPopup(): void {
    this.popupVisible = true;
  }

  masquerPopup(): void {
    this.popupVisible = false;
  }
}
