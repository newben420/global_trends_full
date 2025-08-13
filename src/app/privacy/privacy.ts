import { CommonModule, isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';
import { Footer } from '../partials/footer/footer';
import { Header } from '../partials/header/header';
import { SimpleHero } from '../partials/simple-hero/simple-hero';
import { SharedModule } from '../shared/shared-module';

@Component({
  selector: 'app-privacy',
  imports: [
    Header,
    Footer,
    SimpleHero,
    CommonModule,
    SharedModule,
  ],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss'
})
export class Privacy {
  private request = inject(REQUEST_CONTEXT);
  metadata = signal<any>({});
  private metaKey = makeStateKey<any>('metap_ts');
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private state: TransferState,
  ) {
    if (isPlatformServer(this.platformId)) {
      if (this.request) {
        const meta = {
          brand: (this.request as any).brand,
          email: (this.request as any).email,
          url: (this.request as any).url,
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
