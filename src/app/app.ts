import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SharedModule } from './shared/shared-module';
import { Subscription } from 'rxjs';
import { Preloader } from './services/preloader';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event, RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { CookieConsent } from "./partials/cookie-consent/cookie-consent";
import { Store } from './services/store';
import { Locale } from './services/locale';
import { Theme } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SharedModule,
    CookieConsent,
  ],
  providers: [

  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  subs: Record<string, Subscription> = {};
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private prel: Preloader,
    private router: Router,
    private store: Store,
    private locale: Locale,
    private theme: Theme,
  ) {

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 500, // animation duration
        once: true,    // whether animation should happen only once
      });
      // use browser theme by default
      this.store.get(this.theme.key).then(r => {
        if(!r){
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          if((this.theme.isDark() && (!prefersDark)) || ((!this.theme.isDark()) && prefersDark)){
            this.theme.setTheme();
          }
        }
      });
      // use browser locale by default
      this.store.get("locale").then(r => {
        if(!r){
          const pref = navigator.language?.slice(0, 2).toLowerCase();
          if(pref){
            this.locale.setLocale(pref);
          }
        }
      });
    }
  }

  ngOnInit() {
    this.prel.hide();
    this.subs["routing"] = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.prel.show();
      }
      else if (event instanceof NavigationEnd) {
        this.prel.hide();
      }
      else if (event instanceof NavigationCancel) {
        this.prel.hide();
      }
      else if (event instanceof NavigationError) {
        this.prel.hide();
      }
    });
  }

  ngOnDestroy() {
    Object.keys(this.subs).forEach(key => this.subs[key].unsubscribe());
  }
}
