import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; //related to jwt interceptor
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontComponent } from './components/front/front.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { MaterialModule } from  './material';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { BuildOutfitComponent } from './components/build-outfit/build-outfit.component';
import { UploadComponent } from './components/upload/upload.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SendNotificationComponent } from './components/send-notification/send-notification.component';
import { UploadTopComponent } from './components/upload-top/upload-top.component';
import { UploadBottomComponent } from './components/upload-bottom/upload-bottom.component';
import { UploadMiscComponent } from './components/upload-misc/upload-misc.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ResetPasswordComponent,
    BuildOutfitComponent,
    UploadComponent,
    SendNotificationComponent,
    UploadTopComponent,
    UploadBottomComponent,
    UploadMiscComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    CarouselModule.forRoot(),
    FontAwesomeModule,
  ],
  entryComponents:[
    BuildOutfitComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
