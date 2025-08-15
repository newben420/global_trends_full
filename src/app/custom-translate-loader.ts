import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

// Import your translation files
import enTranslations from '../../public/i18n/en.json';
import arTranslations from '../../public/i18n/ar.json';
import esTranslations from '../../public/i18n/es.json';
import frTranslations from '../../public/i18n/fr.json';
import hiTranslations from '../../public/i18n/hi.json';
import ptTranslations from '../../public/i18n/pt.json';
import ruTranslations from '../../public/i18n/ru.json';
import zhTranslations from '../../public/i18n/zh.json';

@Injectable()
export class JsonFileLoader implements TranslateLoader {
    private translations: { [key: string]: any } = {
        'en': enTranslations,
        'ar': arTranslations,
        'es': esTranslations,
        'fr': frTranslations,
        'hi': hiTranslations,
        'pt': ptTranslations,
        'ru': ruTranslations,
        'zh': zhTranslations,
    };

    getTranslation(lang: string): Observable<any> {
        // Return the imported translations for the requested language
        const translation = this.translations[lang];

        if (translation) {
            return of(translation);
        }

        // Fallback to empty object if language not found
        return of({});
    }
}