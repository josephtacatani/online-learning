import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { EnvironmentInjector, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environment/environment.prod';
import { logregFeatureKey, logregReducer } from './app/login/ngrx/login.reducer';
import { LogRegEffects } from './app/login/ngrx/login.effects';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { getCourseFeatureKey, getCourseReducer } from './app/homepage/ngrx/homepage.reducer';
import { GetCourseEffects } from './app/homepage/ngrx/homepage.effects';

bootstrapApplication(AppComponent, {
  providers:[
    provideHttpClient(),
    provideRouter(routes),
    provideStore({
      [logregFeatureKey]: logregReducer,
      [getCourseFeatureKey]: getCourseReducer
    }),
    provideEffects([LogRegEffects, GetCourseEffects]),
    importProvidersFrom(
      BrowserAnimationsModule,
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
      })
    )
  ]
}).catch((err) => console.error(err));
