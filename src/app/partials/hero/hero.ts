import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Theme } from '../../services/theme';
import { Blinker } from "../blinker/blinker";
import { MatTooltipModule } from '@angular/material/tooltip';
import { Alert } from '../../services/alert';
@Component({
  selector: 'app-hero',
  imports: [
    SharedModule,
    Blinker,
    MatTooltipModule,
],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  constructor(
    public theme: Theme,
    private alrt: Alert,
  ){
    
  }

  soon(){
    this.alrt.show("success", "SOON");
  }
}
