import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginServices } from './login.services';
import { LoginFormComponent } from './login-form/login-form.component';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoginModule,
      providers: [
        LoginServices
      ]
    };
  }
}
