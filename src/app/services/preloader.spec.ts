import { TestBed } from '@angular/core/testing';

import { Preloader } from './preloader';

describe('Preloader', () => {
  let service: Preloader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Preloader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
