// UI strings for the six locales. EN lives at the root; the others at /fr, /es, /de, /it, /pt.
// MadDoktor2 - malware removal, anti-spyware & PC security/privacy guides.
export const LOCALES = ['en', 'fr', 'es', 'de', 'it', 'pt'] as const;
export type Lang = (typeof LOCALES)[number];

/** Prefix a root-relative path for a locale ('' for en). */
export function localized(path: string, lang: string): string {
  if (lang === 'en') return path;
  return '/' + lang + path;
}

type Strings = Record<string, string>;

export const ui: Record<string, Strings> = {
  en: {
    search_ph: 'Search guides…',
    search_h1: 'Search the guides',
    search_ph2: 'Search malware removal, ransomware, spyware…',
    search_k: 'Search',
    all_guides: 'All guides',
    nav_guides: 'Guides', nav_tools: 'Tools', nav_charter: 'Charter', nav_heritage: 'Heritage', nav_about: 'About',
    crumb_home: 'Home', updated: 'Updated',
    category: 'Category',
    other_topics: 'Other topics',
    browse_topic: 'Browse by topic',
    popular: 'Popular guides',
    keep_reading: 'Keep reading',
    start_here: 'New to cleaning up an infected PC? Start here',
    reco: 'Recommended',
    wrote: 'wrote',
    read_more: 'Read more…',    min_read: 'min read',
    on_this_page: 'On this page',
    aff_h: 'Private, secure email after a cleanup',
    aff_p: 'Once your PC is clean, lock down your accounts. Proton Mail (Swiss, end-to-end encrypted, open-source apps) keeps your inbox private - a sensible step after dealing with spyware or a phishing compromise.',
    aff_cta: 'See Proton Mail →',
    art_aff_h: 'Lock down your accounts too',
    art_aff_p: 'Removing the malware is step one - securing the accounts it may have touched is step two. Proton Mail (Swiss, encrypted, audited) gives you a private inbox with strong account protection.',
    aff_disc: 'Affiliate link - supports these free guides.',
    cookie: 'We use a privacy-friendly analytics cookie (anonymised IP) only if you accept. See our',
    cookie_policy: 'privacy policy',
    cookie_accept: 'Accept',
    cookie_decline: 'Decline',
    no_result: 'No guide matches your search.',
    browse_all: 'Browse all guides →',
  },
  fr: {
    search_ph: 'Rechercher un guide…',
    search_h1: 'Rechercher dans les guides',
    search_ph2: 'Rechercher suppression de malware, rançongiciel, spyware…',
    search_k: 'Recherche',
    all_guides: 'Tous les guides',
    nav_guides: 'Guides', nav_tools: 'Outils', nav_charter: 'Charte', nav_heritage: 'Héritage', nav_about: 'À propos',
    crumb_home: 'Accueil', updated: 'Mis à jour',
    category: 'Catégorie',
    other_topics: 'Autres thèmes',
    browse_topic: 'Parcourir par thème',
    popular: 'Guides populaires',
    keep_reading: 'À lire ensuite',
    start_here: 'Nouveau dans le nettoyage d’un PC infecté ? Commencez ici',
    reco: 'Recommandé',
    wrote: 'a écrit',
    read_more: 'Lire la suite…',    min_read: 'min de lecture',
    on_this_page: 'Sur cette page',
    aff_h: 'Une messagerie privée et sécurisée après un nettoyage',
    aff_p: 'Une fois votre PC nettoyé, verrouillez vos comptes. Proton Mail (suisse, chiffré de bout en bout, apps open-source) garde votre boîte mail privée - une étape sensée après un spyware ou un phishing.',
    aff_cta: 'Voir Proton Mail →',
    art_aff_h: 'Verrouillez aussi vos comptes',
    art_aff_p: 'Supprimer le malware est la première étape - sécuriser les comptes qu’il a pu toucher est la seconde. Proton Mail (suisse, chiffré, audité) vous offre une boîte mail privée avec une protection de compte solide.',
    aff_disc: 'Lien affilié - soutient ces guides gratuits.',
    cookie: 'Nous utilisons un cookie d’analyse respectueux de la vie privée (IP anonymisée) uniquement si vous acceptez. Voir notre',
    cookie_policy: 'politique de confidentialité',
    cookie_accept: 'Accepter',
    cookie_decline: 'Refuser',
    no_result: 'Aucun guide ne correspond à votre recherche.',
    browse_all: 'Voir tous les guides →',
  },
  es: {
    search_ph: 'Buscar una guía…',
    search_h1: 'Buscar en las guías',
    search_ph2: 'Buscar eliminación de malware, ransomware, spyware…',
    search_k: 'Búsqueda',
    all_guides: 'Todas las guías',
    nav_guides: 'Guías', nav_tools: 'Herramientas', nav_charter: 'Carta', nav_heritage: 'Legado', nav_about: 'Acerca de',
    crumb_home: 'Inicio', updated: 'Actualizado',
    category: 'Categoría',
    other_topics: 'Otros temas',
    browse_topic: 'Explorar por tema',
    popular: 'Guías populares',
    keep_reading: 'Sigue leyendo',
    start_here: '¿Nuevo limpiando un PC infectado? Empieza aquí',
    reco: 'Recomendado',
    wrote: 'escribió',
    read_more: 'Leer más…',    min_read: 'min de lectura',
    on_this_page: 'En esta página',
    aff_h: 'Correo privado y seguro tras una limpieza',
    aff_p: 'Cuando tu PC esté limpio, protege tus cuentas. Proton Mail (suizo, cifrado de extremo a extremo, apps de código abierto) mantiene tu bandeja privada - un paso sensato tras un spyware o un phishing.',
    aff_cta: 'Ver Proton Mail →',
    art_aff_h: 'Protege también tus cuentas',
    art_aff_p: 'Eliminar el malware es el primer paso - asegurar las cuentas que pudo tocar es el segundo. Proton Mail (suizo, cifrado, auditado) te da una bandeja privada con protección de cuenta sólida.',
    aff_disc: 'Enlace de afiliado - apoya estas guías gratuitas.',
    cookie: 'Usamos una cookie de analítica respetuosa con la privacidad (IP anonimizada) solo si la aceptas. Consulta nuestra',
    cookie_policy: 'política de privacidad',
    cookie_accept: 'Aceptar',
    cookie_decline: 'Rechazar',
    no_result: 'Ninguna guía coincide con tu búsqueda.',
    browse_all: 'Ver todas las guías →',
  },
  de: {
    search_ph: 'Anleitungen durchsuchen…',
    search_h1: 'Anleitungen durchsuchen',
    search_ph2: 'Malware-Entfernung, Ransomware, Spyware suchen…',
    search_k: 'Suche',
    all_guides: 'Alle Anleitungen',
    nav_guides: 'Anleitungen', nav_tools: 'Tools', nav_charter: 'Charta', nav_heritage: 'Geschichte', nav_about: 'Über uns',
    crumb_home: 'Start', updated: 'Aktualisiert',
    category: 'Kategorie',
    other_topics: 'Weitere Themen',
    browse_topic: 'Nach Thema stöbern',
    popular: 'Beliebte Anleitungen',
    keep_reading: 'Weiterlesen',
    start_here: 'Neu beim Bereinigen eines infizierten PCs? Hier starten',
    reco: 'Empfohlen',
    wrote: 'schrieb',
    read_more: 'Mehr lesen…',    min_read: 'Min. Lesezeit',
    on_this_page: 'Auf dieser Seite',
    aff_h: 'Private, sichere E-Mail nach der Bereinigung',
    aff_p: 'Sobald Ihr PC sauber ist, sichern Sie Ihre Konten. Proton Mail (Schweiz, Ende-zu-Ende-verschlüsselt, Open-Source-Apps) hält Ihren Posteingang privat - ein sinnvoller Schritt nach Spyware oder einem Phishing-Vorfall.',
    aff_cta: 'Proton Mail ansehen →',
    art_aff_h: 'Sichern Sie auch Ihre Konten',
    art_aff_p: 'Die Malware zu entfernen ist Schritt eins - die Konten zu sichern, die sie berührt haben könnte, ist Schritt zwei. Proton Mail (Schweiz, verschlüsselt, geprüft) bietet Ihnen einen privaten Posteingang mit starkem Kontoschutz.',
    aff_disc: 'Affiliate-Link - unterstützt diese kostenlosen Anleitungen.',
    cookie: 'Wir verwenden nur mit Ihrer Zustimmung ein datenschutzfreundliches Analyse-Cookie (anonymisierte IP). Siehe unsere',
    cookie_policy: 'Datenschutzerklärung',
    cookie_accept: 'Akzeptieren',
    cookie_decline: 'Ablehnen',
    no_result: 'Keine Anleitung passt zu Ihrer Suche.',
    browse_all: 'Alle Anleitungen ansehen →',
  },
  it: {
    search_ph: 'Cerca una guida…',
    search_h1: 'Cerca nelle guide',
    search_ph2: 'Cerca rimozione malware, ransomware, spyware…',
    search_k: 'Cerca',
    all_guides: 'Tutte le guide',
    nav_guides: 'Guide', nav_tools: 'Strumenti', nav_charter: 'Statuto', nav_heritage: 'Storia', nav_about: 'Chi siamo',
    crumb_home: 'Home', updated: 'Aggiornato',
    category: 'Categoria',
    other_topics: 'Altri argomenti',
    browse_topic: 'Sfoglia per argomento',
    popular: 'Guide popolari',
    keep_reading: 'Continua a leggere',
    start_here: 'Nuovo nel ripulire un PC infetto? Inizia qui',
    reco: 'Consigliato',
    wrote: 'ha scritto',
    read_more: 'Leggi di più…',    min_read: 'min di lettura',
    on_this_page: 'In questa pagina',
    aff_h: 'Email privata e sicura dopo una pulizia',
    aff_p: 'Una volta pulito il PC, blocca i tuoi account. Proton Mail (svizzero, crittografato end-to-end, app open-source) mantiene privata la tua casella - un passo sensato dopo uno spyware o un phishing.',
    aff_cta: 'Vedi Proton Mail →',
    art_aff_h: 'Proteggi anche i tuoi account',
    art_aff_p: 'Rimuovere il malware è il primo passo - mettere in sicurezza gli account che potrebbe aver toccato è il secondo. Proton Mail (svizzero, crittografato, verificato) ti offre una casella privata con una solida protezione dell’account.',
    aff_disc: 'Link di affiliazione - sostiene queste guide gratuite.',
    cookie: 'Usiamo un cookie di analisi rispettoso della privacy (IP anonimizzato) solo se lo accetti. Consulta la nostra',
    cookie_policy: 'informativa sulla privacy',
    cookie_accept: 'Accetta',
    cookie_decline: 'Rifiuta',
    no_result: 'Nessuna guida corrisponde alla tua ricerca.',
    browse_all: 'Vedi tutte le guide →',
  },
  pt: {
    search_ph: 'Pesquisar um guia…',
    search_h1: 'Pesquisar nos guias',
    search_ph2: 'Pesquisar remoção de malware, ransomware, spyware…',
    search_k: 'Pesquisar',
    all_guides: 'Todos os guias',
    nav_guides: 'Guias', nav_tools: 'Ferramentas', nav_charter: 'Carta', nav_heritage: 'História', nav_about: 'Sobre',
    crumb_home: 'Início', updated: 'Atualizado',
    category: 'Categoria',
    other_topics: 'Outros temas',
    browse_topic: 'Navegar por tema',
    popular: 'Guias populares',
    keep_reading: 'Continuar a ler',
    start_here: 'Novo na limpeza de um PC infetado? Comece aqui',
    reco: 'Recomendado',
    wrote: 'escreveu',
    read_more: 'Ler mais…',    min_read: 'min de leitura',
    on_this_page: 'Nesta página',
    aff_h: 'E-mail privado e seguro após uma limpeza',
    aff_p: 'Depois de o seu PC estar limpo, proteja as suas contas. O Proton Mail (suíço, encriptado de ponta a ponta, apps de código aberto) mantém a sua caixa de entrada privada - um passo sensato após um spyware ou um phishing.',
    aff_cta: 'Ver Proton Mail →',
    art_aff_h: 'Proteja também as suas contas',
    art_aff_p: 'Remover o malware é o primeiro passo - proteger as contas que ele possa ter tocado é o segundo. O Proton Mail (suíço, encriptado, auditado) dá-lhe uma caixa de entrada privada com forte proteção de conta.',
    aff_disc: 'Link de afiliado - apoia estes guias gratuitos.',
    cookie: 'Usamos um cookie de análise respeitador da privacidade (IP anonimizado) apenas se aceitar. Consulte a nossa',
    cookie_policy: 'política de privacidade',
    cookie_accept: 'Aceitar',
    cookie_decline: 'Recusar',
    no_result: 'Nenhum guia corresponde à sua pesquisa.',
    browse_all: 'Ver todos os guias →',
  },
};

