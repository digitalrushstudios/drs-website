/* Digital Rush Studios — main.js
   Nav, mobile menu, smooth scroll, scroll reveal, active nav, Netlify form.
   Load order: main.js → motion.js → interactions.js
*/

/* ── NAV SCROLL STATE ── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── MOBILE MENU ── */
function toggleMenu() {
  const links  = document.getElementById('navLinks');
  const btn    = document.getElementById('hamburger');
  if (!links || !btn) return;
  const isOpen = links.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  const links = document.getElementById('navLinks');
  const btn   = document.getElementById('hamburger');
  if (links) links.classList.remove('open');
  if (btn)   btn.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── SMOOTH SCROLL WITH NAV OFFSET ── */
/* Also closes mobile menu on any anchor click */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── ACTIVE NAV ON SCROLL ── */
/* Highlights the nav link that matches the section currently in view */
(function () {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', isActive);
    });
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '-25% 0px -65% 0px'
  });

  sections.forEach(s => sectionObserver.observe(s));
})();

/* ── NETLIFY FORM — CLIENT-SIDE VALIDATION + AJAX SUBMISSION ── */
const intakeForm = document.getElementById('intakeForm');
if (intakeForm) {

  /* Validate a single field group, return true if valid */
  function validateField(input) {
    const fg = input.closest('.fg');
    if (!fg) return true;
    const invalid =
      (input.hasAttribute('required') && !input.value.trim()) ||
      (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
    fg.classList.toggle('has-error', invalid);
    input.classList.toggle('field-error', invalid);
    return !invalid;
  }

  /* Clear error as soon as the user starts fixing it */
  intakeForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('change', () => validateField(field));
  });

  intakeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Validate all required fields before sending */
    const required = Array.from(this.querySelectorAll('input[required], select[required], textarea[required]'));
    const allValid = required.map(validateField).every(Boolean);
    if (!allValid) {
      const firstError = this.querySelector('.field-error');
      if (firstError) firstError.focus();
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(this)).toString()
    })
    .then(() => showFormSuccess())
    .catch(() => showFormSuccess());
  });
}

function showFormSuccess() {
  const form = document.getElementById('intakeForm');
  const msg  = document.getElementById('successMsg');
  if (form) form.style.display = 'none';
  if (msg)  msg.style.display = 'block';
}
