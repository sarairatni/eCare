
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
    path : '**',
    loadComponent: () => {
      return import('./404/not-found.component').then((m) => m.NotFoundComponent);
    }
  }
];

