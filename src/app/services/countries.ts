import { inject, Injectable, signal } from '@angular/core';
import { countryCodes, countryCodesMap, countryFlagsMap } from '../../../serve/model/countries';
import { UICountry } from '../model/uiCountry';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class Countries {
  private allCountries = signal<UICountry[]>(countryCodes.filter(x => x != "XX").map(code => ({
    code,
    name: countryCodesMap[code],
    flag: countryFlagsMap[code],
  })).sort((a, b) => {
    return a.name.localeCompare(b.name);
  }));

  all = this.allCountries.asReadonly();

  private store = inject(Store);
  private storeKey = "country";

  private activeC = signal<UICountry>({ code: '', flag: '', name: '', isActive: true });

  activeCountry = this.activeC.asReadonly();

  setActiveCountry(code: string) {
    code = code.toUpperCase();
    if (this.allCodes.includes(code)) {
      // this.store.set(this.storeKey, code);
      this.activeC.set({
        code: code,
        flag: countryFlagsMap[code],
        name: countryCodesMap[code],
        isActive: true,
      });
      this.allCountries.set(countryCodes.filter(x => x != "XX").map(c => ({
        code: c,
        name: countryCodesMap[c],
        flag: countryFlagsMap[c],
        isActive: code == c,
      })).sort((a, b) => {
        // Sort by isActive: true first
        if (a.isActive === b.isActive) {
          // If both have same isActive status, sort by name ascending
          return a.name.localeCompare(b.name);
        }
        // Otherwise, true comes first
        return (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0);
      }));
    }
  }

  removeActiveCountry() {
    this.activeC.set({
      code: '',
      flag: '',
      name: '',
      isActive: true,
    });
    this.allCountries.set(countryCodes.filter(x => x != "XX").map(c => ({
      code: c,
      name: countryCodesMap[c],
      flag: countryFlagsMap[c],
      isActive: false,
    })).sort((a, b) => {
      return a.name.localeCompare(b.name);
    }));
    // this.store.delete(this.storeKey);
  }

  allCodes = [...countryCodes];
}
