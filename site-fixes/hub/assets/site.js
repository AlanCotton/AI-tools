/* Chameleon Brands - shared behaviour */
(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Transparent hero header → solid on scroll
  var overHero = document.querySelector('.site-header.over-hero');
  if (overHero) {
    var onScroll = function () {
      overHero.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 3, 2) * 0.08) + 's';
      io.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Newsletter: AJAX submit to Netlify so the user stays on the page
  document.querySelectorAll('form[data-netlify]').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      // Let Netlify handle it natively if JS-encoding fails; otherwise AJAX
      ev.preventDefault();
      var status = form.querySelector('.form-status');
      var btn = form.querySelector('button[type="submit"]');
      var data = new URLSearchParams(new FormData(form)).toString();
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
        .then(function () {
          form.reset();
          if (status) { status.textContent = 'Merci! You’re on the list.'; status.style.color = 'var(--c-green)'; }
        })
        .catch(function () {
          if (status) { status.textContent = 'Something went wrong - email us at hello@chameleon-brands.com'; status.style.color = 'var(--c-red)'; }
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Submit'; }
        });
    });
  });
})();
