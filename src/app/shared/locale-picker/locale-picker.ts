import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from '../../services/locale';
import { LOCALE_FLAGS } from '../../locales';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-locale-picker',
  standalone: false,
  templateUrl: './locale-picker.html',
  styleUrl: './locale-picker.scss'
})
export class LocalePicker {
  locales = signal<{ code: string; flag: string; }[]>([]);
  lang = signal<string>("");

  constructor(
    private locale: TranslateService,
    public loc: Locale,
  ) {
    this.locales.set(locale.getLangs().map(x => ({ code: x, flag: LOCALE_FLAGS[x] })));
    this.langs = this.locale.onLangChange.subscribe(x => {
      this.lang.set(x.lang);
    });
  }

  langs?: Subscription;

  ngOnDestroy() {
    this.langs?.unsubscribe();
  }

  setLocale(l: string) {
    this.loc.setLocale(l);
    this.loc.toggleShown();
  }

  close() {
    this.loc.toggleShown();
  }
}
