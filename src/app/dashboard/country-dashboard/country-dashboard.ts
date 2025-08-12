import { Component } from '@angular/core';
import { Countries } from '../../services/countries';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-country-dashboard',
  imports: [
    SharedModule,
  ],
  templateUrl: './country-dashboard.html',
  styleUrl: './country-dashboard.scss'
})
export class CountryDashboard {
  constructor(
    public ct: Countries,
  ) { }
}
