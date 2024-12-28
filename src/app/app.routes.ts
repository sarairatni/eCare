import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './404/not-found.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { MesPatientsComponent } from './doctor/mes-patients/mes-patients.component';
import { ConsultationsPatientComponent } from './doctor/dossier-patient/consultations-patient/consultations-patient.component';
import { DpiLayoutComponent } from './doctor/dossier-patient/dpi-layout/dpi-layout.component';
import { OrdonnancesPatientComponent } from './doctor/dossier-patient/ordonnances-patient/ordonnances-patient.component';
import { ResultatsMedComponent } from './doctor/dossier-patient/resultats-med/resultats-med.component';
import { AntecedentsMedComponent } from './doctor/dossier-patient/antecedents-med/antecedents-med.component';
import { SoinsComponent } from './doctor/dossier-patient/soins/soins.component';
import { Component } from '@angular/core';
import { DetailsConsultationsComponent } from './doctor/dossier-patient/details-consultation/details-consultations.component';
import { DetailsOrdonnanceComponent } from './doctor/dossier-patient/details-ordonnance/details-ordonnance.component';
import { CreerDpiComponent } from './doctor/creer-dpi/creer-dpi.component';
import { AjouterAnalyseComponent } from './laborantin/ajouter-analyse/ajouter-analyse.component';
import { AjouterAnalyseBioComponent } from './laborantin/ajouter-analyse-bio/ajouter-analyse-bio.component';

export const routes: Routes = [
  {
    path: '',

    loadComponent: () => {
      return import('./landing/landing.component').then(
        (m) => m.LandingComponent
      );
    },
  },
  {
    path: 'accueil',
    loadComponent: () => {
      return import('./landing/landing.component').then(
        (m) => m.LandingComponent
      );
    },
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./auth/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
  {
    path: 'patient',
    loadComponent: () => {
      return import('./patient/patient-layout/patient-layout.component').then(
        (m) => m.PatientLayoutComponent
      );
    },
    children: [
      {
        path: '',
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
    loadComponent: () => {
      return import('./doctor/doctor-layout/doctor-layout.component').then(
        (m) => m.DoctorLayoutComponent
      );
    },
    children: [
      {
        path: 'dashboard', //~~~~~~~~~~~~
        component: DoctorDashboardComponent,
      },

      {
        path: 'mes-patients',
        component: MesPatientsComponent,
      },
      {
        path: 'creation-dpi',
        component: CreerDpiComponent,
      },

      {
        path: 'mes-patients/:nss', // ':nss' is a dynamic parameter
        component: DpiLayoutComponent,
        children: [
          {
            path: 'consultations',
            component: ConsultationsPatientComponent,
          },
          {
            path: 'consultations/:id',
            component: DetailsConsultationsComponent,
          },
          {
            path: 'ordonnances',
            component: OrdonnancesPatientComponent,
          },
          {
            path: 'ordonnances/:id',
            component: DetailsOrdonnanceComponent,
          },
          { path: 'resultats-med', component: ResultatsMedComponent },
          { path: 'antecedents-med', component: AntecedentsMedComponent },
          { path: 'soins', component: SoinsComponent },
        ],
      },
    ],
  },
  //-------  LABORANTIN ROUTES  --------------------
  {
    path: 'laborantin',
    loadComponent: () => {
      return import('./laborantin/laborantin-layout/laborantin-layout.component').then(
        (m) => m.LaborantinLayoutComponent
      );
    },
    children: [
      {
        path: 'ajouter-analyse',
        component: AjouterAnalyseComponent,
      },
      {
        path: 'ajouter-analyse/:dpi_id',
        component: AjouterAnalyseBioComponent,
      }
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
