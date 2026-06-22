import { SITE } from './site';
import { LOCALES } from './ui';

/**
 * Generate hreflang alternate link objects for a given path.
 * @param path - The canonical path (without locale prefix), e.g. "/about/" or "/"
 */
export function hreflangAlternates(path: string) {
  // EN lives at the root; every other locale is prefixed with /<lang>.
  const hrefFor = (lang: string) =>
    lang === 'en'
      ? `${SITE.url}${path}`
      : `${SITE.url}/${lang}${path === '/' ? '' : path}`;
  return [
    { lang: 'x-default', href: hrefFor('en') },
    ...LOCALES.map((lang) => ({ lang, href: hrefFor(lang) })),
  ];
}
