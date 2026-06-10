/* Digital Rush Studios — interactions.js
   Lightbox and package card pre-select.
   Requires: main.js, motion.js loaded first.
*/

/* ── PACKAGE CARD PRE-SELECT ── */
/* When a "Get a Quote" link carries data-preset, pre-select the matching
   dropdown option in the contact form before smooth-scrolling to it.     */
document.querySelectorAll('a[data-preset]').forEach(link => {
  link.addEventListener('click', function () {
    const preset = this.dataset.preset;
    const select = document.getElementById('f-type');
    if (!select || !preset) return;
    const option = Array.from(select.options).find(o => o.text === preset);
    if (option) select.value = option.value;
  });
});

/* ── LIGHTBOX ── */
(function () {
  const items  = document.querySelectorAll('.p-item');
  const lb     = document.getElementById('lightbox');
  if (!items.length || !lb) return;

  const lbImg   = document.getElementById('lbImg');
  const lbName  = document.getElementById('lbName');
  const lbCat   = document.getElementById('lbCat');
  const lbCount = document.getElementById('lbCount');
  const lbClose = document.getElementById('lbClose');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');

  /* Build index of all portfolio items at load time */
  const portfolio = Array.from(items).map(item => {
    const img = item.querySelector('img');
    return {
      src:  img ? img.src : '',
      alt:  img ? img.alt : '',
      name: (item.querySelector('.p-name') || {}).textContent || '',
      cat:  (item.querySelector('.p-cat')  || {}).textContent || ''
    };
  });

  let current = 0;
  let isOpen  = false;

  /* ── Populate the lightbox with a given index ── */
  function populate(index, animate) {
    const p = portfolio[index];
    if (animate) {
      lbImg.classList.add('swapping');
      setTimeout(() => {
        lbImg.src  = p.src;
        lbImg.alt  = p.alt;
        lbImg.classList.remove('swapping');
      }, 180);
    } else {
      lbImg.src = p.src;
      lbImg.alt = p.alt;
    }
    lbName.textContent  = p.name.trim();
    lbCat.textContent   = p.cat.trim();
    lbCount.textContent = (index + 1) + ' / ' + portfolio.length;
  }

  /* ── Open ── */
  function open(index) {
    current = index;
    populate(index, false);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    lbClose.focus();
  }

  /* ── Close ── */
  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    isOpen = false;
    setTimeout(() => { if (!isOpen) lbImg.src = ''; }, 350);
  }

  /* ── Navigate ── */
  function go(dir) {
    current = (current + dir + portfolio.length) % portfolio.length;
    populate(current, true);
  }

  /* ── Click on any portfolio item ── */
  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
  });

  /* ── Controls ── */
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click',  e => { e.stopPropagation(); go(-1); });
  lbNext.addEventListener('click',  e => { e.stopPropagation(); go(+1); });

  /* Click the backdrop (not the image/buttons) to close */
  lb.addEventListener('click', e => {
    if (e.target === lb) close();
  });

  /* Keyboard: Escape closes, arrows navigate */
  document.addEventListener('keydown', e => {
    if (!isOpen) return;
    if (e.key === 'Escape')     { e.preventDefault(); close(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(+1); }
  });

  /* Touch swipe support */
  let touchStartX = 0;
  lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) go(dx < 0 ? +1 : -1);
  });
})();
