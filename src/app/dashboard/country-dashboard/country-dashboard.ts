import { Component, computed, Inject, inject, PLATFORM_ID, REQUEST_CONTEXT, signal } from '@angular/core';
import { Countries } from '../../services/countries';
import { SharedModule } from '../../shared/shared-module';
import { KeywordEntry } from '../../../../serve/model/theme2category';
import { Server } from '../../services/server';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-country-dashboard',
  imports: [
    SharedModule,
    MatTableModule,
  ],
  templateUrl: './country-dashboard.html',
  styleUrl: './country-dashboard.scss'
})
export class CountryDashboard {
  private request = inject(REQUEST_CONTEXT);
  keywords = signal<KeywordEntry[]>([]);
  uiKeys = computed(() => this.keywords().map((x, i) => ({...x, rank: i + 1})));
  displayedColumns: string[] = [
    'rank',
    'keyword',
    'tone',
    'lastUpdated',
    // 'delta',
  ]
  top = signal<number>(5);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public ct: Countries,
    private server: Server,
  ) {
    console.log(this.request);
    if(this.request && (this.request as any).top){
      this.top.set((this.request as any).top);
    }
    if (isPlatformServer(this.platformId)) {
      this.updateKeywords();
    }
    else if (isPlatformBrowser(this.platformId) && this.keywords().length <= 0) {
      this.updateKeywords();
    }
  }

  updateKeywords() {
    this.server.get(`trends/${this.ct.activeCountry().code.toLowerCase()}`, r => {
      if(r.succ){
        this.keywords.set(r.message);
      }
    });
  }

  ngOnInit() {

  }
}
