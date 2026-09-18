(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const latinDigits = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

  const menuToggle = $('#menuToggle');
  const mobileMenu = $('#mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const opening = mobileMenu.hidden;
      mobileMenu.hidden = !opening;
      menuToggle.setAttribute('aria-expanded', String(opening));
    });
    $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Before/after
  const compareView = $('#compareView');
  const compareRange = $('#compareRange');
  if (compareView && compareRange) {
    const set = value => compareView.style.setProperty('--split', `${value}%`);
    set(compareRange.value);
    compareRange.addEventListener('input', e => set(e.target.value));
  }

  // Portfolio
  const grid = $('#portfolioGrid');
  const filterBox = $('#filters');
  const searchBox = $('#portfolioSearch');
  if (grid && window.SONGOOL_PORTFOLIO) {
    let filter = 'all';
    let query = '';
    const savedKey = 'songool_luxe_saved';
    const getSaved = () => { try { return JSON.parse(localStorage.getItem(savedKey) || '[]'); } catch { return []; } };
    const save = ids => { try { localStorage.setItem(savedKey, JSON.stringify(ids)); } catch {} };
    const render = () => {
      const saved = getSaved();
      const label = window.SONGOOL_TYPE_LABELS || {};
      let items = window.SONGOOL_PORTFOLIO.filter(x => filter === 'all' || x.type === filter || (filter === 'saved' && saved.includes(x.id)));
      if (query) items = items.filter(x => `${x.title} ${x.meta}`.includes(query));
      grid.innerHTML = '';
      if (!items.length) { grid.innerHTML = '<div class="empty-state">برای این جستجو موردی پیدا نشد.</div>'; return; }
      const frag = document.createDocumentFragment();
      items.forEach(item => {
        const card = document.createElement('article');
        const isSaved = saved.includes(item.id);
        card.className = 'portfolio-card';
        card.tabIndex = 0;
        card.innerHTML = `<div class="portfolio-img"><img src="assets/images/${item.image}" alt="${item.title}" loading="lazy" decoding="async"><button class="save-card ${isSaved ? 'saved' : ''}" type="button" aria-label="${isSaved ? 'حذف از ذخیره‌ها' : 'ذخیره مدل'}">${isSaved ? '♥' : '♡'}</button></div><div class="portfolio-meta"><div><b>${item.title}</b><small>${item.meta}</small></div><span>${latinDigits(String(item.id).padStart(2,'0'))}</span></div>`;
        const open = () => window.openPortfolioModal?.(item);
        card.addEventListener('click', e => { if (!e.target.closest('.save-card')) open(); });
        card.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
        card.querySelector('.save-card').addEventListener('click', e => {
          e.stopPropagation();
          const ids = getSaved();
          const idx = ids.indexOf(item.id);
          if (idx >= 0) ids.splice(idx,1); else ids.push(item.id);
          save(ids); render();
        });
        frag.appendChild(card);
      });
      grid.appendChild(frag);
    };
    filterBox?.addEventListener('click', e => {
      const btn = e.target.closest('button[data-filter]'); if (!btn) return;
      $$('#filters button').forEach(b => b.classList.remove('active')); btn.classList.add('active'); filter = btn.dataset.filter; render();
    });
    searchBox?.addEventListener('input', e => { query = e.target.value.trim(); render(); });
    render();

    // lightweight modal
    const modal = document.createElement('dialog');
    modal.className = 'portfolio-modal';
    modal.innerHTML = '<button class="modal-x" aria-label="بستن">×</button><div class="modal-media"><img alt=""></div><div class="modal-body"><div class="eyebrow">PORTFOLIO</div><h3></h3><p></p><a class="btn-gold" href="booking.html">انتخاب برای رزرو ↙</a></div>';
    document.body.appendChild(modal);
    const img = $('.modal-media img', modal), title = $('.modal-body h3', modal), desc = $('.modal-body p', modal);
    window.openPortfolioModal = item => { img.src = `assets/images/${item.image}`; img.alt = item.title; title.textContent = item.title; desc.textContent = `${item.meta} — این تصویر برای نمایش سبک و فرم استفاده می‌شود.`; typeof modal.showModal === 'function' ? modal.showModal() : modal.setAttribute('open',''); };
    $('.modal-x', modal).addEventListener('click', () => modal.close?.());
    modal.addEventListener('click', e => { if (e.target === modal) modal.close?.(); });
  }

  // Style finder
  const finder = $('#finderPanel');
  if (finder) {
    let answers = {}; let step = 1;
    const showStep = n => { step = n; $$('.finder-step', finder).forEach(el => el.hidden = el.dataset.step !== String(n)); };
    $$('.finder-step button', finder).forEach(btn => btn.addEventListener('click', () => {
      const parent = btn.closest('.finder-step');
      if (parent.dataset.step === '1') answers.style = btn.dataset.value;
      if (parent.dataset.step === '2') answers.score = Number(btn.dataset.score);
      if (parent.dataset.step === '3') answers.mood = btn.dataset.mood;
      if (step < 3) showStep(step + 1); else {
        const map = {natural:['نچرال','سبک‌ترین انتخاب برای ظاهر مرتب و خیلی طبیعی.'],fluffy:['کرکی','برای بافت رو به بالا و حس مدرن‌تر.'],combo:['ترکیبی','برای قاب مشخص‌تر با عمق کنترل‌شده.'],powder:['پودری','برای جلوه مخملی و سایه‌ای.']};
        const rec = map[answers.style] || map.natural;
        const result = $('#finderResult');
        result.innerHTML = `<span>پیشنهاد اولیه</span><strong>${rec[0]}</strong><p>${rec[1]}</p><a class="btn-gold" href="booking.html">رزرو مشاوره ↙</a><button class="btn-line" id="finderReset" type="button">شروع دوباره</button>`;
        result.hidden = false; $$('.finder-step', finder).forEach(el => el.hidden = true);
        $('#finderReset')?.addEventListener('click', () => { answers = {}; result.hidden = true; showStep(1); });
      }
    }));
  }

  // Care checklist
  const careChecks = $$('.check-list input[type="checkbox"]');
  if (careChecks.length) {
    const bar = $('#careProgress'), label = $('#careProgressLabel');
    const update = () => { const done = careChecks.filter(x => x.checked).length; if (bar) bar.style.width = `${done / careChecks.length * 100}%`; if (label) label.textContent = `${latinDigits(done)} از ${latinDigits(careChecks.length)}`; };
    careChecks.forEach(c => c.addEventListener('change', update)); update();
  }

  // Booking form shared by booking.html
  const bookingForm = $('#bookingForm');
  if (bookingForm) {
    const getData = () => ({
      name: $('#bName')?.value.trim() || '', phone: $('#bPhone')?.value.trim() || '', style: $('#bStyle')?.value || 'انتخاب نشده', date: $('#bDate')?.value || 'تعیین نشده', message: $('#bMessage')?.value.trim() || 'بدون توضیح'
    });
    const buildText = () => { const d = getData(); return `سلام سون گول، برای میکروبلیدینگ ابرو درخواست رزرو دارم.\nنام: ${d.name}\nتماس: ${d.phone}\nاستایل: ${d.style}\nتاریخ پیشنهادی: ${d.date}\nتوضیحات: ${d.message}`; };
    const status = $('#bookingStatus');
    bookingForm.addEventListener('submit', e => { e.preventDefault(); const d = getData(); if (!d.name || !d.phone) { if (status) status.textContent = 'نام و شماره تماس را وارد کن.'; return; } try { localStorage.setItem('songool_luxe_booking', buildText()); } catch {} if (status) status.textContent = 'درخواست آماده شد. حالا می‌توانی متن را کپی یا اشتراک‌گذاری کنی.'; });
    $('#copyBooking')?.addEventListener('click', async () => { const text = buildText(); try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); if (status) status.textContent = 'متن درخواست کپی شد.'; } else window.prompt('متن درخواست:', text); } catch {} });
    $('#shareBooking')?.addEventListener('click', async () => { const text = buildText(); try { if (navigator.share) await navigator.share({title:'درخواست رزرو سون گول',text}); else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); if (status) status.textContent = 'متن درخواست کپی شد.'; } } catch {} });
  }
})();
