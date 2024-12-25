import { Component, input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  label  = input("");
  placeholder = input("");
  type = input("text");

  @Output() contenuChange = new EventEmitter<string>();

  taper(e: Event) {
    const contenu = (e.target as HTMLInputElement).value;
    this.contenuChange.emit(contenu);
  }
}
