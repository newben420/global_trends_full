import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDashboard } from './country-dashboard';

describe('CountryDashboard', () => {
  let component: CountryDashboard;
  let fixture: ComponentFixture<CountryDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
