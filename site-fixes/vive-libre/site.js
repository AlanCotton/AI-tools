/* Vive Libre - shared site behaviour */
(function () {
  "use strict";

  /* Header: static/solid on all pages except the landing page (which has
     a full-bleed .hero) - there it stays transparent until you scroll. */
  var header = document.querySelector(".site-header");
  var hasHero = document.querySelector(".hero");
  function onScroll() {
    if (!header) return;
    var solid = hasHero ? window.scrollY > window.innerHeight * 0.72 : true;
    header.classList.toggle("solid", solid);
  }
  if (!hasHero && header) header.classList.add("solid");
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
    });
    document.querySelectorAll(".nav-menu a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    });
  }

  /* Reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Show a form's in-page thank-you state */
  function showDone(form) {
    var done = form.querySelector("[data-done]");
    var fields = form.querySelector(".form-fields");
    if (fields) {
      fields.style.display = "none";
    } else {
      form.querySelectorAll("input,textarea,select,button").forEach(function (el) { el.setAttribute("disabled", ""); });
    }
    if (done) { done.hidden = false; }
  }

  /* Netlify forms - submit via AJAX so the in-page thank-you still shows.
     Netlify captures the POST to "/" during deploy; submissions appear in
     your Netlify dashboard under Forms, and email notifications are set up
     there (Forms → Notifications → Email notification). */
  document.querySelectorAll("form[data-ajax-netlify]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity || form.checkValidity()) {
        var data = new URLSearchParams(new FormData(form)).toString();
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data
        }).catch(function () { /* preview/offline: still show thank-you */ });
        showDone(form);
      } else {
        form.reportValidity && form.reportValidity();
      }
    });
  });

  /* WhatsApp chat button - floating, on every page; opens a choice of Jane or Estelle */
  (function () {
    var MSG = encodeURIComponent("Hi, I'd like to talk about moving to the Costa Blanca.");
    var PEOPLE = [
      { name: "Jane", num: "447770447149", show: "+44 7770 447149" },
      { name: "Estelle", num: "34675981829", show: "+34 675 98 18 29" }
    ];
    var ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C8.86 3 3.030 8.82 3.03 16c0 2.29.6 4.53 1.74 6.5L3 29l6.67-1.75A12.96 12.96 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.62c-1.98 0-3.9-.53-5.59-1.53l-.4-.24-3.960 1.04 1.06-3.86-.26-.4A10.58 10.58 0 0 1 5.4 16c0-5.86 4.77-10.63 10.64-10.63 5.86 0 10.6 4.77 10.6 10.63 0 5.87-4.75 10.62-10.6 10.62Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.350-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.090-1.12 2.66s1.14 3.08 1.3 3.3c.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.82.67.76.24 1.46.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z"/></svg>';
    var css = document.createElement("style");
    css.textContent =
      ".wa-wrap{position:fixed;right:clamp(14px,2.5vw,26px);bottom:clamp(14px,2.5vw,26px);z-index:900;display:flex;flex-direction:column;align-items:flex-end;gap:.6rem}" +
      ".wa-float{display:flex;align-items:center;gap:.55rem;border:0;cursor:pointer;" +
      "background:#25D366;color:#fff;text-decoration:none;font-family:var(--sans,system-ui,sans-serif);font-weight:700;font-size:.92rem;" +
      "padding:.8rem 1.1rem .8rem .9rem;border-radius:100px;box-shadow:0 10px 28px -10px rgba(10,40,30,.55);transition:transform .25s,box-shadow .25s}" +
      ".wa-float:hover{transform:translateY(-2px);box-shadow:0 14px 32px -10px rgba(10,40,30,.6);color:#fff}" +
      ".wa-float svg{width:24px;height:24px;flex:none;fill:#fff}" +
      ".wa-menu{display:none;background:#fff;border-radius:14px;box-shadow:0 14px 36px -12px rgba(10,40,30,.45);padding:.4rem;min-width:220px}" +
      ".wa-wrap.open .wa-menu{display:block}" +
      ".wa-menu a{display:flex;flex-direction:column;padding:.65rem .85rem;border-radius:10px;text-decoration:none;color:#0E3445;font-family:var(--sans,system-ui,sans-serif)}" +
      ".wa-menu a:hover{background:#E9F8EF}" +
      ".wa-menu b{font-size:.95rem}.wa-menu small{font-size:.8rem;color:#5b7383;margin-top:.1rem}" +
      "@media (max-width:600px){.wa-float{padding:.85rem}.wa-float span{display:none}}" +
      "body.nav-open .wa-wrap{display:none}" +
      "@media print{.wa-wrap{display:none}}";
    document.head.appendChild(css);
    var wrap = document.createElement("div");
    wrap.className = "wa-wrap";
    wrap.innerHTML = '<div class="wa-menu" role="menu">' + PEOPLE.map(function (p) {
      return '<a role="menuitem" href="https://wa.me/' + p.num + '?text=' + MSG + '" target="_blank" rel="noopener"><b>Chat with ' + p.name + '</b><small>' + p.show + '</small></a>';
    }).join("") + '</div>' +
      '<button type="button" class="wa-float" aria-haspopup="true" aria-expanded="false" aria-label="Chat with us on WhatsApp">' + ICON + '<span>Chat on WhatsApp</span></button>';
    document.body.appendChild(wrap);
    var btn = wrap.querySelector(".wa-float");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = wrap.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) { wrap.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
  })();
})();
