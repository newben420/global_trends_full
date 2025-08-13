import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blinker } from './blinker';

describe('Blinker', () => {
  let component: Blinker;
  let fixture: ComponentFixture<Blinker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blinker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blinker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
