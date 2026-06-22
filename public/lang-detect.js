/* MadDoktor2 — détection de langue navigateur + mémorisation du choix.
   CSP-safe (self-hosted). Scoppé à la home pour éviter les 404 (slugs localisés). */
(function () {
  try {
    var path = location.pathname;
    var sup = ['fr', 'es', 'de', 'it', 'pt'];
    var m = path.match(/^\/(fr|es|de|it|pt)(\/|$)/);
    var cur = m ? m[1] : 'en';
    function getCookie() {
      var x = document.cookie.match(/(?:^|;\s*)md2_locale=([a-z]{2})/);
      return x ? x[1] : null;
    }
    function setCookie(l) {
      document.cookie = 'md2_locale=' + l + ';path=/;max-age=31536000;samesite=lax';
    }
    var ck = getCookie();
    // Home (racine EN) = point de détection / redirection.
    if (path === '/') {
      if (ck) {
        if (ck !== 'en') { location.replace('/' + ck + '/'); }
        return;
      }
      var langs = navigator.languages || [navigator.language || 'en'];
      var pick = 'en';
      for (var i = 0; i < langs.length; i++) {
        var l = (langs[i] || '').slice(0, 2).toLowerCase();
        if (l === 'en') { pick = 'en'; break; }
        if (sup.indexOf(l) > -1) { pick = l; break; }
      }
      setCookie(pick);
      if (pick !== 'en') { location.replace('/' + pick + '/'); }
      return;
    }
    // Autres pages : mémoriser la locale visitée comme choix (le sélecteur « just works »).
    setCookie(cur);
  } catch (e) {}
})();
