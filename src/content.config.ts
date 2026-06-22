import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  hero: z.string(),
  heroAlt: z.string(),
  keyword: z.string(),
  tags: z.array(z.string()).default([]),
  /** Timely/news-pegged article → emits NewsArticle schema (Google News eligibility). Defaults to evergreen Article. */
  newsArticle: z.boolean().optional(),
  /** Lie les traductions d'un même article entre locales (hreflang). */
  translationKey: z.string().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles/en' }),
  schema: articleSchema,
});

const articlesFr = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles/fr' }),
  schema: articleSchema,
});

const articlesEs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles/es' }),
  schema: articleSchema,
});

const articlesDe = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles/de' }),
  schema: articleSchema,
});

const articlesIt = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles/it' }),
  schema: articleSchema,
});

const articlesPt = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles/pt' }),
  schema: articleSchema,
});

export const collections = { articles, articlesFr, articlesEs, articlesDe, articlesIt, articlesPt };
