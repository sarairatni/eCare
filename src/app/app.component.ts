import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'eCare';
}
