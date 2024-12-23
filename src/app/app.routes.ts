import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from '../not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./user/user.component').then((m) => m.UserComponent);
    },
  },
  { path: 'user', component: UserComponent },
  { path: '**', component: NotFoundComponent },
];
