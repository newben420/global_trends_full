import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { countryLeaveGuard } from './country-leave-guard';

describe('countryLeaveGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => countryLeaveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
