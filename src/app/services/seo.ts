import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DOCUMENT, Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface Config {
  title: string;
  desc: string;
  keywords?: string;
  canonical?: string;
  schema?: any;
  author?: string;
  url: string;
  image: string,
  noIndex?: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class SEO {
  private isBrowser: boolean;
  private isServer: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  private setCanonicalURL(url: string): void {
    const head = this.isServer ? this.document.head : this.document.head;
    let link = head.querySelector("link[rel='canonical']");
    if (head) {
      if (link) {
        link.setAttribute('href', url);
      } else {
        link = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);
        head.appendChild(link);
      }
    }
  }

  private setSchema(schema: any) {
    const body = this.isServer ? this.document.body : this.document.body;
    let sch = body.querySelector("script[type='application/ld+json'][data-type='schema']")
    if (!sch) {
      sch = this.document.createElement('script');
      sch.setAttribute('type', 'application/ld+json');
      sch.setAttribute('data-type', 'schema');
      sch.innerHTML = JSON.stringify(schema, null, "\t");
      body.appendChild(sch);
    }
  }

  run({
    desc,
    keywords,
    title,
    canonical,
    schema,
    author,
    url,
    image,
    noIndex,
  }: Config) {
    this.metaService.removeTag("name=robots");
    this.titleService.setTitle(title);
    let metaTags: any[] = [];
    metaTags.push({ name: 'description', content: desc });
    metaTags.push({ name: 'keywords', content: keywords },);
    if (author) {
      metaTags.push({ name: 'author', content: author });
    }
    metaTags.push({ property: 'og:description', content: desc });
    metaTags.push({ property: 'og:title', content: title });
    metaTags.push({ property: 'og:url', content: url });
    metaTags.push({ property: 'og:type', content: `website` });
    metaTags.push({ property: 'og:image', content: image });
    metaTags.push({ name: 'twitter:card', content: "summary" });
    metaTags.push({ name: 'twitter:title', content: title });
    metaTags.push({ name: 'twitter:description', content: desc });
    metaTags.push({ name: 'twitter:image', content: image });
    metaTags.push({ name: 'mobile-web-app-capable', content: "yes" });
    metaTags.push({ name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' });
    this.metaService.addTags(metaTags);
    if (canonical) {
      this.setCanonicalURL(canonical);
    }

    if (schema) {
      this.setSchema(schema);
    }
  }
}
