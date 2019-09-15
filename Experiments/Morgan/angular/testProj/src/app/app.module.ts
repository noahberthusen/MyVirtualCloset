import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/material'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestPage1Component } from './test-page1/test-page1.component';
import { TestPage2Component } from './test-page2/test-page2.component';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TestPage1Component,
    TestPage2Component,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
