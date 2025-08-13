import { timeBoundaries } from './time_boundaries';
import { countryCodes } from './../model/countries';
import { Request, Response } from "express";
import { Site } from "../site";
import { getDateString } from "./general";

const staticDate = "2025-07-17";

const cf = {
  a: "always",
  h: "hourly",
  d: "daily",
  w: "weekly",
  m: "monthly",
  y: "yealy",
  n: "never"
}
const base = Site.URL();

const p = {
  home: "1.0",
  article: "0.9",
  static: "0.7",
  low: "0.5"
}

const sitemapPre: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${getDateString()}</lastmod>
    <changefreq>${cf.d}</changefreq>
    <priority>${p.article}</priority>
  </url>
  `;

const sitemapPost: string = `
  <url>
    <loc>${base}/terms-of-use</loc>
    <lastmod>${staticDate}</lastmod>
    <changefreq>${cf.m}</changefreq>
    <priority>${p.low}</priority>
  </url>
  <url>
    <loc>${base}/privacy-policy</loc>
    <lastmod>${staticDate}</lastmod>
    <changefreq>${cf.m}</changefreq>
    <priority>${p.low}</priority>
  </url>
</urlset>
`;

const makeURL = (loc: string, lastmod: string, changefreq: string, priority: string): string => {
  return `
  <url>
    <loc>${base}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
  `;
}

export const generateSitemap = (req: Request, res: Response) => {
  res.contentType("application/xml");
  const {start} = timeBoundaries(Date.now(), "day");
  let urls: string[] = [];
  for(const code of countryCodes.filter(x => x != "XX")){
    urls.push(makeURL(`/${code.toLowerCase()}`, getDateString(start), cf.a, p.home));
  }
  res.send(sitemapPre + (urls.join("\n")) + sitemapPost);
}
