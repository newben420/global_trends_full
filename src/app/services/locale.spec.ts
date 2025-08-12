import { TestBed } from '@angular/core/testing';

import { Locale } from './locale';

describe('Locale', () => {
  let service: Locale;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Locale);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
