// Extract honest FAQ Q/A pairs from an article's own MDX body so we can emit
// FAQPage JSON-LD. We NEVER invent questions or answers: every pair below is
// read verbatim from the published article. If no FAQ section exists, returns [].
//
// Supported authoring patterns inside a "## FAQ" / "## Frequently asked
// questions" / "## Foire aux questions" / "## Preguntas frecuentes" section:
//   1.  **Q: question?**  \n  A: answer            (Q:/A: prefixed)
//   2.  ### question?      \n\n  answer paragraph   (sub-heading questions)
//   3.  **question?** answer                        (bold question, inline answer)

export interface FaqPair {
  question: string;
  answer: string;
}

const FAQ_HEADING =
  /^#{2,3}\s+(faq|frequently asked questions|foire aux questions|questions fr[ée]quentes|preguntas frecuentes|perguntas frequentes)\s*$/i;

// Strip markdown/MDX so JSON-LD carries clean plain text.
function clean(text: string): string {
  return text
    // markdown links -> link text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // inline code ticks
    .replace(/`([^`]*)`/g, '$1')
    // bold / italic markers
    .replace(/\*\*/g, '')
    .replace(/(^|\s)\*(\S[^*]*?)\*/g, '$1$2')
    // decode the MDX-safe entities back to literal chars (JSON-LD is data)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#123;/g, '{')
    .replace(/&#125;/g, '}')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractFaq(body: string | undefined): FaqPair[] {
  if (!body) return [];
  const lines = body.split('\n');

  // Locate the FAQ section and its end (next ##/### heading of same-or-higher
  // level, or a horizontal rule / end of file).
  let start = -1;
  let headingLevel = 2;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(FAQ_HEADING);
    if (m) {
      start = i + 1;
      headingLevel = lines[i].startsWith('###') ? 3 : 2;
      break;
    }
  }
  if (start === -1) return [];

  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    const l = lines[i];
    if (/^#{1,2}\s/.test(l) && !l.startsWith('#'.repeat(headingLevel) + '#')) {
      // a heading at the FAQ level or higher closes the section
      const lvl = (l.match(/^#+/) || [''])[0].length;
      if (lvl <= headingLevel) {
        end = i;
        break;
      }
    }
    if (/^---\s*$/.test(l)) {
      end = i;
      break;
    }
  }

  const section = lines.slice(start, end);
  const pairs: FaqPair[] = [];

  // Pattern 2: ### question?  then following paragraph(s) until next ###/blank-heading
  // Pattern 1: **Q: ...?** then A: ... line(s)
  // Pattern 3: **question?** answer (same line)
  let i = 0;
  while (i < section.length) {
    const line = section[i].trim();

    // Pattern 2: sub-heading question
    const h = line.match(/^###\s+(.*\S)\s*$/);
    if (h) {
      const q = clean(h[1]);
      const ans: string[] = [];
      i++;
      while (i < section.length && !/^###\s/.test(section[i].trim()) && !/^---\s*$/.test(section[i].trim())) {
        if (section[i].trim()) ans.push(section[i].trim());
        i++;
      }
      const a = clean(ans.join(' '));
      if (q.endsWith('?') && a) pairs.push({ question: q, answer: a });
      continue;
    }

    // Pattern 1: **Q: question?** / A: answer  (EN Q/A, FR Q :/R :, ES P:/R:)
    const qPrefixed = line.match(/^\*\*\s*[QP]\s*:\s*(.*?)\*\*\s*$/i);
    if (qPrefixed) {
      const q = clean(qPrefixed[1]);
      const ans: string[] = [];
      i++;
      while (i < section.length) {
        const t = section[i].trim();
        if (!t) { i++; if (ans.length) break; else continue; }
        if (/^\*\*\s*[QP]\s*:/i.test(t) || /^###\s/.test(t) || /^---\s*$/.test(t)) break;
        // strip leading answer marker: A:/R: (EN/FR/ES)
        ans.push(t.replace(/^[ARP]\s*:\s*/i, ''));
        i++;
      }
      const a = clean(ans.join(' '));
      if (q && a) pairs.push({ question: q, answer: a });
      continue;
    }

    // Pattern 3: **question?** answer (bold question, inline answer same line)
    const inline = line.match(/^\*\*(.+?\?)\*\*\s*(.*)$/);
    if (inline) {
      const q = clean(inline[1]);
      let a = inline[2].trim();
      i++;
      // answer may spill onto following non-empty, non-bold lines
      while (i < section.length) {
        const t = section[i].trim();
        if (!t) break;
        if (/^\*\*/.test(t) || /^###\s/.test(t) || /^---\s*$/.test(t) || /^\*[^*]/.test(t)) break;
        a += ' ' + t;
        i++;
      }
      a = clean(a);
      if (q && a) pairs.push({ question: q, answer: a });
      continue;
    }

    i++;
  }

  return pairs;
}
