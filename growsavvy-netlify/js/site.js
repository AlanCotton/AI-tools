/* Grow Savvy 2026 — site behaviour */
(function () {
  'use strict';

  /* ---- Sticky nav state ---- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.querySelector('.nav__burger');
  var mnav = document.querySelector('.mnav');
  function closeMenu() { if (mnav) { mnav.classList.remove('is-open'); document.body.style.overflow = ''; } }
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('is-open');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mnav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---- Reveal on scroll (robust: never permanently hide content) ---- */
  var reveals = document.querySelectorAll('.reveal');
  function show(el) { el.classList.add('is-in'); }
  function inView(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.92 && r.bottom > 0;
  }
  function revealInView() {
    reveals.forEach(function (el) { if (!el.classList.contains('is-in') && inView(el)) show(el); });
  }
  if ('IntersectionObserver' in window && reveals.length) {
    var ioFired = false;
    var io = new IntersectionObserver(function (entries) {
      ioFired = true;
      entries.forEach(function (en) { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    // Immediate pass for anything already on screen (covers IO-never-fires cases)
    requestAnimationFrame(revealInView);
    // Progressive reveal on scroll/resize — keeps the animation even if IO is dead.
    window.addEventListener('scroll', revealInView, { passive: true });
    window.addEventListener('resize', revealInView, { passive: true });
    // Last resort: if the observer never delivered a single callback, reveal everything.
    setTimeout(function () { if (!ioFired) reveals.forEach(show); }, 1200);
  } else {
    reveals.forEach(show);
  }

  /* ---- Year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- Direction switcher (What we do) ---- */
  var sw = document.querySelector('.dirswitch');
  if (sw) {
    var key = 'gs-wwd-dir';
    var btns = sw.querySelectorAll('button');
    function setDir(d) {
      document.querySelectorAll('.dir').forEach(function (s) { s.classList.toggle('is-active', s.getAttribute('data-dir') === d); });
      btns.forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-dir') === d); });
      try { localStorage.setItem(key, d); } catch (e) {}
      // re-trigger reveals inside the now-visible direction
      document.querySelectorAll('.dir.is-active .reveal').forEach(function (el) { el.classList.add('is-in'); });
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { setDir(b.getAttribute('data-dir')); }); });
    var saved;
    try { saved = localStorage.getItem(key); } catch (e) {}
    setDir(saved || 'a');
  }

  /* ---- Netlify form (AJAX) ---- */
  var form = document.getElementById('email-form');
  if (form) {
    var wrap = form.parentNode;
    var done = wrap.querySelector('.form-done');
    var fail = wrap.querySelector('.form-fail');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
        .then(function (r) { if (!r.ok) throw new Error('bad'); form.style.display = 'none'; if (done) done.style.display = 'block'; })
        .catch(function () {
          var v = function (n) { return (form.elements[n] && form.elements[n].value || '').trim(); };
          var subject = 'Enquiry from ' + (v('name') || 'a founder');
          var msg = 'Name: ' + v('name') + '\nEmail: ' + v('email') + '\nPhone: ' + (v('phone') || '-') + '\n\n' + v('message');
          window.location.href = 'mailto:hello@grow-savvy.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(msg);
        });
    });
  }
})();
