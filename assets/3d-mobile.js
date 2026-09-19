(() => {
  'use strict';

  const mobileQuery = window.matchMedia('(max-width: 760px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0;
  let active = true;

  const stageMarkup = `
    <div class="mobile-3d-stage" aria-hidden="true">
      <span class="m3d-item orb"></span>
      <span class="m3d-item ring"></span>
      <span class="m3d-item cube"><i></i><i></i><i></i><i></i><i></i><i></i></span>
    </div>`;

  const targetSelector = [
    '.hero-image-card', '.editorial-photo', '.compare-card', '.style-card',
    '.portfolio-card', '.finder-card', '.timeline > div',
    '.service-detail-grid article', '.care-grid article', '.booking-form-wrap',
    '.booking-cards > div', '.faq-list details', '.notfound-card',
    '.luxury-grid', '.topbar-inner'
  ].join(',');

  function addStage() {
    if (!document.querySelector('.mobile-3d-stage')) {
      document.body.insertAdjacentHTML('afterbegin', stageMarkup);
    }
  }

  function setMobileState() {
    active = mobileQuery.matches && !reduceMotion.matches;
    document.body.classList.toggle('mobile-3d', mobileQuery.matches);
    if (mobileQuery.matches) addStage();
    const stage = document.querySelector('.mobile-3d-stage');
    if (stage) stage.style.display = active ? '' : 'none';
  }

  function targets() {
    return [...document.querySelectorAll(targetSelector)].filter((el) => {
      return !el.dataset.m3dBound;
    });
  }

  function bindTargets() {
    if (!mobileQuery.matches) return;
    targets().forEach((el, index) => {
      el.dataset.m3dBound = '1';
      el.dataset.m3dIndex = String(index);
      el.dataset.m3dBaseX = ((index % 2 === 0) ? -1 : 1).toFixed(2);
      el.style.transformOrigin = '50% 50%';
    });
  }

  function updateScroll() {
    raf = 0;
    if (!active) return;

    const height = window.innerHeight || 800;
    const center = height * 0.52;
    const stage = document.querySelector('.mobile-3d-stage');
    const items = stage ? stage.querySelectorAll('.m3d-item') : [];
    const scrollY = window.scrollY || 0;

    document.querySelectorAll('[data-m3d-bound]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      const visible = rect.bottom > -80 && rect.top < height + 80;
      if (!visible) return;
      const elCenter = rect.top + rect.height / 2;
      const distance = (elCenter - center) / Math.max(height * 0.88, 1);
      const power = Math.max(-1, Math.min(1, distance));
      const depth = Math.round((1 - Math.min(1, Math.abs(power))) * 24);
      const rotateX = power * -2.8;
      const rotateY = power * 2.6 * Number(el.dataset.m3dBaseX || 1);
      const lift = power * -7;
      el.style.transform = `perspective(1050px) translate3d(0, ${lift.toFixed(2)}px, ${depth}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    items.forEach((item, i) => {
      const factor = i === 0 ? 0.055 : i === 1 ? -0.035 : 0.045;
      const x = Math.sin(scrollY * factor * 0.02) * (i === 1 ? 10 : 7);
      const y = i === 1 ? scrollY * -0.028 : scrollY * 0.018;
      const z = i === 0 ? 56 : i === 1 ? 24 : 62;
      const rX = 56 + Math.sin(scrollY * 0.002 + i) * 10;
      const rY = -22 + Math.cos(scrollY * 0.0017 + i) * 12;
      item.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z}px) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg)`;
    });
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(updateScroll);
  }

  function bindTouchTilt() {
    // Subtle finger tilt for the top hero only. It never blocks scrolling.
    const heroCard = document.querySelector('.hero-image-card');
    if (!heroCard || heroCard.dataset.touch3d) return;
    heroCard.dataset.touch3d = '1';

    let startX = 0;
    let startY = 0;
    let touching = false;

    heroCard.addEventListener('touchstart', (event) => {
      if (!active || event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      touching = true;
    }, { passive: true });

    heroCard.addEventListener('touchmove', (event) => {
      if (!active || !touching || event.touches.length !== 1) return;
      const dx = (event.touches[0].clientX - startX) / 22;
      const dy = (event.touches[0].clientY - startY) / 28;
      const rx = Math.max(-5, Math.min(5, -dy));
      const ry = Math.max(-6, Math.min(6, dx));
      heroCard.style.transform = `perspective(1050px) translate3d(0,-2px,28px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      // Do not preventDefault: page remains naturally scrollable.
    }, { passive: true });

    heroCard.addEventListener('touchend', () => {
      touching = false;
      schedule();
    }, { passive: true });
  }

  function init() {
    setMobileState();
    bindTargets();
    bindTouchTilt();
    schedule();
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => {
    setMobileState();
    bindTargets();
    bindTouchTilt();
    schedule();
  }, { passive: true });
  mobileQuery.addEventListener?.('change', init);
  reduceMotion.addEventListener?.('change', init);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
