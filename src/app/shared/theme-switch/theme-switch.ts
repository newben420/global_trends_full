import { Component } from '@angular/core';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-theme-switch',
  standalone: false,
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.scss'
})
export class ThemeSwitch {
  constructor(
    public theme: Theme,
  ){
    
  }

  setTheme(){
    this.theme.setTheme();
  }
}
