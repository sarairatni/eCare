import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  nom = input("");
  role = input(0);
  contenuRecherche = signal("");

  nomRole(role: number) {
    switch (this.role()) {
      case 0:
        return 'Patient';
      case 1:
        return 'Médecin';
      case 2:
        return 'Laborantin';
      case 3:
        return 'Infirmier';
      default:
        return 'Inconnu';
    }
  }
}
