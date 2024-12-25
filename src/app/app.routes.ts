import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
    path : 'patient',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./patient/patient-layout/patient-layout.component').then((m) => m.PatientLayoutComponent);
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
          return import('./patient/patient-dashboard/patient-dashboard.component').then((m) => m.PatientDashboardComponent);
        }
      }
    ]
  },
  {
    path : '**',
    loadComponent: () => {
      return import('./404/not-found.component').then((m) => m.NotFoundComponent);
    }
  }
];
