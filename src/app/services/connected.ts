import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Connected {
  private connected = signal<boolean>(false);
  isConnected  = this.connected.asReadonly();
  toggle(val: boolean){
      this.connected.set(val);
  }
}
