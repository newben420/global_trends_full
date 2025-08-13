import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleHero } from './simple-hero';

describe('SimpleHero', () => {
  let component: SimpleHero;
  let fixture: ComponentFixture<SimpleHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
