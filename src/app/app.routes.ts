import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './404/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./landing/landing.component').then(
        (m) => m.LandingComponent
      );
    },
  },
  {
    path: 'accueil',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./landing/landing.component').then(
        (m) => m.LandingComponent
      );
    },
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./auth/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
  {
    path: 'patient',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./patient/patient-layout/patient-layout.component').then(
        (m) => m.PatientLayoutComponent
      );
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
          return import(
            './patient/patient-dashboard/patient-dashboard.component'
          ).then((m) => m.PatientDashboardComponent);
        },
      },
    ],
  },

  //-------  DOCTOR ROUTES  --------------------
  {
    path: 'doctor',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./doctor/doctor-layout/doctor-layout.component').then(
        (m) => m.DoctorLayoutComponent
      );
    },
    children: [
      {
        path: 'dashboard', //~~~~~~~~~~~~
        pathMatch: 'full',
        loadComponent: () => {
          return import(
            './doctor/doctor-dashboard/doctor-dashboard.component'
          ).then((m) => m.DoctorDashboardComponent);
        },
      },
    ],
  },

  {
    path: '**',
    loadComponent: () => {
      return import('./404/not-found.component').then(
        (m) => m.NotFoundComponent
      );
    },
  },
];
