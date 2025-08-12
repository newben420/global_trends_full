import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleSwitch } from './locale-switch';

describe('LocaleSwitch', () => {
  let component: LocaleSwitch;
  let fixture: ComponentFixture<LocaleSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocaleSwitch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocaleSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
