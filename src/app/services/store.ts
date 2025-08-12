import { inject, Injectable, REQUEST_CONTEXT } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Server } from './server';
import { Injector } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class Store {
  private isBrowser: boolean;
  private isServer: boolean;
  private _server?: Server;
  private request = inject(REQUEST_CONTEXT);

  get server() {
    if (!this._server) {
      this._server = this.injector.get<Server>(Server as any);
    }
    return this._server;
  }

  constructor(@Inject(PLATFORM_ID) platformId: Object, private injector: Injector) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  isStorage(): boolean {
    if (this.isBrowser) {
      if (typeof localStorage !== "undefined") {
        try {
          localStorage.setItem('feature_test', 'yes');
          if (localStorage.getItem('feature_test') == 'yes') {
            localStorage.removeItem('feature_test');
            return true;
          }
          else {
            return false;
          }
        } catch (error) {
          return false;
        }
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  isCookie(): boolean {
    if (this.isBrowser) {
      const cookiesEnabled = navigator.cookieEnabled;
      return cookiesEnabled;
    }
    else if (this.isServer) {
      return true;
    }
    else {
      return false;
    }
  }

  get(key: string) {
    return new Promise<null | string>((resolve, reject) => {
      if (this.isStorage()) {
        let item = localStorage.getItem(key);
        if (item) {
          resolve(item);
          return;
        }
      }
      if (this.request) {
        const val = ((this.request as any).cookies || {})[key];
        if (val) {
          resolve(val);
          return
        }
      }
      resolve(null);
      return;
    });
  }

  set(key: string, value: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      const done = [false, false];
      if (this.isStorage()) {
        localStorage.setItem(key, value);
        if (localStorage.getItem(key) == value) {
          done[0] = true;
        }
      }

      done[1] = (await this.server.postAsync("cookie", {name: key, value})).succ;

      resolve(done[0] || done[1]);
    })
  }

  delete(key: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      if (this.isStorage()) {
        localStorage.removeItem(key);
      }
      (await this.server.postAsync("cookie/delete", {name: key}));
      resolve(true);
      return;
    });
  }
}
