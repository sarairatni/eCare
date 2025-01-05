import { Component, signal, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-laborantin-layout',
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
export class LaborantinLayoutComponent implements OnInit {
  selectionne = signal(0);
  personne = 'Ladoul Mahdi';

  constructor(private http: HttpClient, private authService: AuthService){}

  ngOnInit(): void {
    let user : any;
    user = this.authService.getUser();
    this.personne =  user.last_name + " " + user.first_name;
    console.log(this.personne);
  }
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
