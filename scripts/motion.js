/* Digital Rush Studios — motion.js
   Custom cursor · stats counter · portfolio glow · parallax · card tilt · magnetic buttons
*/

/* ── STATS COUNTER ANIMATION ── */
(function () {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (!statNums.length) return;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function countUp(el, target, suffix) {
    const accentEl = el.querySelector('.stat-accent');
    const duration = 1600;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOutCubic(progress) * target);
      const display  = value + suffix;

      if (accentEl) {
        el.childNodes[0].textContent = value;
      } else {
        el.textContent = display;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (accentEl) el.childNodes[0].textContent = target;
        else          el.textContent = target + suffix;
        el.style.animation = 'countPop 0.3s ease forwards';
      }
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      if (!isNaN(target)) countUp(el, target, suffix);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  statNums.forEach(el => counterObserver.observe(el));
})();

/* ── PORTFOLIO CARD CURSOR GLOW ── */
document.querySelectorAll('.p-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width)  * 100}%`);
    card.style.setProperty('--my', `${((e.clientY - rect.top)  / rect.height) * 100}%`);
  });
});

/* ── HERO PARALLAX ── */
(function () {
  const hero        = document.getElementById('hero');
  const heroContent = hero ? hero.querySelector('.hero-content') : null;
  if (!hero || !heroContent) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const vh      = window.innerHeight;
      if (scrollY > vh) { ticking = false; return; }
      const progress = scrollY / vh;
      heroContent.style.transform = `translateY(${progress * 55}px)`;
      heroContent.style.opacity   = String(1 - progress * 0.4);
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

/* ── PROCESS CARD & SERVICE CARD 3-D TILT ── */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const TILT = 4.5;
  const cards = document.querySelectorAll('.process-card, .service-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const dx   = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
      const dy   = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;
      card.style.transform        = `perspective(900px) rotateX(${-dy * TILT}deg) rotateY(${dx * TILT}deg) translateZ(6px)`;
      card.style.transitionDuration = '0s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transitionDuration = '0.55s';
      card.style.transform          = '';
    });
  });
})();

/* ── MAGNETIC BUTTONS ── */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const STRENGTH = 0.28;
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx   = (e.clientX - (rect.left + rect.width  / 2)) * STRENGTH;
      const dy   = (e.clientY - (rect.top  + rect.height / 2)) * STRENGTH;
      btn.style.transform        = `translate(${dx}px, ${dy}px)`;
      btn.style.transitionDuration = '0.1s';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transitionDuration = '0.45s';
      btn.style.transform          = '';
    });
  });
})();

/* ── CUSTOM CURSOR ── */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mX = 0, mY = 0;
  let rX = 0, rY = 0;

  document.addEventListener('mousemove', e => {
    mX = e.clientX;
    mY = e.clientY;
    dot.style.left = mX + 'px';
    dot.style.top  = mY + 'px';
  }, { passive: true });

  (function tick() {
    rX += (mX - rX) * 0.10;
    rY += (mY - rY) * 0.10;
    ring.style.left = rX + 'px';
    ring.style.top  = rY + 'px';
    requestAnimationFrame(tick);
  })();

  const interactive = 'a, button, .p-item, .service-card, .shop-card, .process-card, select, textarea, input';
  document.querySelectorAll(interactive).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.addEventListener('mousedown',  () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',    () => document.body.classList.remove('cursor-click'));
  document.addEventListener('mouseleave', () => document.body.classList.add('cursor-out'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-out'));
})();

/* ── PROCESS DOT GLOW ANIMATION ── */
(function () {
  document.querySelectorAll('.step-dot, .ai-step-dot').forEach(dot => {
    dot.style.animation = 'glowPulse 2.4s ease-in-out infinite';
  });
})();

/* ── STAGGER REVEAL FOR GRID SIBLINGS ── */
(function () {
  const grids = document.querySelectorAll('.portfolio-grid, .services-grid, .process-infographic, .why-list');
  grids.forEach(grid => {
    const children = Array.from(grid.querySelectorAll(':scope > .reveal, :scope > article.reveal, :scope > div.reveal'));
    children.forEach((child, i) => {
      if (!child.className.includes('reveal-d')) {
        child.style.transitionDelay = `${i * 0.07}s`;
      }
    });
  });
})();
