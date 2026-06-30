// Génère les images héro (WebP) et OG (PNG) - designs SVG uniques par article.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 1200, H = 630;
const C = {
  void: '#070a0c', panel: '#0d130e', panel2: '#111a13',
  edge: '#1f2d22', edgeB: '#2f4434',
  ink: '#d7e4d9', dim: '#8fa494', faint: '#5c6f61',
  green: '#4FD6C0', greenD: '#2FA08C', amber: '#e8b454', red: '#e06e6e',
};

const frame = (inner, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.void}"/>
  <radialGradient id="halo" cx="50%" cy="-10%" r="90%">
    <stop offset="0%" stop-color="${C.green}" stop-opacity="0.10"/>
    <stop offset="60%" stop-color="${C.green}" stop-opacity="0"/>
  </radialGradient>
  <rect width="${W}" height="${H}" fill="url(#halo)"/>
  ${[...Array(Math.floor(H / 4))].map((_, i) => `<rect y="${i * 4 + 2}" width="${W}" height="1.2" fill="#000" opacity="0.16"/>`).join('')}
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" rx="10" fill="none" stroke="${C.edgeB}" stroke-width="2"/>
  <circle cx="58" cy="58" r="6" fill="${C.red}" opacity="0.85"/>
  <circle cx="80" cy="58" r="6" fill="${C.amber}" opacity="0.85"/>
  <circle cx="102" cy="58" r="6" fill="${C.green}" opacity="0.85"/>
  <text x="${W - 58}" y="64" text-anchor="end" font-family="monospace" font-size="20" fill="${C.faint}">secure-os.org</text>
  ${inner}
  <text x="58" y="${H - 52}" font-family="monospace" font-size="22" fill="${C.faint}">${label}</text>
