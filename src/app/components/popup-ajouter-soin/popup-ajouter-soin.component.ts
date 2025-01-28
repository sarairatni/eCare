import { Component } from '@angular/core';

@Component({
  selector: 'app-popup-ajouter-soin',
  imports: [],
  templateUrl: './popup-ajouter-soin.component.html',
  styleUrl: './popup-ajouter-soin.component.css'
})
export class PopupAjouterSoinComponent {

  typeSoin: string = "";
  description: string = "";
  observation: string = "";
  
  modifierTypeSoin(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.typeSoin = input.value;
  }

  modifierDescription(event: Event): void {
    const textArea = event.target as HTMLInputElement;
    this.description = textArea.value;
  }

  modifierObservation(event: Event): void {
    const textArea = event.target as HTMLInputElement;
    this.observation = textArea.value;
  }

}
