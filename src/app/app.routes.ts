
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './404/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
    
    loadComponent: () => {
      return import('./patient/patient-layout/patient-layout.component').then((m) => m.PatientLayoutComponent);
    },
    children: [
      { path: 'dashboard', loadComponent: () => import('./patient/patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent) },
      { path: 'profile', loadComponent: () => import('./patient/patient-profile/patient-profile.component').then(m => m.PatientProfileComponent) },
      { path: 'history', loadComponent: () => import('./patient/patient-history/patient-history.component').then(m => m.PatientHistoryComponent) },
      { path: 'results', loadComponent: () => import('./patient/patient-results/patient-results.component').then(m => m.PatientResultsComponent) },
      { path: 'results/analyse', loadComponent: () => import('./patient/patient-results/analyse/analyse.component').then(m=>m.AnalyseComponent)} ,
      { path: 'results/imagerie', loadComponent: () => import('./patient/patient-results/imagerie/imagerie.component').then(m=>m.ImagerieComponent)} ,
      { path: 'antecedents', loadComponent: () => import('./patient/patient-antecedents/patient-antecedents.component').then(m => m.PatientAntecedentsComponent) }
    ]
  },
  {
    path: 'doctor',
    loadComponent: () => {
      return import('./doctor/doctor-layout/doctor-layout.component').then(
        (m) => m.DoctorLayoutComponent
      );
    },
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./doctor/doctor-dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent) 
      },
      { 
        path: 'mes-patients', 
        loadComponent: () => import('./doctor/mes-patients/mes-patients.component').then(m => m.MesPatientsComponent) 
      },
      { 
        path: 'creation-dpi', 
        loadComponent: () => import('./doctor/creer-dpi/creer-dpi.component').then(m => m.CreerDpiComponent) 
      },
      {
        path: 'mes-patients/:nss', // ':nss' is a dynamic parameter
        loadComponent: () => import('./doctor/dossier-patient/dpi-layout/dpi-layout.component').then(m => m.DpiLayoutComponent),
        children: [
          { 
            path: 'consultations', 
            loadComponent: () => import('./doctor/dossier-patient/consultations-patient/consultations-patient.component').then(m => m.ConsultationsPatientComponent) 
          },
          { 
            path: 'consultations/:id', 
            loadComponent: () => import('./doctor/dossier-patient/details-consultation/details-consultations.component').then(m => m.DetailsConsultationsComponent) 
          },
          { 
            path: 'ordonnances', 
            loadComponent: () => import('./doctor/dossier-patient/ordonnances-patient/ordonnances-patient.component').then(m => m.OrdonnancesPatientComponent) 
          },
          { 
            path: 'ordonnances/:id', 
            loadComponent: () => import('./doctor/dossier-patient/details-ordonnance/details-ordonnance.component').then(m => m.DetailsOrdonnanceComponent) 
          },
          { 
            path: 'resultats-med', 
            loadComponent: () => import('./doctor/patient-results/patient-results.component').then(m => m.PatientResultsComponent) 
          },
          { 
            path: 'antecedents-med', 
            loadComponent: () => import('./doctor/dossier-patient/patient-antecedents/patient-antecedents.component').then(m => m.PatientAntecedentsComponent) }
          ,
          { 
            path: 'soins', 
            loadComponent: () => import('./doctor/dossier-patient/soins/soins.component').then(m => m.SoinsComponent) 
          }
        ]
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

