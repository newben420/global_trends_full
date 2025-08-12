import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from './../services/store';
import { Theme } from './../services/theme';
import { TranslateService } from '@ngx-translate/core';
import { LOCALES } from './../locales';

export const centralResolver: ResolveFn<boolean> = async (route, state) => {
  const store = inject(Store);
  const theme = inject(Theme);
  const translate = inject(TranslateService);

  theme.loadSet();
  translate.addLangs(LOCALES);

  const loc = await store.get('locale');
  if (loc && translate.getLangs().includes(loc)) {
    translate.use(loc);
  } else {
    translate.use(LOCALES[0]);
  }

  return true;
};
