import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./landing/landing.component').then((m) => m.LandingComponent);
    },
  },
  { path: 'acceuil', component: LandingComponent },
  { path: '**', component: NotFoundComponent },
  {
    path: 'user',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./user/user.component').then((m) => m.UserComponent);
    },
  },
  {
    path: 'user',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./user/user.component').then((m) => m.UserComponent);
    },
  },
  {
    path : 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./auth/login/login.component').then((m) => m.LoginComponent);
    }
  },
  {
    path : '**',
    loadComponent: () => {
      return import('./404/not-found.component').then((m) => m.NotFoundComponent);
    }
  }
];

