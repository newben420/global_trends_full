import { Component, inject, Inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { Header } from '../partials/header/header';
import { Hero } from "../partials/hero/hero";
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Footer } from "../partials/footer/footer";

@Component({
  selector: 'app-home',
  imports: [
    SharedModule,
    Header,
    Hero,
    Footer,
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private request = inject(REQUEST_CONTEXT);
  metadata = signal<any>({});
  private metaKey = makeStateKey<any>('metah_ts');
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private state: TransferState,
  ) {
    if (isPlatformServer(this.platformId)) {
      if (this.request) {
        const meta = {
          brand: (this.request as any).brand,
          top: (this.request as any).top,
        }
        this.metadata.set(meta);
        state.set(this.metaKey, meta);
      }
    }
    if (isPlatformBrowser(this.platformId)) {
      if (state.hasKey(this.metaKey)) {
        this.metadata.set(state.get(this.metaKey, {}));
      }
    }
  }
}
