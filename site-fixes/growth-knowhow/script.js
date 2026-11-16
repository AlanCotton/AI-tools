document.addEventListener('DOMContentLoaded', function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile menu toggle + auto-close
  var menuBtn = document.querySelector('.menu-btn');
  var navEl = document.getElementById('nav');
  if (menuBtn && navEl) {
    menuBtn.addEventListener('click', function () { navEl.classList.toggle('open'); });
    navEl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navEl.classList.remove('open'); });
    });
  }
});

// Contact form (wired via onsubmit on form.enquiry): AJAX submit so the inline "Thanks!" confirmation shows in preview
// AND in production. On Netlify, posting form-encoded data (incl. form-name) to "/"
// is captured in the Forms dashboard; elsewhere we still show the confirmation.
function handleSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var success = form.parentNode.querySelector('.form-success');
  var BOOKING = 'https://calendar.app.google/g3XnCTvhj4SAgEpz9';
  var bookingHref = BOOKING + (BOOKING.indexOf('?') > -1 ? '&' : '?') + 'source=Growth+Knowhow';
  var goToBooking = function () { window.open(bookingHref, '_blank', 'noopener'); };
  var reveal = function () {
    if (success) success.classList.add('show');
    form.reset();
    goToBooking();
  };
  // Only open the calendar once Netlify has accepted the enquiry. If the AJAX post
  // fails, fall back to a normal form POST so the enquiry is not lost.
  var fallback = function () { form.removeAttribute('onsubmit'); form.submit(); };
  try {
    var data = new URLSearchParams(new FormData(form)).toString();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    }).then(function (res) { if (res.ok) { reveal(); } else { fallback(); } })
      .catch(fallback);
  } catch (err) {
    fallback();
  }
  return false;
}
