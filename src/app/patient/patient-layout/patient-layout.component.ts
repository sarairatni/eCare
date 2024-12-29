import { Component, signal, input, inject } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SidebarMobileComponent } from '../../components/sidebar-mobile/sidebar-mobile.component';
import { RouterOutlet,RouterModule, Router } from '@angular/router';


import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-patient-layout',
  imports: [SidebarComponent, RouterModule, SidebarMobileComponent, TopbarComponent, RouterOutlet],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.css'
})
export class PatientLayoutComponent {
 
  selectionne = signal(0);
  personne = input("Ladoul Mahdi");
  menuItems = signal([
    { text: "Dashboard", iconUrl: "/dashboard.svg", path: 'dashboard' },
    { text: "Mon profil", iconUrl: "/profil.svg", path: 'profile' },
    { text: "Historique complet", iconUrl: "/historique.svg", path: 'history' },
    { text: "Resultats medicaux", iconUrl: "/resultats.svg", path: 'results' },
    { text: "Antecedants medicaux", iconUrl: "/antecedants.svg", path: 'antecedents' }
  ]);
 
  updateSelectionne(index: number) {
    this.selectionne.set(index); 
  }
}
