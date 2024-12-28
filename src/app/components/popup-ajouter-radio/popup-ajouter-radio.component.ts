import { NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-popup-ajouter-radio',
  imports: [NgIf, NgStyle],
  templateUrl: './popup-ajouter-radio.component.html',
  styleUrl: './popup-ajouter-radio.component.css'
})
export class PopupAjouterRadioComponent {
  typeExamen: string = "";
  resumeRapport: string = "";
  uploadedImage: string | null = null;

  modifierTypeExamen(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.typeExamen = input.value;
  }

  modifierResumeRapport(event: Event): void {
    const textArea = event.target as HTMLInputElement;
    this.resumeRapport = textArea.value;
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadedImage = URL.createObjectURL(file);
    }
  }

  removeImage(): void {
    this.uploadedImage = null;
  }

}
