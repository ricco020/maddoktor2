// Privacy-friendly GA4 — loaded ONLY after explicit consent.
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
})();
