import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-hero',
  imports: [
    SharedModule,
    CommonModule,
  ],
  templateUrl: './simple-hero.html',
  styleUrl: './simple-hero.scss'
})
export class SimpleHero {
  @Input() title: any = '';
}
