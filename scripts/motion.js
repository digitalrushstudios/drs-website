/* Digital Rush Studios — motion.js
   Custom cursor, portfolio card cursor glow, stats counter animation.
   Requires: main.js loaded first.
*/

/* ── STATS COUNTER ANIMATION ── */
/* Counts up from 0 to each stat's target when it scrolls into view */
(function () {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (!statNums.length) return;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function countUp(el, target, suffix) {
    const accentEl = el.querySelector('.stat-accent');
    const duration = 1400;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOutCubic(progress) * target);

      if (accentEl) {
        el.firstChild.textContent = value;
      } else {
        el.textContent = value + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (accentEl) el.firstChild.textContent = target;
        else          el.textContent = target + suffix;
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
    card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--my', `${((e.clientY - rect.top)  / rect.height) * 100}%`);
  });
});

/* ── CUSTOM CURSOR ── */
/* Only runs on pointer devices — touch screens skip entirely */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mX = 0, mY = 0;
  let rX = 0, rY = 0;

  /* Snap dot to cursor immediately */
  document.addEventListener('mousemove', e => {
    mX = e.clientX;
    mY = e.clientY;
    dot.style.left = mX + 'px';
    dot.style.top  = mY + 'px';
  }, { passive: true });

  /* Ring trails behind with gentle lerp */
  function tick() {
    rX += (mX - rX) * 0.10;
    rY += (mY - rY) * 0.10;
    ring.style.left = rX + 'px';
    ring.style.top  = rY + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  /* Expand ring on hover over interactive elements */
  const interactive = 'a, button, .p-item, .service-card, .shop-card, .process-card, select, textarea, input';
  document.querySelectorAll(interactive).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* Compress ring on click */
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  /* Hide when cursor leaves window */
  document.addEventListener('mouseleave', () => document.body.classList.add('cursor-out'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-out'));
})();
