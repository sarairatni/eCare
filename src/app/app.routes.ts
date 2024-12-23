import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./landing/landing.component').then((m) => m.LandingComponent);
    },
  },
  { path: 'user', component: LandingComponent },
  { path: '**', component: NotFoundComponent },
];
