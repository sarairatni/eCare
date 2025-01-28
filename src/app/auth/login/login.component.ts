import { Component, signal, Injectable, inject } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, DropdownComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({ providedIn: 'root' })
export class LoginComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);  // Inject the AuthService
  role = signal(0);
  identifiant = signal('');
  mdp = signal('');
  
  updateIdentifiant(c: string) {
    this.identifiant.set(c);
    console.log(this.identifiant());
  }

  updateMdp(c: string) {
    this.mdp.set(c);
  }
  
  login(): void {
    const loginData = {
      nss: this.identifiant(),  // Get the username from the signal
      password: this.mdp(),     // Get the password from the signal
      role: this.getRole()       // Get the role from the signal
    };

    // Use AuthService to log in
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Login success:', response);

        if (response.status === 'success') {
          this.authService.setToken(response.access_token);
          this.authService.setRole(response.role);
          this.authService.setUser(response.user);

          // Navigate based on the role (assuming getRoute() is implemented correctly)
          this.router.navigate([this.getRoute()]);
        } else {
          alert(response.message || 'Login failed');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('An error occurred while trying to login');
      }
    });
  }

  getRoute() {
    const currentRole = this.role();
    console.log(currentRole) // Access the value of the signal
    if (currentRole === 4) {
      return '/radiologue/ajouter-radio'; // Navigate to radiologue dashboard
    } else if (currentRole === 3) {
      return '/infirmier/ajouter-soin'; // Navigate to laborantin dashboard
    } else if (currentRole === 2) {
      return '/laborantin/ajouter-analyse'; // Navigate to laborantin dashboard
    } else if (currentRole === 1) {
      return '/doctor/dashboard'; // Navigate to doctor dashboard
    } else if (currentRole === 0) {
      return '/patient/dashboard'; // Navigate to patient dashboard
    } else {
      return '/'; // Default route if role is invalid
    }
  }

  getRole() {
    const currentRole = this.role();
    console.log(currentRole); // Access the value of the signal
    if (currentRole === 4) {
      return 'radiologue';
    } else if (currentRole === 3) {
      return 'infirmier';
    } else if (currentRole === 2) {
      return 'laborantin'; // Navigate to laborantin dashboard
    } else if (currentRole === 1) {
      return 'doctor';
    } else if (currentRole === 0) {
      return 'patient'; // Navigate to patient dashboard
    } else {
      return '/'; // Default route if role is invalid
    }
  }

  updateRole(role: number) {
    this.role.set(role);
  }

  getType() {
    const currentRole = this.role();
    if (currentRole === 4) {
      return 'text'; // radiologue
    } else if (currentRole === 3) {
      return 'text'; // infirmier
    } else if (currentRole === 2) {
      return 'text'; // Navigate to laborantin dashboard
    } else if (currentRole === 1) {
      return 'text'; // medecin
    } else if (currentRole === 0) {
      return 'number'; // Navigate to patient dashboard
    } else {
      return '/'; // Default route if role is invalid
    }
  }
}
