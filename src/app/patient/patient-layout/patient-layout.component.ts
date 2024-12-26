import { Component, signal, input } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SidebarMobileComponent } from '../../components/sidebar-mobile/sidebar-mobile.component';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-patient-layout',
  imports: [SidebarComponent, SidebarMobileComponent, TopbarComponent, RouterOutlet],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.css'
})
export class PatientLayoutComponent {
  selectionne = signal(0);
  personne = input("Ladoul Mahdi");
  menuItems = signal([{
    text: "Dashboard",
    route: "/patient",
    iconUrl: "/dashboard.svg"
  }, {
    text: "Mon profil",
    route: "/patient/profil",
    iconUrl: "/profil.svg"
  }, {
    text: "Historique complet",
    route: "/patient/historique",
    iconUrl: "/historique.svg"
  }, {
    text: "Resultats medicaux",
    route: "/patient/resultats",
    iconUrl: "/resultats.svg"
  }, {
    text: "Antecedants medicaux",
    route: "/patient/antecedants",
    iconUrl: "/antecedants.svg"
  }]);

  updateSelectionne(index: number) {
    this.selectionne.set(index); 
  }
}
