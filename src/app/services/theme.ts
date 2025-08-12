import { DOCUMENT, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Store } from './store';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  private key: string = "theme";
  private isBrowser: boolean;
  private isServer: boolean;
  private dark = signal<boolean>(false);
  isDark = this.dark.asReadonly();

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private store: Store,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  async loadSet() {
    let s = await this.store.get(this.key);
    if (s === "dark") {
      this.dark.set(true);
    }
    else {
      this.dark.set(false);
    }
    if (this.isServer) {
      if (this.document) {
        if (this.dark()) {
          this.document.body.classList.add("darkMode");
        }
        else {
          this.document.body.classList.remove("darkMode");
        }
      }
    }
    else if (this.isBrowser) {
      if (document) {
        if (this.dark()) {
          document.body.classList.add("darkMode");
        }
        else {
          document.body.classList.remove("darkMode");
        }
      }
    }
  }

  async setTheme() {
    const newValue = this.dark() ? "light" : "dark";
    const x = await this.store.set(this.key, newValue);
    if (x)
      this.loadSet();
  }
}
