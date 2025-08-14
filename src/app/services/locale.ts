import { DOCUMENT, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from './store';
import { ResParamFx, StringArrayParamFx } from '../../../serve/lib/functions';
import { Subscription } from 'rxjs';
import { GRes } from '../../../serve/lib/res';
import { LOCALES } from '../locales';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Locale {
  constructor(
    private trans: TranslateService,
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  private shown = signal<boolean>(false);
  private isBrowser: boolean;
  private isServer: boolean;
  pickerShown = this.shown.asReadonly();
  toggleShown() {
    this.shown.update(v => !v);
  }

  setLocale(locale: string) {
    if (LOCALES.includes(locale)) {
      this.trans.use(locale);
      this.store.set("locale", locale);
      this.updateLocale();
    }
  }

  lang(){
    return this.store.getSync('locale') || LOCALES[0];
  }

  updateLocale(code: string = LOCALES[0]) {
    if (this.isServer && this.document) {
      this.document.documentElement.lang = code;
    }
    else if (this.isBrowser && document) {
      document.documentElement.lang = code;
    }
  }

  private con(key: string, fn: ResParamFx, val: any = {}) {
    let sub: Subscription = this.trans.get(key, val).subscribe((res: string) => {
      if (res == key) {
        fn(GRes.err(res));
      }
      else {
        fn(GRes.succ(res));
      }
      try {
        sub.unsubscribe();
      } catch (error) {

      }
    });
  }

  instant(keys: string[], params: any[]) {
    return keys.map((key, i) => this.trans.instant(key, params[i]));
  }

  waiter(keys: string[], params: any[]) {
    return Promise.all(keys.map((key, i) => new Promise<string>((resolve, reject) => {
      let sub = this.trans.get(key, params[i]).subscribe((res: string) => {
        resolve(res);
        try {
          sub.unsubscribe();
        } catch (error) {

        }
      });
    })));
  }

  conv(keys: string[], fn: StringArrayParamFx, val: any = {}) {
    let res: string[] = []
    let keysCp: string[] = keys.filter(x => true);
    const runX = (cb: Function) => {
      if (keysCp.length == 0) {
        cb();
      }
      else {
        let key: string = keysCp.shift()!;
        this.con(key, r => {
          res.push(r.message);
          runX(cb);
        }, val);
      }
    }
    runX(() => {
      fn(res);
    });
  }
}
