import { TestBed } from '@angular/core/testing';

import { Dashside } from './dashside';

describe('Dashside', () => {
  let service: Dashside;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dashside);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
