import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './404/not-found.component';  

export const routes: Routes = [
   {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./landing/landing.component').then((m) => m.LandingComponent);
    }
  },
  {
    path : 'accueil',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./landing/landing.component').then((m) => m.LandingComponent);
    }
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
    children: [
      {
        path: 'dashboard',
        pathMatch: 'full',
        loadComponent: () => {
          return import('./patient/patient-dashboard/patient-dashboard.component').then((m) => m.PatientDashboardComponent);
        }
      },
      // ghir li ykoun route ta3ou '' li yemchi, je sais pas 3lah
      {
        path: 'profil',
        loadComponent: () => {
          return import('./patient/profil/profil.component').then((m) => m.ProfilComponent);
        }
      },
      {
        path: 'historique',
        loadComponent: () => {
          return import('./patient/historique/historique.component').then((m) => m.HistoriqueComponent);
        }
      },
      {
        path: '',
        loadComponent: () => {
          return import('./patient/historique-ordonnance/historique-ordonnance.component').then((m) => m.HistoriqueOrdonnanceComponent);
        }
      },
    ],
    loadComponent: () => {
      return import('./patient/patient-layout/patient-layout.component').then((m) => m.PatientLayoutComponent);
    },
  },
  {
    path : '**',
    loadComponent: () => {
      return import('./404/not-found.component').then((m) => m.NotFoundComponent);
    }
  }
];

