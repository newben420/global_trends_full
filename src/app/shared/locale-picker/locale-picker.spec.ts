import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalePicker } from './locale-picker';

describe('LocalePicker', () => {
  let component: LocalePicker;
  let fixture: ComponentFixture<LocalePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
