import { Component, input, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laborantin-layout',
  standalone:true,
  imports: [
    RouterModule,
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    RouterOutlet,
  ],
  templateUrl: './laborantin-layout.component.html',
  styleUrl: './laborantin-layout.component.css',
})
export class LaborantinLayoutComponent {
  selectionne = signal(0);
  personne = input('Ladoul Mahdi');
  menuItems = signal([
    {
      text: 'Ajouter analyse',
      iconUrl: '/icons/albums.svg',
      path: 'ajouter-analyse',
    },
    {
      text: 'Mon profil',
      iconUrl: '/profil.svg',
      path: 'profil',
    },
  ]);
}
