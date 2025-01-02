import { Component, input, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infirmier-layout',
  imports: [
    RouterModule,
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    RouterOutlet,
  ],
  templateUrl: './infirmier-layout.component.html',
  styleUrl: './infirmier-layout.component.css'
})
export class InfirmierLayoutComponent {
  selectionne = signal(0);
  personne = input('Ladoul Mahdi');
  menuItems = signal([
    {
      text: 'Ajouter un soin',
      iconUrl: '/icons/albums.svg',
      path: 'ajouter-soin',
    },
    {
      text: 'Mon profil',
      iconUrl: '/profil.svg',
      path: 'profil',
    },
  ]);
}
