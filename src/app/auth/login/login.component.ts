import { Component, signal} from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, DropdownComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  role = signal(0);
  identifiant = signal("");
  mdp = signal("");

  updateIdentifiant(c: string) {
    this.identifiant.set(c);
  }

  updateMdp(c: string) {
    this.mdp.set(c);
  }
  getRoute() {
    const currentRole = this.role();
    console.log(currentRole) // Access the value of the signal
    if (currentRole === 2) {
      return '/laborantin/ajouter-analyse'; // Navigate to patient dashboard
    } else if (currentRole === 1) {
      return '/doctor/dashboard'; // Navigate to doctor dashboard
    } else if (currentRole === 0) {
      return '/patient/dashboard'; // Navigate to admin dashboard
    } else {
      return '/'; // Default route if role is invalid
    }
  }
  updateRole(role: number) {
    this.role.set(role);
  }
}
