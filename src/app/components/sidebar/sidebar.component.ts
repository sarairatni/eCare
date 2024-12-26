import { Component, input, EventEmitter, Output } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  personne  = input("Chekman Meyssem");
  menuItems = input<{ text: string; iconUrl: string }[]>([]);
  selectionne = input(0);

  @Output() selectionneChange = new EventEmitter<number>();

  selectionner(index: number) {
    this.selectionneChange.emit(index);
  }
}
