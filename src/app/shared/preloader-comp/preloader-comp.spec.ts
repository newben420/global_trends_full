import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderComp } from './preloader-comp';

describe('PreloaderComp', () => {
  let component: PreloaderComp;
  let fixture: ComponentFixture<PreloaderComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreloaderComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreloaderComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
