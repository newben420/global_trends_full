import { ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateLoader, provideTranslateService, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";

import { routerOptions, routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { timeoutInterceptor } from './interceptors/timeout.interceptor';
import { LOCALES } from './locales';
import { SocketIoConfig, provideSocketIo } from 'ngx-socket-io';
import { Store } from './services/store';
import { isPlatformServer } from '@angular/common';
import { UniversalTranslateLoader } from './universal-translate-loader';
import { JsonFileLoader } from './custom-translate-loader';

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

function provideUniversalTranslateLoader() {
  const platformId = inject(PLATFORM_ID);
  const http = inject(HttpClient);

  if (isPlatformServer(platformId)) {
    return new UniversalTranslateLoader(http);
  } else {
    // fallback: the default Http loader
    const { TranslateHttpLoader } = require('@ngx-translate/http-loader');
    return new TranslateHttpLoader(http, '/i18n/', '.json');
  }
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
      loader: provideTranslateLoader(JsonFileLoader),
      fallbackLang: LOCALES[0],
      lang: LOCALES[0],
    }),
    provideSocketIo(config),
  ]
};
