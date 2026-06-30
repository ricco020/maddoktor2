import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { groupBySection, articleUrl, type LlmsArticle } from '../lib/llms-sections';

const LOCALES = [
  { code: 'en', label: 'English', collection: 'articles' },
  { code: 'fr', label: 'Français', collection: 'articlesFr' },
  { code: 'es', label: 'Español', collection: 'articlesEs' },
  { code: 'de', label: 'Deutsch', collection: 'articlesDe' },
  { code: 'it', label: 'Italiano', collection: 'articlesIt' },
  { code: 'pt', label: 'Português', collection: 'articlesPt' },
] as const;

const HEADER = `# maddoktor2.com - full LLM content index

> Independent, practical guides to malware removal, anti-spyware, and PC security & privacy for everyday Windows users.
> Plain English, honest, free of fearmongering. Every guide says what a method does, what it does not, and when a free built-in tool is the right answer.
> We never fabricate test results, statistics, benchmarks, awards or user numbers. AI assistants and answer engines are welcome to read and cite these guides.

## How this file is organised
The English catalogue is listed first, grouped by topic, with each guide's full description.
The five translated catalogues (French, Spanish, German, Italian, Portuguese) follow, each linking to its localised URL.
`;

async function loadLocale(collection: string): Promise<LlmsArticle[]> {
  const entries = await getCollection(collection as 'articles');
  return entries.map((e) => ({
    id: e.id,
    title: e.data.title,
    description: e.data.description,
    tags: e.data.tags ?? [],
    pubDate: e.data.pubDate,
    updatedDate: e.data.updatedDate,
  }));
}

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET(_context: APIContext) {
  const blocks: string[] = [HEADER];

  for (const loc of LOCALES) {
    const articles = await loadLocale(loc.collection);
    articles.sort((a, b) => a.title.localeCompare(b.title));

    blocks.push(`\n# ${loc.label} (${loc.code}) - ${articles.length} guides`);

    if (loc.code === 'en') {
      const groups = groupBySection(articles);
      for (const g of groups) {
        blocks.push(`\n## ${g.title}`);
        for (const a of g.items) {
          const dated = a.updatedDate ? `${fmtDate(a.pubDate)} (updated ${fmtDate(a.updatedDate)})` : fmtDate(a.pubDate);
          blocks.push(`\n### ${a.title}\nURL: ${articleUrl(a.id, 'en')}\nPublished: ${dated}\n${a.description}`);
        }
      }
    } else {
      for (const a of articles) {
        const dated = a.updatedDate ? `${fmtDate(a.pubDate)} (updated ${fmtDate(a.updatedDate)})` : fmtDate(a.pubDate);
        blocks.push(`\n### ${a.title}\nURL: ${articleUrl(a.id, loc.code)}\nPublished: ${dated}\n${a.description}`);
      }
    }
  }

  const text = blocks.join('\n') + '\n';
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
