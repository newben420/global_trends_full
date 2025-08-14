import { CommonModule, isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';
import { Footer } from '../partials/footer/footer';
import { Header } from '../partials/header/header';
import { SimpleHero } from '../partials/simple-hero/simple-hero';
import { SharedModule } from '../shared/shared-module';
import { Locale } from '../services/locale';
import { SEO } from '../services/seo';
import { metaTrans } from '../locales';

@Component({
  selector: 'app-privacy',
  imports: [
    Header,
    Footer,
    SimpleHero,
    CommonModule,
    SharedModule,
  ],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss'
})
export class Privacy {
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
    const url = this.metadata().url + '/privacy-policy';
    const image = `${this.metadata().url}/img/banner.png`;
    const logo = `${this.metadata().url}/img/icon.webp`;
    const [title, desc, keywords] = metaTrans(this.locale.lang(), [
      "POLICY.TITLE",
      "POLICY.DESC",
      "POLICY.KEYWORDS",
    ], [
      { brand },
      { brand },
      { brand },
    ]);
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
        "@type": "PrivacyPolicy",
        "name": title,
        "url": url,
        "publisher": {
          "@type": "Organization",
          "name": brand,
        }
      }
    });
  }
}
