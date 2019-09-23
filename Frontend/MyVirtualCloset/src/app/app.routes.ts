import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
  },
  {
      path: 'login',
      component: LoginComponent,
  },
];
