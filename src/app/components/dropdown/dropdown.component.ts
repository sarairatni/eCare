import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() label: string = "";
  @Input() choisi: number = 0;
  @Input() choix: string[] = ["Patient", "Médecin", "Administratif"];

}
