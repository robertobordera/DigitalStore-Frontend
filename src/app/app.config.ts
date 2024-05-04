import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { provideBingmapsKey } from './bingmaps/bingmaps.config';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(
    routes, withComponentInputBinding(),
  ),
  provideHttpClient(withInterceptors([baseUrlInterceptor])),
  provideBingmapsKey('AtoSsxHjU1_MtJld4kO_gCKLNp6cqueopJBZfcMo4c6Q5892xLQItmfeCZdVGKUf'),
  ],
};
