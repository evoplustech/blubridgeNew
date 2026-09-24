(function () {
  if (window.__bbAdminDocumentBoundary) return;
  window.__bbAdminDocumentBoundary = true;
  function isAdmin(pathname) {
    return /^\/admin(?:\/|$)/i.test(decodeURIComponent(pathname));
  }
  var adminDocument = isAdmin(window.location.pathname);
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = window.history[method];
    window.history[method] = function (state, title, url) {
      if (url != null) {
        var destination = new URL(url, window.location.href);
        if (destination.origin === window.location.origin && isAdmin(destination.pathname) !== adminDocument) {
          if (method === 'replaceState') window.location.replace(destination.href);
          else window.location.assign(destination.href);
          return;
        }
      }
      return original.apply(this, arguments);
    };
  });
  window.addEventListener('popstate', function (event) {
    if (isAdmin(window.location.pathname) !== adminDocument) {
      event.stopImmediatePropagation();
      window.location.reload();
    }
  });
})();