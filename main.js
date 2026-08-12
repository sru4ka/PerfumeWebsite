/* PERFUMEDIA — landing interactions. Progressive enhancement, no dependencies. */
(function () {
  "use strict";

  var doc = document;

  /* Current year in footer */
  var yr = doc.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* Nav: shadow on scroll + scroll progress bar */
  var nav = doc.getElementById("nav");
  var progress = doc.getElementById("scrollProgress");
  function onScroll() {
    var y = window.scrollY || doc.documentElement.scrollTop;
    if (nav) nav.classList.toggle("scrolled", y > 12);
    if (progress) {
      var h = doc.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var toggle = doc.getElementById("navToggle");
  var mobile = doc.getElementById("navMobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal-on-scroll */
  var reveals = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el, i) {
      // subtle stagger for grouped siblings
      el.style.transitionDelay = (i % 3) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Match ring fill (fires when phone comes into view) */
  var ring = doc.querySelector(".match-ring");
  if (ring) {
    var pct = parseInt(ring.getAttribute("data-match") || "90", 10);
    var circumference = 113; // 2πr, r=18
    var off = circumference - (circumference * pct) / 100;
    ring.style.setProperty("--off", off);
    if ("IntersectionObserver" in window) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { ring.classList.add("filled"); ro.disconnect(); }
        });
      }, { threshold: 0.5 });
      ro.observe(ring);
    } else {
      ring.classList.add("filled");
    }
  }

  /* Gentle parallax on ambient orbs (respect reduced motion) */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    var orbs = doc.querySelectorAll(".note-orb");
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY || 0;
        orbs.forEach(function (o, i) {
          var speed = (i + 1) * 0.03;
          o.style.transform = "translateY(" + y * speed + "px)";
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* Close other FAQ items when one opens (accordion behavior) */
  var faqItems = doc.querySelectorAll(".faq-list details");
  faqItems.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) {
        faqItems.forEach(function (other) {
          if (other !== d) other.open = false;
        });
      }
    });
  });
})();
