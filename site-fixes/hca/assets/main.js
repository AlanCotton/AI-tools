/* HCA - shared interactions */
(function () {
  "use strict";

  // Sticky header shadow
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Hero word rotator
  var rotator = document.querySelector("[data-rotator]");
  if (rotator) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var words = JSON.parse(rotator.getAttribute("data-rotator") || "[]");
    var el = rotator.querySelector(".word");
    if (el && words.length && !reduce) {
      var i = 0;
      setInterval(function () {
        rotator.classList.add("swap");
        setTimeout(function () {
          i = (i + 1) % words.length;
          el.textContent = words[i];
          rotator.classList.remove("swap");
        }, 400);
      }, 2800);
    }
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }
})();
