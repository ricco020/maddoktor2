// Privacy-friendly GA4 - loaded ONLY after explicit consent.
// CSP forbids inline scripts (script-src 'self' googletagmanager), so all the
// consent logic lives here in an external file.
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  window.loadAnalytics = function () {
    if (window.__ga_loaded) return;
    window.__ga_loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-0SWEEWZHKP';
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', 'G-0SWEEWZHKP', { anonymize_ip: true });
  };

  // If the visitor already accepted in a previous visit, load immediately.
  try {
    if (localStorage.getItem('so-consent') === 'yes') window.loadAnalytics();
  } catch (e) {}

  // Wire up the cookie banner once the DOM is ready.
  function initBanner() {
    var bar = document.getElementById('cookiebar');
    if (!bar) return;
    var consent = null;
    try { consent = localStorage.getItem('so-consent'); } catch (e) {}
    if (!consent) bar.hidden = false;
    var acc = document.getElementById('ck-accept');
    var dec = document.getElementById('ck-decline');
    if (acc) acc.addEventListener('click', function () {
      try { localStorage.setItem('so-consent', 'yes'); } catch (e) {}
      bar.hidden = true;
      if (window.loadAnalytics) window.loadAnalytics();
    });
    if (dec) dec.addEventListener('click', function () {
      try { localStorage.setItem('so-consent', 'no'); } catch (e) {}
      bar.hidden = true;
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
  } else {
    initBanner();
  }
  // ── Mesure des clics affilies ────────────────────────────────────────────
  // Ajoute le 2026-08-10. Ce site fait 6 sessions sur 30 jours et sert bien
  // des encarts affilies, mais GA4 n'en recevait QUE page_view, session_start,
  // first_visit et user_engagement : aucun evenement de clic, pas meme le
  // 'click' automatique. Sa conversion n'etait donc pas mauvaise, elle etait
  // inobservable — on ne pouvait ni la constater ni l'ameliorer.
  //
  // Le code vit ici et pas dans un script inline parce que la CSP du site
  // interdit l'inline (script-src 'self' googletagmanager) : ce fichier est
  // deja same-origin, deja charge, et porte deja la logique de consentement.
  //
  // Memes noms d'evenement et de parametres que vpnsmith et wethepurple, pour
  // que les trois soient comparables dans une seule exploration GA4.
  function localeOf(path) {
    var seg = path.split('/').filter(Boolean)[0];
    return seg && /^[a-z]{2}$/i.test(seg) ? seg.toLowerCase() : '';
  }
  document.addEventListener('click', function (e) {
    var link = e.target && e.target.closest ? e.target.closest('a[href*="/go/"]') : null;
    if (!link) return;
    var slug = (link.getAttribute('href') || '').split('/go/')[1] || '';
    slug = slug.split(/[?#]/)[0].replace(/\/$/, '');
    if (!slug) return;
    var path = window.location.pathname;
    var params = {
      affiliate_program: slug.split('-')[0],
      affiliate_slug: slug,
      landing_path: path,
      locale: localeOf(path),
      link_url: link.href,
      transport_type: 'beacon'
    };
    gtag('event', 'affiliate_click', params);
    gtag('event', 'go_click', params);
  }, true);
})();
