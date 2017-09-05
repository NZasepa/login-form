import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    // Enable redux development tools only for production
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    LoginModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
