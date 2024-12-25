import { NgFor, NgClass } from '@angular/common';
import { Component, Output, input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.css'
})
export class SidebarMobileComponent {
  menuItems = input<{ text: string; iconUrl: string }[]>([]);
  selectionne = input(0);

  @Output() selectionneChange = new EventEmitter<number>();

  selectionner(index: number) {
    this.selectionneChange.emit(index);
  }
}
