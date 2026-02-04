import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { routes } from './app.routes';
import { PatientRepository } from './core/domain/ports/patient.repository';
import { HttpPatientRepository } from './infrastructure/adapters/http-patient.repository';
import { HealthPlanRepository } from './core/domain/ports/health-plan.repository';
import { HttpHealthPlanRepository } from './infrastructure/adapters/http-health-plan.repository';

// Custom Loader to avoid dependency issues
export function createTranslateLoader(http: HttpClient) {
  return {
    getTranslation: (lang: string) => http.get(`./assets/i18n/${lang}.json`)
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'pt-br'
    })),
    { provide: PatientRepository, useClass: HttpPatientRepository },
    { provide: HealthPlanRepository, useClass: HttpHealthPlanRepository }
  ]
};
