import { Component, input, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { DoctorDashboardComponent } from "../doctor-dashboard/doctor-dashboard.component";
import { MesPatientsComponent } from "../mes-patients/mes-patients.component";

@Component({
  selector: 'app-doctor-layout',
  imports: [SidebarComponent, TopbarComponent, RouterOutlet, DoctorDashboardComponent, MesPatientsComponent],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.css',
})
export class DoctorLayoutComponent {
  selectionne = signal(0);
  personne = input('Ladoul Mahdi');
  menuItems = signal([
    {
      text: 'Dashboard',
      iconUrl: '/dashboard.svg',
      route: '/doctor/dashboard',
    },
    {
      text: 'Mes patients',
      iconUrl: '/historique.svg',
      route: '/doctor/mes-patients',
    },
    {
      text: 'Mon profil',
      iconUrl: '/profil.svg',
      route: '/doctor/mon-profil',
    },
  ]);

  updateSelectionne(index: number) {
    this.selectionne.set(index);
  }
}
