import { inject, provideAppInitializer } from '@angular/core';
import { Store } from './services/store';
import { TranslateService } from '@ngx-translate/core';
import { Theme } from './services/theme';
import { LOCALES } from './locales';

export const initApp = provideAppInitializer(async () => {
    const store = inject(Store);
    const theme = inject(Theme);
    const translate = inject(TranslateService);
    theme.loadSet();
    translate.addLangs(LOCALES);
    const loc = await store.get("locale");
    if (loc && translate.getLangs().indexOf(loc) !== -1) {
        translate.use(loc);
    }
    else {
        translate.use(LOCALES[0]);
    }
    return;
});