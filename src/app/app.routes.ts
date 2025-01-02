
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'accueil',
    pathMatch: 'full',
    loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'patient',
    loadComponent: () => import('./patient/patient-layout/patient-layout.component').then(m => m.PatientLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./patient/patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent),
      },
      {
        path: 'profil',
        loadComponent: () => import('./shared/profil/profil.component').then(m => m.ProfilComponent),
      },
      {
        path: 'historique',
        children: [
          {
            path: '',
            loadComponent: () => import('./patient/historique/historique.component').then(m => m.HistoriqueComponent),
          },
          {
            path: 'ordonnance',
            loadComponent: () => import('./patient/historique-ordonnance/historique-ordonnance.component').then(m => m.HistoriqueOrdonnanceComponent),
          },
          {
            path: 'consultation',
            children: [
              {
                path: '',
                loadComponent: () => import('./patient/historique-consultation/historique-consultation.component').then(m => m.HistoriqueConsultationComponent),
              },
              {
                path: 'ordonnance',
                loadComponent: () => import('./patient/historique-ordonnance-consultation/historique-ordonnance-consultation.component').then(m => m.HistoriqueOrdonnanceConsultationComponent),
              },
            ],
          },
        ],
      },
      {
        path: 'results',
        children: [
          {
            path: '',
            loadComponent: () => import('./patient/patient-results/patient-results.component').then(m => m.PatientResultsComponent),
          },
          {
            path: 'analyse/:id',
            loadComponent: () => import('./patient/patient-results/analyse/analyse.component').then(m => m.AnalyseComponent),
          },
          {
            path: 'imagerie/:id',
            loadComponent: () => import('./patient/patient-results/imagerie/imagerie.component').then(m => m.ImagerieComponent),
          },
        ],
      },
      {
        path: 'antecedents',
        loadComponent: () => import('./patient/patient-antecedents/patient-antecedents.component').then(m => m.PatientAntecedentsComponent),
      },
    ],
  },
  {
    path: 'doctor',
    loadComponent: () => import('./doctor/doctor-layout/doctor-layout.component').then(m => m.DoctorLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./doctor/doctor-dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent),
      },
      {
        path: 'mes-patients',
        children: [
          {
            path: '',
            loadComponent: () => import('./doctor/mes-patients/mes-patients.component').then(m => m.MesPatientsComponent),
          },
          {
            path: ':nss',
            loadComponent: () => import('./doctor/dossier-patient/dpi-layout/dpi-layout.component').then(m => m.DpiLayoutComponent),
            children: [
              {
                path: 'consultations',
                children: [
                  {
                    path: '',
                    loadComponent: () => import('./doctor/dossier-patient/consultations-patient/consultations-patient.component').then(m => m.ConsultationsPatientComponent),
                  },
                  {
                    path: ':id',
                    loadComponent: () => import('./doctor/dossier-patient/details-consultation/details-consultations.component').then(m => m.DetailsConsultationsComponent),
                  },
                ],
              },
              {
                path: 'ordonnances',
                children: [
                  {
                    path: '',
                    loadComponent: () => import('./doctor/dossier-patient/ordonnances-patient/ordonnances-patient.component').then(m => m.OrdonnancesPatientComponent),
                  },
                  {
                    path: ':id',
                    loadComponent: () => import('./doctor/dossier-patient/details-ordonnance/details-ordonnance.component').then(m => m.DetailsOrdonnanceComponent),
                  },
                ],
              },
              {
                path: 'resultats-med',
                children: [
                  {
                    path: '',
                    loadComponent: () => import('./patient/patient-results/patient-results.component').then(m => m.PatientResultsComponent),
                  },
                  {
                    path: 'analyse/:id',
                    loadComponent: () => import('./patient/patient-results/analyse/analyse.component').then(m => m.AnalyseComponent),
                  },
                  {
                    path: 'imagerie/:id',
                    loadComponent: () => import('./patient/patient-results/imagerie/imagerie.component').then(m => m.ImagerieComponent),
                  },
                ],
              },
              {
                path: 'antecedents-med',
                loadComponent: () => import('./patient/patient-antecedents/patient-antecedents.component').then(m => m.PatientAntecedentsComponent),
              },
              {
                path: 'soins',
                loadComponent: () => import('./doctor/dossier-patient/soins/soins.component').then(m => m.SoinsComponent),
              },
            ],
          },
        ],
      },
      {
        path: 'profil',
        loadComponent: () => import('./shared/profil/profil.component').then(m => m.ProfilComponent),
      },
      {
        path: 'creation-dpi',
        loadComponent: () => import('./doctor/creer-dpi/creer-dpi.component').then(m => m.CreerDpiComponent),
      },
    ],
  },
  {
    path: 'laborantin',
    loadComponent: () => import('./laborantin/laborantin-layout/laborantin-layout.component').then(m => m.LaborantinLayoutComponent),
    children: [
      {
        path: 'profil',
        loadComponent: () => import('./shared/profil/profil.component').then(m => m.ProfilComponent),
      },
      {
        path: 'ajouter-analyse',
        children: [
          {
            path: '',
            loadComponent: () => import('./laborantin/ajouter-analyse/ajouter-analyse.component').then(m => m.AjouterAnalyseComponent),
          },
          {
            path: ':dpi_id',
            loadComponent: () => import('./laborantin/ajouter-analyse-bio/ajouter-analyse-bio.component').then(m => m.AjouterAnalyseBioComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'infirmier',
    loadComponent: () => import('./infirmier/infirmier-layout/infirmier-layout.component').then(m => m.InfirmierLayoutComponent),
    children: [
      {
        path: 'profil',
        loadComponent: () => import('./shared/profil/profil.component').then(m => m.ProfilComponent),
      },
      {
        path: 'ajouter-soin',
        loadComponent: () => import('./infirmier/ajouter-soin/ajouter-soin.component').then(m => m.AjouterSoinComponent),
      }
    ]
  },
  {
    path: 'radiologue',
    loadComponent: () => import('./radiologue/radiologue-layout/radiologue-layout.component').then(m => m.RadiologueLayoutComponent),
    children: [
      {
        path: 'profil',
        loadComponent: () => import('./shared/profil/profil.component').then(m => m.ProfilComponent),
      },
      {
        path: 'ajouter-radio',
        loadComponent: () => import('./radiologue/ajouter-radio/ajouter-radio.component').then(m => m.AjouterRadioComponent),
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./404/not-found.component').then(m => m.NotFoundComponent),
  },
];

