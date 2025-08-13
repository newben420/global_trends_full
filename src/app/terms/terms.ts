import { Component, inject, Inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';
import { Header } from "../partials/header/header";
import { Footer } from "../partials/footer/footer";
import { SimpleHero } from "../partials/simple-hero/simple-hero";
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SharedModule } from '../shared/shared-module';

@Component({
  selector: 'app-terms',
  imports: [
    Header,
    Footer,
    SimpleHero,
    CommonModule,
    SharedModule,
  ],
  templateUrl: './terms.html',
  styleUrl: './terms.scss'
})
export class Terms {
  private request = inject(REQUEST_CONTEXT);
  metadata = signal<any>({});
  private metaKey = makeStateKey<any>('metat_ts');
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private state: TransferState,
  ) {
    if (isPlatformServer(this.platformId)) {
      if (this.request) {
        const meta = {
          brand: (this.request as any).brand,
          email: (this.request as any).email,
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
