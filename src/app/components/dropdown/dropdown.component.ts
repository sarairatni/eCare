import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() choisiChange = new EventEmitter<number>();

  choisir(choix: string) {
    if (choix == "Patient") {
      this.choisiChange.emit(0);
    }
    else if (choix == "Médecin") this.choisiChange.emit(1);
    else if (choix == "Administratif") this.choisiChange.emit(2);
  }
}
