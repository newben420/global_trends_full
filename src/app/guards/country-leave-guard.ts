import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Countries } from '../services/countries';

export const countryLeaveGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const ct = inject(Countries);
  ct.removeActiveCountry();
  return true;
};
