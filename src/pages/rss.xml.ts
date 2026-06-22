import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: articles
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((a) => ({
        title: a.data.title,
        description: a.data.description,
        pubDate: a.data.pubDate,
        link: `/articles/${a.id}/`,
      })),
  });
}
