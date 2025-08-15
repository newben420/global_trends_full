import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class UniversalTranslateLoader implements TranslateLoader {
    private cache: Record<string, any> = {};

    constructor(private http: HttpClient) { }

    getTranslation(lang: string): Observable<any> {
        if (typeof window === 'undefined' || !window) {
            // Server-side: try multiple possible locations
            const fs = require('fs');
            const path = require('path');

            if (!this.cache[lang]) {
                const tryPaths = [
                    path.join(process.cwd(), 'public/i18n', `${lang}.json`),
                    path.join(process.cwd(), 'dist/browser/i18n', `${lang}.json`),
                    path.join(process.cwd(), 'browser/i18n', `${lang}.json`),
                ];

                let data: string | null = null;
                for (const filePath of tryPaths) {
                    if (fs.existsSync(filePath)) {
                        data = fs.readFileSync(filePath, 'utf8');
                        break;
                    }
                }

                if (!data) {
                    throw new Error(`Translation file for lang "${lang}" not found in any expected paths`);
                }

                this.cache[lang] = JSON.parse(data);
            }

            return of(this.cache[lang]);
        } else {
            // Browser: fetch normally
            return this.http.get(`/i18n/${lang}.json`);
        }
    }
}