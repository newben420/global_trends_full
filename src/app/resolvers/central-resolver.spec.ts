import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { centralResolver } from './central-resolver';

describe('centralResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => centralResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