// Category definitions for the catbar, the "browse by topic" chips and the
// per-category pages. SLUGS are identical across locales; only the LABEL and the
// locale prefix change. `match` is a regex (string) tested against an article's
// tags (joined, lowercased).
export interface Category {
  slug: string;
  label: string;
  label_fr: string;
  label_es: string;
  label_de: string;
  label_it: string;
  label_pt: string;
  match: string;
}

export const categories: Category[] = [
  { slug: 'malware-removal',  label: 'Malware removal',  label_fr: 'Suppression de malware', label_es: 'Eliminación de malware', label_de: 'Malware-Entfernung',  label_it: 'Rimozione malware',     label_pt: 'Remoção de malware',     match: '(malware|virus|trojan|worm|rootkit|removal|clean|infected)' },
  { slug: 'ransomware',       label: 'Ransomware',       label_fr: 'Rançongiciels',          label_es: 'Ransomware',            label_de: 'Ransomware',          label_it: 'Ransomware',            label_pt: 'Ransomware',             match: '(ransomware|encrypt-lock|extortion|decrypt)' },
  { slug: 'spyware-adware',   label: 'Spyware & adware', label_fr: 'Spyware & adware',        label_es: 'Spyware y adware',      label_de: 'Spyware & Adware',    label_it: 'Spyware e adware',      label_pt: 'Spyware e adware',       match: '(spyware|adware|stalkerware|keylogger|browser-hijack|hijacker|pup|tracking)' },
  { slug: 'antivirus',        label: 'Antivirus & tools', label_fr: 'Antivirus & outils',    label_es: 'Antivirus y herramientas', label_de: 'Antivirus & Tools', label_it: 'Antivirus e strumenti', label_pt: 'Antivírus e ferramentas', match: '(antivirus|av|scanner|defender|tool|removal-tool|edr)' },
  { slug: 'windows-security', label: 'Windows security', label_fr: 'Sécurité Windows',        label_es: 'Seguridad de Windows',  label_de: 'Windows-Sicherheit',  label_it: 'Sicurezza di Windows',  label_pt: 'Segurança do Windows',   match: '(windows|firewall|update|harden|patch|account|uac)' },
  { slug: 'privacy',          label: 'Privacy',          label_fr: 'Confidentialité',         label_es: 'Privacidad',            label_de: 'Datenschutz',         label_it: 'Privacy',               label_pt: 'Privacidade',            match: '(privacy|tracking|phishing|password|2fa|vpn|browser|surveillance)' },
];

export function catLabel(c: Category, lang: string): string {
  return (
    (lang === 'fr' && c.label_fr) || (lang === 'es' && c.label_es) ||
    (lang === 'de' && c.label_de) || (lang === 'it' && c.label_it) ||
    (lang === 'pt' && c.label_pt) || c.label
  );
}

/** Matches an article (by its tags) against a category's regex. */
export function articleMatchesCat(tags: string[] = [], c: Category): boolean {
  const hay = tags.join(' ').toLowerCase();
  return new RegExp(c.match).test(hay);
}