</svg>`;

const title = (lines, x = 58, y = 150, size = 54, fill = C.ink) =>
  lines.map((l, i) => `<text x="${x}" y="${y + i * (size + 14)}" font-family="monospace" font-size="${size}" font-weight="700" fill="${i === lines.length - 1 ? C.green : fill}">${l}</text>`).join('');

const designs = {
  // Qubes : grille de compartiments imbriqués, un qube compromis isolé
  'qubes-os': frame(`
    ${title(['Qubes OS', 'compartmentalize everything'], 58, 150, 54)}
    ${[0, 1, 2, 3].map((c) => [0, 1].map((r) => {
      const x = 640 + c * 130, y = 300 + r * 130;
      const bad = c === 2 && r === 0;
      return `<rect x="${x}" y="${y}" width="110" height="110" rx="8" fill="${bad ? '#1a0d0d' : C.panel2}" stroke="${bad ? C.red : C.greenD}" stroke-width="2.5"/>
        <text x="${x + 14}" y="${y + 34}" font-family="monospace" font-size="17" fill="${bad ? C.red : C.green}">${bad ? 'pwned' : 'qube' + (c * 2 + r)}</text>
        ${bad ? `<line x1="${x + 18}" y1="${y + 56}" x2="${x + 92}" y2="${y + 92}" stroke="${C.red}" stroke-width="2.5"/><line x1="${x + 92}" y1="${y + 56}" x2="${x + 18}" y2="${y + 92}" stroke="${C.red}" stroke-width="2.5"/>` : `<circle cx="${x + 55}" cy="${y + 74}" r="14" fill="none" stroke="${C.greenD}" stroke-width="2.5"/>`}`;
    }).join('')).join('')}
    <text x="640" y="560" font-family="monospace" font-size="22" fill="${C.dim}">one breach != total breach</text>
  `, 'guide · security by isolation'),

  // Tails : blocs qui se dissolvent (amnésie) depuis une clé USB
  'tails-os': frame(`
    ${title(['Tails OS', 'the system that forgets'], 58, 150, 54)}
    <rect x="620" y="380" width="170" height="84" rx="10" fill="${C.panel2}" stroke="${C.green}" stroke-width="3"/>
    <rect x="790" y="400" width="46" height="44" rx="5" fill="${C.panel2}" stroke="${C.green}" stroke-width="3"/>
    <text x="648" y="432" font-family="monospace" font-size="22" fill="${C.green}">live usb</text>
    ${[...Array(26)].map((_, i) => {
      const col = i % 9, row = Math.floor(i / 9);
      const x = 660 + col * 52, y = 300 - row * 52;
      const fade = Math.max(0.06, 0.85 - col * 0.11 - row * 0.18);
      return `<rect x="${x}" y="${y}" width="36" height="36" rx="4" fill="${C.green}" opacity="${fade.toFixed(2)}"/>`;
    }).join('')}
    <text x="620" y="540" font-family="monospace" font-size="22" fill="${C.dim}">RAM only · wiped on shutdown</text>
  `, 'guide · amnesic live system'),

  // Whonix : deux VMs reliées, gateway/workstation
  'whonix': frame(`
    ${title(['Whonix', 'two VMs, zero leaks'], 58, 150, 54)}
    <rect x="620" y="300" width="220" height="150" rx="10" fill="${C.panel2}" stroke="${C.amber}" stroke-width="3"/>
    <text x="650" y="345" font-family="monospace" font-size="22" fill="${C.amber}">gateway</text>
    <text x="650" y="380" font-family="monospace" font-size="18" fill="${C.dim}">tor only</text>
    <rect x="920" y="300" width="220" height="150" rx="10" fill="${C.panel2}" stroke="${C.green}" stroke-width="3"/>
    <text x="950" y="345" font-family="monospace" font-size="22" fill="${C.green}">workstation</text>
    <text x="950" y="380" font-family="monospace" font-size="18" fill="${C.dim}">no real IP</text>
    <line x1="840" y1="375" x2="920" y2="375" stroke="${C.greenD}" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="620" y="540" font-family="monospace" font-size="22" fill="${C.dim}">isolation by architecture, not policy</text>
  `, 'guide · tor isolation'),

  // Distros : barres de classement par threat model
  'most-secure-linux-distros': frame(`
    ${title(['7 most secure', 'linux distros'], 58, 150, 54)}
    ${[['qubes', 460], ['tails', 410], ['whonix', 365], ['kicksecure', 315], ['silverblue', 265], ['microos', 215], ['alpine', 165]].map(([name, w], i) => `
      <rect x="620" y="${260 + i * 42}" width="${w}" height="26" rx="4" fill="${C.green}" opacity="${(0.95 - i * 0.11).toFixed(2)}"/>
      <text x="${626 + Number(w)}" y="${279 + i * 42}" font-family="monospace" font-size="18" fill="${C.dim}"> ${name}</text>
    `).join('')}
  `, 'ranking · by threat model'),

  // FDE : disque + blocs chiffrés
  'full-disk-encryption': frame(`
    ${title(['full disk', 'encryption'], 58, 150, 54)}
    <circle cx="880" cy="370" r="150" fill="${C.panel2}" stroke="${C.greenD}" stroke-width="3"/>
    <circle cx="880" cy="370" r="95" fill="none" stroke="${C.edgeB}" stroke-width="2"/>
    <circle cx="880" cy="370" r="26" fill="${C.void}" stroke="${C.green}" stroke-width="3"/>
    ${[...Array(14)].map((_, i) => {
      const a = (i / 14) * Math.PI * 2;
      const x = 880 + Math.cos(a) * 122 - 16, y = 370 + Math.sin(a) * 122 - 11;
      return `<text x="${x}" y="${y + 16}" font-family="monospace" font-size="19" fill="${C.green}" opacity="0.8">${(i * 37 % 256).toString(16).padStart(2, '0')}</text>`;
    }).join('')}
    <rect x="845" y="338" width="70" height="50" rx="8" fill="none" stroke="${C.amber}" stroke-width="3"/>
    <rect x="862" y="318" width="36" height="26" rx="10" fill="none" stroke="${C.amber}" stroke-width="3"/>
    <text x="620" y="565" font-family="monospace" font-size="22" fill="${C.dim}">LUKS · BitLocker · FileVault · VeraCrypt</text>
  `, 'guide · encryption at rest'),

  // VeraCrypt : conteneur chiffré, clé, volumes imbriqués
  'veracrypt-guide': frame(`
    ${title(['VeraCrypt', 'encrypt everything'], 58, 150, 54)}
    <rect x="640" y="260" width="480" height="310" rx="12" fill="${C.panel2}" stroke="${C.greenD}" stroke-width="2.5"/>
    <rect x="670" y="290" width="200" height="120" rx="8" fill="${C.void}" stroke="${C.green}" stroke-width="2"/>
    <text x="690" y="326" font-family="monospace" font-size="18" fill="${C.green}">outer volume</text>
    <rect x="700" y="345" width="140" height="50" rx="6" fill="${C.panel}" stroke="${C.amber}" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="718" y="376" font-family="monospace" font-size="15" fill="${C.amber}">hidden volume</text>
    <line x1="880" y1="310" x2="1000" y2="310" stroke="${C.greenD}" stroke-width="2" stroke-dasharray="6 5"/>
    <text x="1010" y="316" font-family="monospace" font-size="15" fill="${C.dim}">AES-256</text>
    <line x1="880" y1="350" x2="1000" y2="350" stroke="${C.greenD}" stroke-width="2" stroke-dasharray="6 5"/>
    <text x="1010" y="356" font-family="monospace" font-size="15" fill="${C.dim}">Twofish</text>
    <line x1="880" y1="390" x2="1000" y2="390" stroke="${C.greenD}" stroke-width="2" stroke-dasharray="6 5"/>
    <text x="1010" y="396" font-family="monospace" font-size="15" fill="${C.dim}">Serpent</text>
    <rect x="670" y="430" width="420" height="110" rx="8" fill="${C.void}" stroke="${C.faint}" stroke-width="1.5"/>
    <text x="690" y="462" font-family="monospace" font-size="15" fill="${C.faint}">$ veracrypt --create /media/vault</text>
    <text x="690" y="488" font-family="monospace" font-size="15" fill="${C.faint}">Encryption: AES | Hash: SHA-512</text>
    <text x="690" y="514" font-family="monospace" font-size="15" fill="${C.green}">Volume successfully created.</text>
    <text x="640" y="600" font-family="monospace" font-size="20" fill="${C.dim}">plausible deniability · cross-platform · FOSS</text>
  `, 'guide · 2026 · disk encryption'),

  // Linux hardening : terminal sysctl, AppArmor, threat model layers
  'linux-hardening': frame(`
    ${title(['linux hardening', 'threat-model-first'], 58, 150, 54)}
    <rect x="640" y="240" width="500" height="340" rx="10" fill="${C.panel2}" stroke="${C.edgeB}" stroke-width="2"/>
    <text x="660" y="278" font-family="monospace" font-size="16" fill="${C.faint}"># sysctl hardening</text>
    <text x="660" y="306" font-family="monospace" font-size="15" fill="${C.green}">kernel.kptr_restrict=2</text>
    <text x="660" y="330" font-family="monospace" font-size="15" fill="${C.green}">kernel.dmesg_restrict=1</text>
    <text x="660" y="354" font-family="monospace" font-size="15" fill="${C.green}">net.ipv4.tcp_syncookies=1</text>
    <text x="660" y="378" font-family="monospace" font-size="15" fill="${C.green}">kernel.unprivileged_userns_clone=0</text>
    <line x1="650" y1="395" x2="1128" y2="395" stroke="${C.edgeB}" stroke-width="1.5"/>
    <text x="660" y="422" font-family="monospace" font-size="15" fill="${C.amber}">✓ AppArmor enforcing (87 profiles)</text>
    <text x="660" y="448" font-family="monospace" font-size="15" fill="${C.amber}">✓ Secure boot verified</text>
    <text x="660" y="474" font-family="monospace" font-size="15" fill="${C.amber}">✓ LUKS2 header backup OK</text>
    <text x="660" y="500" font-family="monospace" font-size="15" fill="${C.red}">✗ ptrace_scope=0  ← fix this</text>
    <text x="660" y="526" font-family="monospace" font-size="15" fill="${C.red}">✗ unprivileged_bpf=1 ← fix this</text>
    <text x="660" y="562" font-family="monospace" font-size="20" fill="${C.dim}">kernel · mac · network · physical · human</text>
  `, 'guide · 2026 · sysctl / apparmor / selinux'),

  // Tails USB install : steps, signature checksum
  'tails-usb-install': frame(`
    ${title(['install tails', 'on a USB drive'], 58, 150, 54)}
    <rect x="640" y="230" width="500" height="360" rx="10" fill="${C.panel2}" stroke="${C.edgeB}" stroke-width="2"/>
    ${[
      ['01', 'download tails 7.8.1 .img', C.green],
      ['02', 'verify OpenPGP signature', C.green],
      ['03', 'check sha256 hash', C.amber],
      ['04', 'dd if=tails.img of=/dev/sdX', C.green],
      ['05', 'boot → configure persistent storage', C.green],
      ['06', 'update before first use', C.dim],
    ].map(([n, t, c], i) => `
      <text x="660" y="${278 + i * 46}" font-family="monospace" font-size="15" fill="${C.faint}">[${n}]</text>
      <text x="720" y="${278 + i * 46}" font-family="monospace" font-size="15" fill="${c}">${t}</text>
    `).join('')}
    <rect x="660" y="560" width="460" height="2" fill="${C.edgeB}"/>
    <text x="660" y="590" font-family="monospace" font-size="14" fill="${C.faint}">sig: tails-amd64-7.8.1.img.sig · SHA-256 verified</text>
  `, 'how-to guide · verified install'),

  // LUKS : diagramme partition, cryptsetup
  'luks-encryption': frame(`
    ${title(['LUKS', 'full disk encryption'], 58, 150, 54)}
    <rect x="640" y="240" width="500" height="80" rx="6" fill="${C.panel2}" stroke="${C.faint}" stroke-width="1.5"/>
    <text x="665" y="290" font-family="monospace" font-size="18" fill="${C.dim}">/dev/sda1 · EFI</text>
    <rect x="640" y="334" width="500" height="80" rx="6" fill="${C.void}" stroke="${C.green}" stroke-width="2.5"/>
    <text x="665" y="384" font-family="monospace" font-size="18" fill="${C.green}">/dev/sda2 · LUKS2 container</text>
    <rect x="670" y="428" width="440" height="60" rx="4" fill="${C.panel2}" stroke="${C.greenD}" stroke-width="1.5"/>
    <text x="690" y="464" font-family="monospace" font-size="16" fill="${C.greenD}">dm-crypt → /dev/mapper/root (ext4 / btrfs)</text>
    <rect x="640" y="502" width="500" height="80" rx="6" fill="${C.panel2}" stroke="${C.faint}" stroke-width="1.5"/>
    <text x="665" y="552" font-family="monospace" font-size="18" fill="${C.dim}">cryptsetup luksHeaderBackup …</text>
    <line x1="890" y1="320" x2="890" y2="334" stroke="${C.green}" stroke-width="2"/>
    <line x1="890" y1="414" x2="890" y2="428" stroke="${C.green}" stroke-width="2"/>
    <line x1="890" y1="488" x2="890" y2="502" stroke="${C.faint}" stroke-width="2"/>
    <text x="640" y="610" font-family="monospace" font-size="20" fill="${C.dim}">AES-XTS-512 · argon2id · TPM unlock · header backup</text>
  `, 'guide · 2026 · dm-crypt/LUKS2'),

  // Qubes vs Tails vs Whonix : matrice décision
  'qubes-vs-tails-vs-whonix': frame(`
    ${title(['qubes vs tails', 'vs whonix'], 58, 150, 54)}
    <text x="640" y="260" font-family="monospace" font-size="16" fill="${C.faint}">threat model</text>
    <text x="830" y="260" font-family="monospace" font-size="16" fill="${C.green}">qubes</text>
    <text x="940" y="260" font-family="monospace" font-size="16" fill="${C.green}">tails</text>
    <text x="1040" y="260" font-family="monospace" font-size="16" fill="${C.green}">whonix</text>
    ${[
      ['targeted malware', '●●●', '●●○', '●●○'],
      ['physical seizure', '●○○', '●●●', '●○○'],
      ['mass surveillance', '●●○', '●●●', '●●●'],
      ['identity linkage', '●●○', '●●●', '●●●'],
      ['device compromise', '●●●', '●●○', '●●○'],
    ].map(([tm, q, t, w], i) => `
      <text x="640" y="${298 + i * 46}" font-family="monospace" font-size="14" fill="${C.dim}">${tm}</text>
      <text x="830" y="${298 + i * 46}" font-family="monospace" font-size="16" fill="${C.amber}">${q}</text>
      <text x="940" y="${298 + i * 46}" font-family="monospace" font-size="16" fill="${C.amber}">${t}</text>
      <text x="1040" y="${298 + i * 46}" font-family="monospace" font-size="16" fill="${C.amber}">${w}</text>
      <line x1="640" y1="${308 + i * 46}" x2="1148" y2="${308 + i * 46}" stroke="${C.edgeB}" stroke-width="1"/>
    `).join('')}
    <text x="640" y="570" font-family="monospace" font-size="19" fill="${C.dim}">no universal best · match model to use case</text>
  `, 'comparison · decision matrix 2026'),

  // Tor Browser : circuit à 3 sauts + couches d'oignon (chiffrement en pelures)
  'tor-browser': frame(`
    ${title(['Tor Browser', 'anonymity by onion routing'], 58, 150, 54)}
    ${[0, 1, 2, 3].map((i) => `<circle cx="240" cy="430" r="${112 - i * 26}" fill="none" stroke="${i === 3 ? C.green : C.greenD}" stroke-width="2.5" opacity="${(0.45 + i * 0.17).toFixed(2)}"/>`).join('')}
    <text x="240" y="300" text-anchor="middle" font-family="monospace" font-size="15" fill="${C.dim}">3 layers of encryption</text>
    <text x="240" y="436" text-anchor="middle" font-family="monospace" font-size="18" fill="${C.green}">data</text>
    ${[['you', 560], ['guard', 700], ['middle', 840], ['exit', 980], ['site', 1120]].map((pair, i, a) => {
      const l = pair[0], x = pair[1], y = 380, last = i === a.length - 1;
      return `<circle cx="${x}" cy="${y}" r="22" fill="${C.panel2}" stroke="${last ? C.amber : C.green}" stroke-width="2.5"/>
      <text x="${x}" y="${y + 44}" text-anchor="middle" font-family="monospace" font-size="15" fill="${last ? C.amber : C.dim}">${l}</text>
      ${i < a.length - 1 ? `<line x1="${x + 24}" y1="${y}" x2="${a[i + 1][1] - 24}" y2="${y}" stroke="${C.greenD}" stroke-width="2"/>` : ''}`;
    }).join('')}
    <text x="560" y="300" font-family="monospace" font-size="16" fill="${C.faint}">no single relay knows both ends</text>
    <text x="560" y="540" font-family="monospace" font-size="18" fill="${C.dim}">entry knows you · exit knows your traffic · neither both</text>
  `, 'guide · the onion router'),

  // OG par défaut (homepage et pages statiques)
  'default': frame(`
    <text x="58" y="200" font-family="monospace" font-size="76" font-weight="700" fill="${C.ink}">secure-os<tspan fill="${C.faint}">.org</tspan><tspan fill="${C.green}">_</tspan></text>
    <text x="58" y="280" font-family="monospace" font-size="30" fill="${C.dim}">desktop security, without the snake oil</text>
    <text x="58" y="420" font-family="monospace" font-size="24" fill="${C.greenD}">$ guides: qubes-os · tails · whonix · hardened linux · fde</text>
    <text x="58" y="470" font-family="monospace" font-size="24" fill="${C.faint}">$ lineage: secure desktops mailing list, est. 2015</text>
  `, 'threat-model-first guides'),
};

mkdirSync('public/images', { recursive: true });
mkdirSync('public/og', { recursive: true });

for (const [slug, svg] of Object.entries(designs)) {
  const buf = Buffer.from(svg);
  await sharp(buf).png().toFile(`public/og/${slug}.png`);
  if (slug !== 'default') {
    await sharp(buf).webp({ quality: 86 }).toFile(`public/images/${slug}.webp`);
  }
  console.log('ok', slug);
}
