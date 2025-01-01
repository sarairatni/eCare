import { Component, input, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-layout',
  imports: [
    RouterModule,
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    RouterOutlet,
    
  ],
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
      path: 'dashboard',
    },
    {
      text: 'Mes patients',
      iconUrl: '/icons/albums.svg',
      path: 'mes-patients',
    },
    {
      text: 'Mon profil',
      iconUrl: '/profil.svg',
      path: 'mon-profil',
    },
  ]);

  updateSelectionne(index: number) {
    this.selectionne.set(index);
  }
}
