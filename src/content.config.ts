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
  /**
   * Real products/tools actually compared in this article → emits an honest
   * ItemList of SoftwareApplication (GEO / agentic-commerce, pilier #2 LLM).
   * STRICT HONESTY: list ONLY tools genuinely named in the body. NO ratings,
   * NO invented prices. `price: 0` only for tools that are really free; omit
   * `price` when the price is paid/variable/uncertain (never fabricate a number).
   * `url` = the vendor's own official page (never our affiliate link).
   */
  products: z
    .array(
      z.object({
        name: z.string(),
        /** Real vendor/brand (e.g. "Microsoft", "Malwarebytes"). Never "MadDoktor2". */
        brand: z.string().optional(),
        /** One-line factual descriptor of what the tool is (from the article). */
        description: z.string().optional(),
        /** schema.org applicationCategory. Defaults to SecurityApplication. */
        category: z.string().optional(),
        /** Operating system(s), e.g. "Windows", "Windows, macOS". */
        os: z.string().optional(),
        /** Vendor's official URL. */
        url: z.string().optional(),
        /** 0 for genuinely-free tools; omit for paid/variable (no fabrication). */
        price: z.number().optional(),
      })
    )
    .optional(),
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
