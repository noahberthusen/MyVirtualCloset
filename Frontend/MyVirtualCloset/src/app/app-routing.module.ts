import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontComponent } from './components/front/front.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UploadComponent } from './components/upload/upload.component';
import { BuildOutfitComponent } from './components/build-outfit/build-outfit.component';
import { ConfirmOutfitComponent } from './components/confirm-outfit/confirm-outfit.component';



const routes: Routes = [
  {
    path: '',
    component: FrontComponent
  },
  {
    path: 'build',
    component: BuildOutfitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,    
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'confirm-outfit',
    component: ConfirmOutfitComponent
  },
  //this component was for testing
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
