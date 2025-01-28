import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-section-one',
  imports: [MatIconModule,RouterModule],
  templateUrl: './section-one.component.html',
  styleUrl: './section-one.component.css',
})
export class SectionOneComponent {
  constructor(public router: Router) {}
}
