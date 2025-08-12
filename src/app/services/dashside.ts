import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Dashside {
  private opened = signal<boolean>(false);
  shown  = this.opened.asReadonly();
  toggle(val: boolean | null = null){
    if(typeof val == "boolean"){
      this.opened.set(val);
    }
    else{
      this.opened.update(v => !v);
    }
  }
}
