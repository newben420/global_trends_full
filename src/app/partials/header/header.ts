import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared-module';
@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    SharedModule,
],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private request = inject(REQUEST_CONTEXT);
  metadata = signal<any>({});
  private metaKey = makeStateKey<any>('meta_ts');
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private state: TransferState,
  ) {
    if (isPlatformServer(this.platformId)) {
      if (this.request) {
        const meta = {
          brand: (this.request as any).brand,
          top: (this.request as any).top,
          year: (this.request as any).year,
          support: (this.request as any).support,
          url: (this.request as any).url,
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
