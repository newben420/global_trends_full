import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Preloader {
  private visible = signal<boolean>(true);
  isVisible = this.visible.asReadonly();

  constructor() { }
  show(){
    this.visible.set(true);
  }
  hide(){
    this.visible.set(false);
  }
}
