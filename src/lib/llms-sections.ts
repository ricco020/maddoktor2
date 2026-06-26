import { getCollection } from 'astro:content';

/**
 * Tag-driven categorisation for the llms.txt / llms-full.txt LLM context files.
 * Each article is placed in the FIRST section whose tag-set it matches.
 * Keeps the listing dynamic: any new article (with sensible tags) is grouped
 * automatically, and the catch-all "More guides" section ensures nothing is dropped.
 */
export const SECTIONS: { title: string; tags: string[] }[] = [
  { title: 'Malware removal', tags: ['malware-removal', 'trojan', 'virus', 'rootkit', 'worm', 'diagnosis', 'mac', 'macos', 'apple'] },
  { title: 'Ransomware', tags: ['ransomware', 'backup'] },
  { title: 'Spyware, adware & browser hijackers', tags: ['spyware-adware', 'spyware', 'adware', 'browser-hijack', 'hijacker', 'pup', 'keylogger', 'stalkerware'] },
  { title: 'Antivirus & removal tools', tags: ['antivirus', 'scanner', 'defender', 'windows-defender', 'tool', 'malware-protection'] },
  { title: 'Windows & PC security', tags: ['windows-security', 'windows', 'firewall', 'hardening', 'updates'] },
  { title: 'Privacy & everyday safety', tags: ['privacy', 'phishing', 'passwords', '2fa', 'online-safety', 'browser'] },
];

export type LlmsArticle = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  pubDate: Date;
  updatedDate?: Date;
};

/** EN article URL: /articles/<id>/ ; other locales: /<locale>/articles/<id>/ */
export function articleUrl(id: string, locale: string): string {
  return locale === 'en' ? `/articles/${id}/` : `/${locale}/articles/${id}/`;
}

export async function getEnArticles(): Promise<LlmsArticle[]> {
  const entries = await getCollection('articles');
  return entries.map((e) => ({
    id: e.id,
    title: e.data.title,
    description: e.data.description,
    tags: e.data.tags ?? [],
    pubDate: e.data.pubDate,
    updatedDate: e.data.updatedDate,
  }));
}

/** Group EN articles into sections (first matching section wins; catch-all last). */
export function groupBySection(articles: LlmsArticle[]): { title: string; items: LlmsArticle[] }[] {
  const placed = new Set<string>();
  const grouped = SECTIONS.map((section) => {
    const items = articles
      .filter((a) => !placed.has(a.id) && a.tags.some((t) => section.tags.includes(t)))
      .sort((a, b) => a.title.localeCompare(b.title));
    items.forEach((a) => placed.add(a.id));
    return { title: section.title, items };
  }).filter((g) => g.items.length > 0);

  const leftovers = articles
    .filter((a) => !placed.has(a.id))
    .sort((a, b) => a.title.localeCompare(b.title));
  if (leftovers.length > 0) {
    grouped.push({ title: 'More guides', items: leftovers });
  }
  return grouped;
}
