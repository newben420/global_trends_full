import { afterNextRender, Component, computed, HostListener, signal } from '@angular/core';
import { Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { SharedModule } from '../shared/shared-module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { Countries } from '../services/countries';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  opened = signal<boolean>(false);
  windowWidth: number = 0;
  widthBreakPoint: number = 768;
  subs: Record<string, Subscription> = {};
  brand = signal<string>('');
  connected = signal<boolean | null>(null);
  searchKeyword = signal<string>('');
  countries = computed(() => {
    return this.countService.all().filter(c => this.searchKeyword() ? (c.code.toLowerCase().includes(this.searchKeyword().toLowerCase()) || c.name.toLowerCase().includes(this.searchKeyword().toLowerCase())) : true)
  });

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public countService: Countries,
  ) {

  }

  hideOnMoile(){
    if(this.windowWidth < this.widthBreakPoint) this.opened.set(false);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
      this.opened.set(this.windowWidth > this.widthBreakPoint);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = (event.target as Window).innerWidth;
    }
  }

  ngOnDestroy() {
    Object.keys(this.subs).forEach(x => {
      this.subs[x].unsubscribe();
    });
  }

}
