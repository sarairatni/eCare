import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


interface Dpi {
  id: number;
  nom: string;
  nss: string;
  age: number;
  numero_telephone: string;  // Adjust the type if needed
}

@Component({
  selector: 'app-ajouter-analyse',
  imports: [CommonModule, RouterModule],
  templateUrl: './ajouter-analyse.component.html',
  styleUrl: './ajouter-analyse.component.css',
})
export class AjouterAnalyseComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {};
  recherche: string = "";
  listePatients : any;
  selectedNss: string = '';
  selectedId: number = 0;
  listeDPIs : Dpi[] = [];
  filteredListeDPIs : Dpi[] = [];

  updateRecherche(e : Event): void {
    this.recherche = (e.target as HTMLInputElement).value;
    // Filtrer la liste des patients en fonction de la recherche
    const filtered: Dpi[] = this.listeDPIs.filter((dpi: Dpi) => {
      const nss: string = dpi.nss.toLowerCase();
      return nss.includes(this.recherche.toLowerCase()) || 
             dpi.nss.includes(this.recherche) || this.recherche == "";
    });
  
    // Mettre à jour la liste des DPI avec les patients filtrés
    this.filteredListeDPIs = filtered;
  }

  remplirListe(fetched: any[], displayable: Dpi[]): void {
    displayable.length = 0;
    fetched.forEach(element => {
      displayable.push({
        id: element.id,
        nom: element.nom + " " + element.prenom,
        nss: element.num_securite_sociale,
        age: element.date_naissance,
        numero_telephone: element.telephone,
      })
    });
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    // fetch the patients list
    this.http.get<any[]>('http://127.0.0.1:8000/patients/', { headers })
      .subscribe({
        next: (response) => {
          this.listePatients = response;
          this.remplirListe(this.listePatients, this.listeDPIs);
          this.remplirListe(this.listePatients, this.filteredListeDPIs);
        },
        error: (error) => {
          console.error('Error fetching patient list:', error);
        }
      });
  }

  selectDPI(nss: string, id: number): void {
    this.selectedNss = nss; // Stocker l'ID sélectionné
    this.selectedId = id;
  }

  navigateToAddAnalysis(): void {
    if (this.selectedId !== null) {
      // Redirige vers la route avec le DPI ID
      this.router.navigate(['/laborantin/ajouter-analyse', this.selectedId]);
    }
  }
}
