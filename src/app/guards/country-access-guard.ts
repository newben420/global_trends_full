import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Countries } from '../services/countries';

export const countryAccessGuard: CanActivateFn = (route, state) => {
  const ct = inject(Countries);
  const router = inject(Router);
  const code: string = route.params['code'] || '';
  if (/^[a-zA-Z]{2}$/.test(code) && ct.allCodes.includes(code.toUpperCase())) {
    ct.setActiveCountry(code);
    return true;
  }
  else{
    router.navigate(['/live']);
    return false;
  }
};
