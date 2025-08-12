import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Dashside } from '../../services/dashside';

@Component({
  selector: 'app-empty-dashboard',
  imports: [
    SharedModule,
  ],
  templateUrl: './empty-dashboard.html',
  styleUrl: './empty-dashboard.scss'
})
export class EmptyDashboard {
  constructor(
    public side: Dashside,
  ){
    
  }
}
