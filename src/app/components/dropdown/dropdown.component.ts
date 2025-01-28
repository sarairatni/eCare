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
  @Input() choix: string[] = ["Patient", "Médecin", "Laborantin"];

  @Output() choisiChange = new EventEmitter<number>();

  choisir(choix: string) {
    if (choix == "Patient") {
      this.choisiChange.emit(0);
    }
    else if (choix == "Médecin") this.choisiChange.emit(1);
    else if (choix == "Laborantin") this.choisiChange.emit(2);
    else if (choix == "Infirmier") this.choisiChange.emit(3);
    else if (choix == "Radiologue") this.choisiChange.emit(4);
  
  }
}
