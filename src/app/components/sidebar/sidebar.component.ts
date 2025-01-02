import { Component, Input,input, EventEmitter, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router'; 
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  personne  = input("Chekman Meyssem");
  menuItems = input<{ text: string; iconUrl: string; path: string }[]>([]);
  selectionne = input(0);
  constructor(private router: Router) {}

  @Output() selectionneChange = new EventEmitter<number>();
  isActiveRoute(path: string): boolean {
    console.log(this.router.url);
    console.log(path);
    return this.router.url === path;
  }
  selectionner(index: number) {
    this.selectionneChange.emit(index);
    
    
  }
  
}
