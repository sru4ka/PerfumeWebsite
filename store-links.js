/* PERFUMEDIA: one "Get the app" link for both stores.
   Links that point at the App Store and are not marked data-store="ios" (the
   generic "Get the app", pricing, compare and quiz buttons) ask which store:
   an iPhone goes straight to the App Store, an Android phone straight to
   Google Play, and anyone else (a computer) picks one in a small window.
   Delegated, so links added later (the quiz result) follow. */
(function () {
  "use strict";
  var APPLE = "https://apps.apple.com/us/app/perfumedia-perfume-tracker/id6792554738";
  var PLAY = "https://play.google.com/store/apps/details?id=com.dbromberg.scented";
  var ua = navigator.userAgent || "";
  var isAndroid = /android/i.test(ua);
  var isApple = /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1);

  var APPLE_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c-.02-2.02 1.65-2.99 1.72-3.04-.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.29 2-1.4 2.43-.36 6.03 1 8 .67.96 1.46 2.04 2.5 2 1-.04 1.38-.65 2.59-.65 1.21 0 1.55.65 2.61.63 1.08-.02 1.76-.98 2.42-1.95.76-1.11 1.07-2.19 1.09-2.24-.02-.01-2.09-.8-2.11-3.18ZM15.1 6.28c.55-.67.93-1.6.82-2.53-.8.03-1.77.53-2.34 1.2-.51.59-.96 1.54-.84 2.44.9.07 1.81-.45 2.36-1.11Z"/></svg>';
  var PLAY_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/></svg>';

  var CSS =
    ".pm-store-overlay{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(28,27,31,.45);opacity:0;transition:opacity .2s ease}" +
    ".pm-store-overlay.open{opacity:1}" +
    ".pm-store-card{position:relative;width:100%;max-width:380px;background:#fffdf8;color:#1c1b1f;border-radius:22px;padding:30px 26px 24px;text-align:center;box-shadow:0 30px 60px -20px rgba(28,27,31,.45);transform:translateY(10px);transition:transform .2s ease;font-family:Inter,system-ui,-apple-system,sans-serif}" +
    ".pm-store-overlay.open .pm-store-card{transform:none}" +
    ".pm-store-card h3{margin:0 0 6px;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:26px;line-height:1.2}" +
    ".pm-store-card p{margin:0 0 22px;color:#6b6872;font-size:15px}" +
    ".pm-store-choices{display:flex;flex-direction:column;gap:12px}" +
    ".pm-store-choice{display:flex;align-items:center;justify-content:center;gap:12px;background:#1c1b1f;color:#fff;text-decoration:none;padding:13px 20px;border-radius:14px;transition:transform .2s ease}" +
    ".pm-store-choice:hover,.pm-store-choice:focus-visible{transform:translateY(-2px)}" +
    ".pm-store-choice span{display:flex;flex-direction:column;align-items:flex-start;line-height:1.15;font-weight:600;font-size:18px}" +
    ".pm-store-choice small{font-size:10.5px;font-weight:500;opacity:.8;letter-spacing:.02em}" +
    ".pm-store-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:0;border-radius:50%;background:#f1ede4;color:#6b6872;font-size:18px;line-height:32px;cursor:pointer}" +
    ".pm-store-close:hover{color:#1c1b1f}";

  var overlay = null;
  var lastFocus = null;

  function close() {
    if (!overlay) return;
    overlay.classList.remove("open");
    var el = overlay;
    overlay = null;
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 200);
    document.removeEventListener("keydown", onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  function ask() {
    if (overlay) return;
    if (!document.getElementById("pm-store-css")) {
      var style = document.createElement("style");
      style.id = "pm-store-css";
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    lastFocus = document.activeElement;
    overlay = document.createElement("div");
    overlay.className = "pm-store-overlay";
    overlay.innerHTML =
      '<div class="pm-store-card" role="dialog" aria-modal="true" aria-labelledby="pm-store-title">' +
        '<button type="button" class="pm-store-close" aria-label="Close">&times;</button>' +
        '<h3 id="pm-store-title">Get Perfumedia</h3>' +
        "<p>Which phone do you use?</p>" +
        '<div class="pm-store-choices">' +
          '<a class="pm-store-choice" data-store="ios" href="' + APPLE + '" target="_blank" rel="noopener">' + APPLE_ICON + "<span><small>Download on the</small>App Store</span></a>" +
          '<a class="pm-store-choice" data-store="android" href="' + PLAY + '" target="_blank" rel="noopener">' + PLAY_ICON + "<span><small>Get it on</small>Google Play</span></a>" +
        "</div>" +
      "</div>";
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || (e.target.closest && e.target.closest(".pm-store-close"))) close();
      else if (e.target.closest && e.target.closest(".pm-store-choice")) setTimeout(close, 0);
    });
    document.body.appendChild(overlay);
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(function () { if (overlay) overlay.classList.add("open"); });
    var first = overlay.querySelector(".pm-store-choice");
    if (first) first.focus();
  }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href*='apps.apple.com']") : null;
    if (!a || a.getAttribute("data-store") === "ios") return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    if (isApple) return; // the App Store link is already the right one
    e.preventDefault();
    if (isAndroid) window.open(PLAY, "_blank", "noopener");
    else ask();
  });
})();
