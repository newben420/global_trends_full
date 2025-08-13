import { Component, Inject, inject, makeStateKey, PLATFORM_ID, REQUEST_CONTEXT, signal, TransferState } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Dashside } from '../../services/dashside';
import { Locale } from '../../services/locale';
import { SEO } from '../../services/seo';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-empty-dashboard',
  imports: [
    SharedModule,
  ],
  templateUrl: './empty-dashboard.html',
  styleUrl: './empty-dashboard.scss'
})
export class EmptyDashboard {
  private request = inject(REQUEST_CONTEXT);
  metadata = signal<any>({});
  private metaKey = makeStateKey<any>('meta_ts');
  constructor(
    public side: Dashside,
    @Inject(PLATFORM_ID) private platformId: Object,
    private state: TransferState,
    private locale: Locale,
    private seo: SEO,
  ){
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
    const url = this.metadata().url + `/live`;
    const image = `${this.metadata().url}/img/banner.png`;
    const logo = `${this.metadata().url}/img/icon.webp`;
    this.locale.waiter([
      "META.LIVE.TITLE",
      "META.LIVE.DESC",
      "META.HOME.KEYWORDS",
    ], [
      { brand },
      { brand },
      { brand },
    ]).then(([title, desc, keywords]) => {
      this.seo.run({
        title,
        desc,
        author: brand,
        keywords,
        canonical: url,
        url,
        image,
        schema: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": url,
          "name": brand,
          "description": title,
          "image": image,
          "keywords": keywords,
          "publisher": {
            "@type": "Organization",
            "name": brand,
            "logo": {
              "@type": "ImageObject",
              "url": logo,
            }
          }
        }
      });
    });
  }
}
