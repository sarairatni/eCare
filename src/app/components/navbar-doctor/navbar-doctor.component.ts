import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-doctor',
  templateUrl: './navbar-doctor.component.html',
  imports: [RouterModule, CommonModule],
  styleUrls: ['./navbar-doctor.component.css'],
})
export class NavbarDoctorComponent {
  navItems = [
    { label: 'Consultations', route: 'consultations' },
    { label: 'Ordonnances', route: 'ordonnances' },
    { label: 'Résultats médicaux', route: 'resultats-med' },
    { label: 'Antécédents médicaux', route: 'antecedents-med' },
    { label: 'Soins', route: 'soins' },
  ];

  // Currently selected route
  selectedRoute: string = '';

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.selectedRoute = url[0].path; 
    });
  }

  getRoute(route: string) {
    const nss = this.route.snapshot.paramMap.get('nss'); // Get NSS from URL
    return `/doctor/dpi/${nss}/${route}/${nss}`;
  }
}
