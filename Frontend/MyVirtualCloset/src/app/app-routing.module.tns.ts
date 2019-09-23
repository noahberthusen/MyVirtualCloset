import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from '@src/app/app.routes';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule, RouterModule],  
})
export class AppRoutingModule { }
