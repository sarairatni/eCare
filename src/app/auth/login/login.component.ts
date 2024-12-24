import { Component } from '@angular/core';
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
  
}
