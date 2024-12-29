import { Component, Input,input, EventEmitter, Output } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgClass,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  personne  = input("Chekman Meyssem");
  menuItems = input<{ text: string; iconUrl: string; path: string }[]>([]);
  selectionne = input(0);
 

  @Output() selectionneChange = new EventEmitter<number>();

  selectionner(index: number) {
    this.selectionneChange.emit(index);
    
    
  }
  
}
