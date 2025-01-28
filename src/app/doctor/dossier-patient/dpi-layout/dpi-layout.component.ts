import { Component } from '@angular/core';
import { NavbarDoctorComponent } from "../../../components/navbar-doctor/navbar-doctor.component";
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dpi-layout',
  imports: [NavbarDoctorComponent, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './dpi-layout.component.html',
  styleUrl: './dpi-layout.component.css'
})
export class DpiLayoutComponent {

}
