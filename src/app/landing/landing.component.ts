import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SectionOneComponent } from "./section-one/section-one.component";
import { SectionTwoComponent } from './section-two/section-two.component';

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, SectionOneComponent,SectionTwoComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
