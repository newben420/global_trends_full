import { TestBed } from '@angular/core/testing';

import { Connected } from './connected';

describe('Connected', () => {
  let service: Connected;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Connected);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
