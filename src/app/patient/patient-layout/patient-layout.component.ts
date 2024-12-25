import { Component, signal, input } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-patient-layout',
  imports: [SidebarComponent],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.css'
})
export class PatientLayoutComponent {
  selectionne = signal(0);
  personne = input("Ladoul Mahdi");
  menuItems = signal([{
    text: "Dashboard",
    iconUrl: "/dashboard.svg"
  }, {
    text: "Mon profil",
    iconUrl: "/profil.svg"
  }, {
    text: "Historique complet",
    iconUrl: "/historique.svg"
  }, {
    text: "Resultats medicaux",
    iconUrl: "/resultats.svg"
  }, {
    text: "Antecedants medicaux",
    iconUrl: "/antecedants.svg"
  }]);

  updateSelectionne(index: number) {
    this.selectionne.set(index); 
  }
}
