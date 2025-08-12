import { Component } from '@angular/core';
import { Preloader } from '../../services/preloader';

@Component({
  selector: 'app-preloader-comp',
  standalone: false,
  templateUrl: './preloader-comp.html',
  styleUrl: './preloader-comp.scss'
})
export class PreloaderComp {
  constructor(public prel: Preloader) {
    
  }
}
