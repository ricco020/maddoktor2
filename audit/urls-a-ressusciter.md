# Audit Wayback - URLs à ressusciter (secure-os.org)

**Date audit** : 2026-06-12 · **Source** : API CDX Wayback (209 URLs uniques, 2004→2017)
**Historique** : 2004 = "Secure OS Forums" embryonnaire · 2015-2017 = mailing list "Secure Desktops" (fondée par Subgraph + Qubes OS + Tails, modérateur David Mirza Ahmad / Subgraph). Aucune phase spam.

## Répartition historique

| Groupe | URLs | Nature |
|---|---|---|
| `/pipermail/desktops/*` | 191 | Archives mailing list (oct 2015 → fév 2017, 14 mois) |
| `/css`, `/fonts`, `/js` | 9 | Assets Bootstrap (sans valeur) |
| `/` | 1 | Homepage "Secure OS Forums" |
| `/desktops/charter/` | 1 | Charte de la liste ⭐ |
| `/cgi-bin/mailman/listinfo/desktops` | 1 | Page d'inscription Mailman |
| `/members`, `/public`, `/contact.js`, etc. | 6 | Vestiges 2004, 404 dès l'époque |

## Plan d'action par URL

| URL historique | Action | Justification |
|---|---|---|
| `/` | **Recréer** (homepage money site) | Backlink CCC events DR 85 pointe sur la racine |
| `/desktops/charter/` | **Recréer** - page "Secure Desktops Charter" modernisée, contenu Wayback intégral comme base + note héritage 2015 | Backlink Subgraph handbook DR 59 ; PAS de redirect, contenu pertinent exigé |
| `/pipermail/desktops/2015-October/000000.html` | **301 → /heritage/** | Backlink StackExchange DR 91 (message fondateur de D. M. Ahmad) |
| `/pipermail/*` (191 URLs, wildcard) | **301 → /heritage/** | Capter tout deep link résiduel vers les archives |
| `/cgi-bin/mailman/listinfo/desktops` | **301 → /heritage/** | Linkée depuis la charte historique, peut avoir des refs externes |
| `/heritage/` | **Créer** - "About the Secure Desktops project" : histoire de la liste, sujets marquants (32c3, MAC spoofing Tails, Subgraph vs Qubes, Genode), participants notables (Rutkowska/Qubes, sajolida/Tails, Feske/Genode, Weaver/Purism, Schleizer/Whonix), citation du thread StackExchange | Destination des 301 + E-E-A-T + continuité thématique |
| `/css/*`, `/fonts/*`, `/js/*`, `/contact.js`, `/favicon.ico` | **410 implicite (404)** | Assets Bootstrap 2016, zéro valeur SEO |
| `/members/*`, `/public/*` (vestiges 2004) | **Rien (404)** | Déjà 404 en 2004, aucun backlink |
| `/robots.txt` | **Recréer** (nouveau) | Standard |

## Contenu Wayback récupéré (audit/wayback/)

- `charter.html` - charte intégrale (snapshot 2016-04-02) ✅
- `homepage.html` - homepage 2016 ("This is the home of the Secure Desktops mailing list…") ✅
- `pipermail-index.html` - index des 14 mois d'archives ✅
- `2015-oct-000000.html` - message fondateur (réunion Subgraph + Qubes + Tails) ✅
- `2015-oct-subjects.html`, `2015-nov-subjects.html` - sujets marquants ✅

## Backlinks d'élite → atterrissage prévu

| Backlink | DR | URL cible | Réponse attendue |
|---|---|---|---|
| security.stackexchange.com/questions/100151 | 91 | `/pipermail/desktops/2015-October/000000.html` | 301 → `/heritage/` (200) |
| events.ccc.de/congress/2015/wiki/Static:Assemblies | 85 | `/` | 200 |
| subgraph.com/sgos-handbook | 59 | `/desktops/charter/` | 200 (contenu réel) |
