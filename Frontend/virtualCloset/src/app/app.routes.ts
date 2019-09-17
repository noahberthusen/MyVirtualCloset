import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';

// export const routes: Routes = [
//   {
//       path: '',
//       redirectTo: '/home',
//       pathMatch: 'full',
//   },
//   {
//       path: 'home',
//       component: HomeComponent,
//   },
// ];

const appRoutes: Routes = [
  {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'login',
      component: LoginComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
