import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule for routing
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // Import your routes

// Bootstrapping the Angular application with routing configuration
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes))  // Add RouterModule with routing configuration
  ]
})
  .catch((err) => console.error(err));