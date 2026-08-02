import { SITE } from './site';
import { LOCALES } from './ui';

/**
 * Generate hreflang alternate link objects for a given path.
 * @param path - The canonical path WITHOUT any locale prefix, e.g. "/about/",
 *   "/page/2/" or "/". This helper adds the prefix itself, so passing an
 *   already-prefixed path such as "/fr/page/2/" yields "/es/fr/page/2/", which
 *   points at a page that does not exist.
 */
export function hreflangAlternates(path: string) {
  // EN lives at the root; every other locale is prefixed with /<lang>.
  const hrefFor = (lang: string) => {
    const base = lang === 'en' ? '' : `/${lang}`;
    const url = `${SITE.url}${base}${path === '/' ? '/' : path}`;
    // The site canonicalises with a trailing slash. Google treats "/fr" and
    // "/fr/" as two different URLs, so an alternate that drops the slash no
    // longer matches the canonical it is supposed to designate.
    return url.endsWith('/') ? url : `${url}/`;
  };
  return [
    { lang: 'x-default', href: hrefFor('en') },
    ...LOCALES.map((lang) => ({ lang, href: hrefFor(lang) })),
  ];
}
