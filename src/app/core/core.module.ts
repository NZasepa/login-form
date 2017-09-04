import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginServices } from '../login/login.services';

@NgModule({
  imports: [
    BrowserModule
  ],
  exports: [
    BrowserModule
  ],
  providers: [
    LoginServices
  ]
})
export class CoreModule { }
