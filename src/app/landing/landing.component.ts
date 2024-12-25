import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SectionOneComponent } from "./section-one/section-one.component";
import { SectionTwoComponent } from './section-two/section-two.component';
import { SectionThreeComponent } from './section-three/section-three.component';
import { SectionFourComponent } from './section-four/section-four.component';
import { SectionFiveComponent } from "./section-five/section-five.component";

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, SectionOneComponent, SectionTwoComponent, SectionThreeComponent, SectionFourComponent, SectionFiveComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
