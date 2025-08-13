import { Component, inject, Inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';
import { Header } from "../partials/header/header";
import { Footer } from "../partials/footer/footer";
import { SimpleHero } from "../partials/simple-hero/simple-hero";
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SharedModule } from '../shared/shared-module';
import { SEO } from '../services/seo';
import { Locale } from '../services/locale';

@Component({
  selector: 'app-terms',
  imports: [
    Header,
    Footer,
    SimpleHero,
    CommonModule,
    SharedModule,
  ],
  templateUrl: './terms.html',
  styleUrl: './terms.scss'
})
export class Terms {
  private request = inject(REQUEST_CONTEXT);
  metadata = signal<any>({});
  private metaKey = makeStateKey<any>('meta_ts');
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private state: TransferState,
    private locale: Locale,
    private seo: SEO,
  ) {
    if (isPlatformServer(this.platformId)) {
      if (this.request) {
        const meta = {
          brand: (this.request as any).brand,
          top: (this.request as any).top,
          year: (this.request as any).year,
          support: (this.request as any).support,
          url: (this.request as any).url,
          email: (this.request as any).email,
        }
        this.metadata.set(meta);
        state.set(this.metaKey, meta);
      }
    }
    if (isPlatformBrowser(this.platformId)) {
      if (state.hasKey(this.metaKey)) {
        this.metadata.set(state.get(this.metaKey, {}));
      }
    }
    this.doMeta();
  }

  doMeta() {
    const brand = this.metadata().brand;
    const url = this.metadata().url + '/terms-of-use';
    const image = `${this.metadata().url}/img/banner.png`;
    const logo = `${this.metadata().url}/img/icon.webp`;
    this.locale.waiter([
      "META.TERMS.TITLE",
      "META.TERMS.DESC",
      "META.TERMS.KEYWORDS",
    ], [
      { brand },
      { brand },
      { brand },
    ]).then(([title, desc, keywords]) => {
      this.seo.run({
        title,
        desc,
        keywords,
        canonical: url,
        author: brand,
        url,
        image,
        schema: {
          "@context": "https://schema.org",
          "@type": "TermsOfService",
          "name": title,
          "url": url,
          "publisher": {
            "@type": "Organization",
            "name": brand,
          }
        }
      });
    });
  }
}
