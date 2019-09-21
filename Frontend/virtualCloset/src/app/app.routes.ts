import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from '@src/app/login/login.component';
import { AuthGuard } from '@src/app/_guards/auth.guard';


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
