import { Component, input, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radiologue-layout',
  imports: [
    RouterModule,
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    RouterOutlet,
  ],
  templateUrl: './radiologue-layout.component.html',
  styleUrl: './radiologue-layout.component.css'
})
export class RadiologueLayoutComponent {
  selectionne = signal(0);
  personne = input('Ladoul Mahdi');
  menuItems = signal([
    {
      text: 'Ajouter un examen',
      iconUrl: '/icons/albums.svg',
      path: 'ajouter-radio',
    },
    {
      text: 'Mon profil',
      iconUrl: '/profil.svg',
      path: 'profil',
    },
  ]);
}
