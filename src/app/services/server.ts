import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Locale } from './locale';
import { ResParamFx } from './../../../serve/lib/functions';
import { Res, GRes } from './../../../serve/lib/res';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Server {
  constructor(private http: HttpClient, private locale: Locale) { }

  loaded: boolean = false;

  base = '/api';

  get(path: string, fn: ResParamFx) {
    let obs = this.http.get(`${this.base}/${path}`, { withCredentials: true, observe: 'body', responseType: 'json' });
    this.obHandler(obs, (r: Res) => {
      fn(r);
      return;
    });
  }

  getAsync(path: string) {
    return new Promise<Res>((resolve, reject) => {
      let obs = this.http.get(`${this.base}/${path}`, { withCredentials: true, observe: 'body', responseType: 'json' });
      this.obHandler(obs, (r: Res) => {
        resolve(r);
        return;
      });
    });
  }

  post(path: string, body: any, fn: ResParamFx, file: boolean = false) {
    let headers = new HttpHeaders();
    if (file) {
      headers.set('Content-Type', '');
      headers.set('Accept', 'multipart/form-data');
    }
    let obs = this.http.post<any>(`${this.base}/${path}`, body, { headers, withCredentials: true, responseType: "json", observe: 'body' });
    this.obHandler(obs, (r: Res) => {
      fn(r);
      return;
    });
  }

  postAsync(path: string, body: any, file: boolean = false) {
    return new Promise<Res>((resolve, reject) => {
      let headers = new HttpHeaders();
      if (file) {
        headers.set('Content-Type', '');
        headers.set('Accept', 'multipart/form-data');
      }
      let obs = this.http.post<any>(`${this.base}/${path}`, body, { headers, withCredentials: true, responseType: "json", observe: 'body' });
      this.obHandler(obs, (r: Res) => {
        resolve(r);
        return;
      });
    })
  }

  translateServerResponse = async (r: Res, fn: Function) => {
    if (r.succ) {
      // connection succeeded
      // get actual server response
      let rr: Res = r.message as Res;
      // server operation succeeded
      if (rr.succ) {
        if (rr.extra.tr) {
          // attempt translating
          this.locale.conv([rr.message], rx => {
            // ignore translation errors since operation was successful
            fn(GRes.succ(rx[0]));
          }, rr.extra || {});
        }
        else {
          // no need to translate
          fn(rr);
        }
      }
      else {
        // server operation failed
        // check for message
        if (rr.message) {
          if (rr.extra.tr) {
            this.locale.conv([rr.message], rx => {
              fn(GRes.err(rx[0]));
            }, rr.extra || {});
          }
          else {
            fn(rr);
          }
        }
        else {
          this.locale.conv(['SERVER.UNKNOWN_RESPONSE'], rx => {
            fn(GRes.err(rx[0]));
          }, {});
        }
      }
    }
    // connection failed
    else if (r.message) {
      this.locale.conv([r.message], rx => {
        fn(GRes.err(rx[0]));
      }, r.extra || {});
    }
  };

  private obHandler(o: Observable<any>, fn: Function): any {
    var r: Res;
    try {
      var s = o.subscribe({
        next: (data) => {
          r = { succ: true, message: data, extra: { tr: true } };
          this.translateServerResponse(r, (xx: Res) => {
            fn(xx);
          });
          return;
        },
        error: (err) => {
          if (err.error && err.error.message && typeof err.error.succ == "boolean") {
            this.translateServerResponse(err.error, (xx: Res) => {
              fn(xx);
            });
          }
          else {
            r = { succ: false, message: 'SERVER.NO_CONNECTION', extra: { tr: true } };
            this.translateServerResponse(r, (xx: Res) => {
              fn(xx);
            });
          }
          return;
        },
        complete: () => {
          s.unsubscribe();
          return;
        }
      });
    } catch (error) {
      r = { succ: false, message: 'SERVER.UNKNOWN_RESPONSE', extra: { tr: true } };
      this.translateServerResponse(r, (xx: Res) => {
        fn(xx);
      });
      return;
    }
  }
}
