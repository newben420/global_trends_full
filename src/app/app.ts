import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SharedModule } from './shared/shared-module';
import { Subscription } from 'rxjs';
import { Preloader } from './services/preloader';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event, RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { CookieConsent } from "./partials/cookie-consent/cookie-consent";

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
  ) {

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        // duration: 800, // animation duration
        // once: true,    // whether animation should happen only once
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
