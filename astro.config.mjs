import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * rehypeImageFigures — inline, dependency-free.
 * In Markdown/MDX, `![caption](url)` on its own line renders as a bare <img>
 * with no visible caption. This plugin finds any <p> whose only meaningful
 * child is a single <img>, and rewraps it as:
 *   <figure class="md-figure"><img …/><figcaption>{alt}</figcaption></figure>
 * The caption text comes from the image alt (so the 2nd image's descriptive
 * legend becomes visible). It ONLY touches paragraphs that wrap a lone image —
 * any paragraph mixing text + image, or already a <figure>, is left untouched,
 * so it can never break the build on normal prose.
 */
function rehypeImageFigures() {
  const isMeaningful = (node) =>
    !(node.type === 'text' && /^\s*$/.test(node.value));

  return (tree) => {
    const visit = (node) => {
      if (!node || !Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (
          child &&
          child.type === 'element' &&
          child.tagName === 'p'
        ) {
          const meaningful = (child.children || []).filter(isMeaningful);
          if (
            meaningful.length === 1 &&
            meaningful[0].type === 'element' &&
            meaningful[0].tagName === 'img'
          ) {
            const img = meaningful[0];
            const alt = (img.properties && img.properties.alt) || '';
            const figureChildren = [img];
            if (alt && String(alt).trim()) {
              figureChildren.push({
                type: 'element',
                tagName: 'figcaption',
                properties: {},
                children: [{ type: 'text', value: String(alt) }],
              });
            }
            node.children[i] = {
              type: 'element',
              tagName: 'figure',
              properties: { className: ['md-figure'] },
              children: figureChildren,
            };
            continue;
          }
        }
        visit(child);
      }
    };
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://maddoktor2.com',
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'de', 'it', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    rehypePlugins: [rehypeImageFigures],
  },
  integrations: [
    mdx({ rehypePlugins: [rehypeImageFigures] }),
    sitemap({
      filter: (page) => !page.includes('/go/'),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          fr: 'fr-FR',
          es: 'es-ES',
          de: 'de-DE',
          it: 'it-IT',
          pt: 'pt-PT',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory',
    // CSS inline : supprime la stylesheet render-blocking (1 RTT 4G ≈ -0.8s LCP simulé)
    inlineStylesheets: 'always',
  },
});
