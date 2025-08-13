import { Component, computed, Inject, inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';
import { Countries } from '../../services/countries';
import { SharedModule } from '../../shared/shared-module';
import { KeywordEntry } from '../../../../serve/model/theme2category';
import { Server } from '../../services/server';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { getDateTime2, getTimeElapsed } from '../../../../serve/lib/date_time';

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
  GDT = getDateTime2;
  GTE = getTimeElapsed;
  now = signal<number>(0);
  keywords = signal<KeywordEntry[]>([]);
  uiKeys = computed(() => this.keywords().map((x, i) => ({ ...x, rank: i + 1 })));
  displayedColumns: string[] = [
    'rank',
    'keyword',
    'tone',
    'lastUpdated',
    'firstUpdated',
    'categories',
  ]
  top = signal<number>(5);
  private serverTimeKey = makeStateKey<number>('server_time_ts');
  private topKey = makeStateKey<number>('top_ts');
  private keywordsKey = makeStateKey<KeywordEntry[]>('keywords_ts');
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public ct: Countries,
    private server: Server,
    private state: TransferState,
  ) {
    if (isPlatformServer(this.platformId)) {
      this.now.set(Date.now());
      this.state.set(this.serverTimeKey, Date.now());
      if (this.request && (this.request as any).top) {
        const val = (this.request as any).top
        this.top.set(val);
        state.set(this.topKey, val);
      }
      this.updateKeywords();
    }
    else if (isPlatformBrowser(this.platformId) && this.keywords().length <= 0) {
      if(state.hasKey(this.serverTimeKey)){
        this.now.set(state.get(this.serverTimeKey, Date.now()));
      }
      if(state.hasKey(this.topKey)){
        this.top.set(state.get(this.topKey, 5));
      }
      if(state.hasKey(this.keywordsKey)){
        this.keywords.set(state.get(this.keywordsKey, []));
      }
      else{
        this.updateKeywords();
      }
    }
  }

  updateKeywords() {
    this.server.get(`trends/${this.ct.activeCountry().code.toLowerCase()}`, r => {
      if (r.succ) {
        this.keywords.set(r.message);
        if (isPlatformServer(this.platformId)) {
          this.state.set(this.keywordsKey, r.message);
        }
      }
    });
  }

  timeUpdate:any =null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.timeUpdate = setInterval(() => {
        this.now.update(x => x + 30000);
      }, 30000);
    }
  }

  ngOnDestroy(){
    if(this.timeUpdate){
      clearInterval(this.timeUpdate);
    }
  }

  tone2label(tone: number) {
    tone = Math.max(Math.min(10, tone), -10)
    if (tone <= -7) {
      return 'VERY_NEGATIVE';
    }
    else if (tone <= -3) {
      return 'NEGATIVE';
    }
    else if (tone < -1) {
      return 'SLIGHTLY_NEGATIVE';
    }
    else if (tone <= 1) {
      return 'NEUTRAL';
    }
    else if (tone <= 3) {
      return 'SLIGHTLY_POSITIVE';
    }
    else if (tone <= 6) {
      return 'SLIGHTLY_POSITIVE';
    }
    else {
      return 'VERY_POSITIVE';
    }
  }

  tone2colourClass(tone: number) {
    tone = Math.max(Math.min(10, tone), -10)

    if (tone < -1) {
      return 'bg-danger';
    }
    else if (tone <= 1) {
      return 'bg-secondary';
    }
    else {
      return 'bg-success';
    }
  }
}
