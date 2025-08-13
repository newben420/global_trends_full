import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Theme } from '../../services/theme';
import { Blinker } from "../blinker/blinker";

@Component({
  selector: 'app-hero',
  imports: [
    SharedModule,
    Blinker
],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  constructor(
    public theme: Theme,
  ){
    
  }
}
