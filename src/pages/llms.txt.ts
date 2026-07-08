import type { APIContext } from 'astro';
import { getEnArticles, groupBySection, articleUrl } from '../lib/llms-sections';

const HEADER = `# maddoktor2.com - LLM context file

> Independent, practical guides to malware removal, anti-spyware, and PC security & privacy for everyday Windows users.

## Site mission
MadDoktor2 helps ordinary people clean up and secure infected Windows PCs: removing malware, spyware, adware and browser hijackers, understanding ransomware, and adopting the everyday habits that keep a machine clean. Plain English, honest, and free of fearmongering. Every guide says what a method does, what it does not do, and when a free built-in tool is the right answer.

## Honesty & independence
- This is an independent reconstruction. maddoktor2.com historically hosted a malware-removal help resource; this site is NOT a continuation of that old forum or community and makes no claim to be. See /heritage/.
- We never fabricate test results, statistics, benchmarks, awards or user numbers. Cited claims come from named, checkable sources.
- No fearmongering: we explain how likely a threat really is and what genuinely helps.
- Content is available in six languages: English (/articles/...), French (/fr/articles/...), Spanish (/es/articles/...), German (/de/articles/...), Italian (/it/articles/...) and Portuguese (/pt/articles/...). URLs below are the English defaults.

## Full content
- /llms-full.txt - every guide with its description, in all six languages.

## Interactive tools
- /file-hash-checker/ - free file hash checker that computes SHA-256, SHA-1 and SHA-512 entirely in the browser (the file never leaves the device), to look up a suspicious file in malware databases such as VirusTotal. Available in six languages.

## Topic categories
- /c/malware-removal/ - removing viruses, trojans, worms, rootkits and browser hijackers from Windows
- /c/ransomware/ - how ransomware works, the warning signs, decryptors, backups and recovery
- /c/spyware-adware/ - spyware, adware, stalkerware, keyloggers and browser hijackers
- /c/antivirus/ - antivirus and removal tools, built-in Microsoft Defender, second-opinion scanners
- /c/windows-security/ - Windows hardening, firewall, updates and account protection
- /c/privacy/ - phishing, passwords, 2FA, private browsing and everyday PC privacy
`;

const FOOTER = `
## Editorial policy
- We do not fabricate; honesty is a hard rule (see /charter/)
- Free and built-in tools are recommended when they solve the problem
- Affiliate links are limited to Proton (Mail/VPN/Pass/Drive), marked rel=sponsored nofollow, and never influence a recommendation (see /affiliate-disclosure/)
- Every guide includes an explicit limitations section
`;

export async function GET(_context: APIContext) {
  const articles = await getEnArticles();
  const groups = groupBySection(articles);

  const body = groups
    .map((g) => {
      const lines = g.items
        .map((a) => `- ${articleUrl(a.id, 'en')} - ${a.title}`)
        .join('\n');
      return `## ${g.title}\n${lines}`;
    })
    .join('\n\n');

  const text = `${HEADER}\n${body}\n${FOOTER}`;
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
