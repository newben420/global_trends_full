import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateService, TranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";

import { routerOptions, routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { timeoutInterceptor } from './interceptors/timeout.interceptor';
import { LOCALES } from './locales';
import { SocketIoConfig, provideSocketIo } from 'ngx-socket-io';
import { Store } from './services/store';

const config: SocketIoConfig = { url: '/', options: {} };

function initTranslations() {
  const store = inject(Store);
  const translate = inject(TranslateService);
  return store.get('locale').then(r => {
    if(r){
      translate.use(r);
    }
  })
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling(routerOptions)), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([timeoutInterceptor]), withFetch()),
    provideAppInitializer(initTranslations),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: LOCALES[0],
      lang: LOCALES[0],
    }),
    provideSocketIo(config),
  ]
};
