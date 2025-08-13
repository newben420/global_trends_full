import { isPlatformServer, isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, inject, Inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';
import { Store } from '../../services/store';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-cookie-consent',
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss'
})
export class CookieConsent {
  private request = inject(REQUEST_CONTEXT);
  metadata = signal<any>({});
  storeKey = "cookie_consent";
  storeVal = "y";
  private metaKey = makeStateKey<any>('meta_ts');
  visible = signal<boolean>(false);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private state: TransferState,
    private store: Store,
  ) {
    if (isPlatformServer(this.platformId)) {
      if (this.request) {
        const meta = {
          brand: (this.request as any).brand,
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

  close(){
    this.visible.set(false);
    this.store.set(this.storeKey, this.storeVal);
  }

  async runner(){
    const val = await this.store.get(this.storeKey);
    if(val != this.storeVal){
      this.visible.set(true);
    }
  }

  ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.runner();
        }, 1000);
      }
    }
}
