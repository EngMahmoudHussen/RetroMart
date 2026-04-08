import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { API_BASE_URL } from './token/api-toen';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        tokenInterceptor,
        httpErrorInterceptor,
        loadingInterceptor,
      ]),
    ),
    provideAnimations(),
    provideToastr(),

    {
      provide: API_BASE_URL,
      useValue: 'https://ecommerce.routemisr.com/api/v1',
    },
  ],
};
