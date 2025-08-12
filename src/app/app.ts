import { afterNextRender, Component } from '@angular/core';
import { SharedModule } from './shared/shared-module';
import { Subscription } from 'rxjs';
import { Preloader } from './services/preloader';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SharedModule,
  ],
  providers: [

  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  subs: Record<string, Subscription> = {};
  constructor(
    private prel: Preloader,
    private router: Router,
  ) {

    afterNextRender(() => {

    });
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
