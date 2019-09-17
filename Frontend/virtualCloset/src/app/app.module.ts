import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from '@src/app/app-routing.module';

// used to create fake backend
import { fakeBackendProvider } from '@src/app/_helpers';

import { AppComponent } from '@src/app/app.component';
import { routing } from '@src/app/app.routing';

import { JwtInterceptor, ErrorInterceptor } from '@src/app/_helpers';
import { HomeComponent } from '@src/app/home';
import { LoginComponent } from '@src/app/login';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
