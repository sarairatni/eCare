import { Component, signal} from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, DropdownComponent],
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

  updateRole(role: number) {
    this.role.set(role);
  }
}
