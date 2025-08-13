import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from './store';
import { ResParamFx, StringArrayParamFx } from '../../../serve/lib/functions';
import { Subscription } from 'rxjs';
import { GRes } from '../../../serve/lib/res';
import { LOCALES } from '../locales';

@Injectable({
  providedIn: 'root'
})
export class Locale {
  constructor(
    private trans: TranslateService,
    private store: Store
  ) {
  }

  private shown = signal<boolean>(false);
  pickerShown = this.shown.asReadonly();
  toggleShown() {
    this.shown.update(v => !v);
  }

  setLocale(locale: string) {
    if (LOCALES.includes(locale)) {
      this.trans.use(locale);
      this.store.set("locale", locale);
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
