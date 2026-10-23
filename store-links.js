/* PERFUMEDIA: one "Get the app" link for both stores.
   Links that point at the App Store and are not marked data-store="ios" (the
   generic "Get the app", pricing and quiz buttons) open Google Play instead on
   an Android phone. Delegated, so links added later (the quiz result) follow. */
(function () {
  "use strict";
  var PLAY = "https://play.google.com/store/apps/details?id=com.dbromberg.scented";
  if (!/android/i.test(navigator.userAgent || "")) return;
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href*='apps.apple.com']") : null;
    if (!a || a.getAttribute("data-store") === "ios") return;
    e.preventDefault();
    window.open(PLAY, "_blank", "noopener");
  });
})();
