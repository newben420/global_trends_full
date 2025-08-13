import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { Header } from '../partials/header/header';
import { Hero } from "../partials/hero/hero";

@Component({
  selector: 'app-home',
  imports: [
    SharedModule,
    Header,
    Hero,
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
