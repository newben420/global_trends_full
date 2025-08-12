import { Component, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Locale } from '../../services/locale';

@Component({
  selector: 'app-locale-switch',
  standalone: false,
  templateUrl: './locale-switch.html',
  styleUrl: './locale-switch.scss'
})
export class LocaleSwitch {
  private locale = inject(TranslateService);
  private loc = inject(Locale);
  l = signal<string>(this.locale.getCurrentLang());
  lang: Subscription = this.locale.onLangChange.subscribe(x => {
    this.l.set(x.lang);
  });

  ngOnDestroy(){
    this.lang.unsubscribe();
  }

  openLangs(){
    this.loc.toggleShown();
  }
}
