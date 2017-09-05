import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginServices } from './login.services';
import { LoginFormComponent } from './login-form/login-form.component';
import { DirectivesModule } from '../directives/directives.module';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './login.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    EffectsModule.forFeature([
      LoginEffects
    ])
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
