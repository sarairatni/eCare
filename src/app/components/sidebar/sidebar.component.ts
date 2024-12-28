import { Component, input, EventEmitter, Output, signal } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  personne = input('Chekman Meyssem');
  menuItems = input<{ text: string; iconUrl: string; route: string }[]>([]);
  selectionne = input(0);
  isSidebarCollapsed = signal(false);

  @Output() selectionneChange = new EventEmitter<number>();
  constructor(private router: Router) {}

  selectionner(index: number) {
    this.selectionneChange.emit(index);
    const selectedItem = this.menuItems()[index];
    if (selectedItem?.route) {
      this.router.navigate([selectedItem.route]); // Navigate to the route
    }

    if (index === 1) {
      // collapse sidebar if mes patients
      this.isSidebarCollapsed.set(true);
    } else {
      this.isSidebarCollapsed.set(false);
    }
  }
}
