(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const faDigits = value => String(value).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

  // Mobile navigation
  const menuButton = $('#menuButton');
  const mobileMenu = $('#mobileMenu');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      mobileMenu.hidden = open;
    });
    $$('#mobileMenu a').forEach(link => link.addEventListener('click', () => {
      mobileMenu.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  // Soft falling petals: light, limited, no canvas or library.
  const petalLayer = $('#petalLayer');
  if (petalLayer) {
    for (let i = 0; i < 14; i += 1) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${10 + Math.random() * 7}s`;
      petal.style.animationDelay = `${-Math.random() * 14}s`;
      petal.style.transform = `rotate(${Math.random() * 180}deg)`;
      petalLayer.appendChild(petal);
    }
  }

  // Scroll reveal
  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 })
    : null;
  if (revealObserver) {
    $$('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }

  // Before / After sliders. The native range handles touch + mouse reliably.
  $$('.before-after').forEach(panel => {
    const range = $('.ba-range', panel);
    if (!range) return;
    const update = () => panel.style.setProperty('--split', `${range.value}%`);
    range.addEventListener('input', update, { passive: true });
    range.addEventListener('change', update, { passive: true });
    update();
  });

  const items = [
    ['01', 'نچرال امضایی', 'natural', 'نچرال', 'تارهای ظریف با قوس آرام و حس بسیار طبیعی.', 'assets/images/portfolio-01.webp'],
    ['02', 'فیدر کرکی', 'fluffy', 'کرکی', 'تارهای رو به بالا با فضای باز و بافت سبک.', 'assets/images/portfolio-02.webp'],
    ['03', 'کمبو بالانس', 'combo', 'ترکیبی', 'ترکیب تارهای مویی و سایه‌ی ملایم برای عمق کنترل‌شده.', 'assets/images/portfolio-03.webp'],
    ['04', 'سافت پودری', 'powder', 'پودری', 'هاله‌ی نرم و یکدست برای قاب مرتب‌تر.', 'assets/images/portfolio-04.webp'],
    ['05', 'نچرال بلند', 'natural', 'نچرال', 'فرم کشیده و سبک با تاکید روی رشد طبیعی.', 'assets/images/portfolio-05.webp'],
    ['06', 'براشد فِیثر', 'fluffy', 'کرکی', 'حالت براش‌خورده و لطافت بیشتر در تاج ابرو.', 'assets/images/portfolio-06.webp'],
    ['07', 'کمبو سافت', 'combo', 'ترکیبی', 'هاشورهای سبک در جلو و سایه‌ی تدریجی در دم.', 'assets/images/portfolio-07.webp'],
    ['08', 'پودر مخملی', 'powder', 'پودری', 'بافت پودری نرم با لبه‌های کنترل‌شده.', 'assets/images/portfolio-08.webp'],
    ['09', 'هیرلاین نچرال', 'natural', 'نچرال', 'تاکید روی تارهای تکی و جهت رشد طبیعی.', 'assets/images/portfolio-09.webp'],
    ['10', 'فِیثر کلین', 'fluffy', 'کرکی', 'تارهای جدا از هم برای سبک مدرن و مرتب.', 'assets/images/portfolio-10.webp'],
    ['11', 'کمبو رز', 'combo', 'ترکیبی', 'بافت مو در بخش داخلی و سایه‌ی رقیق در دم.', 'assets/images/portfolio-11.webp'],
    ['12', 'پودر گلد', 'powder', 'پودری', 'سایه‌ی گرم و نرم با تاکید ظریف روی قوس.', 'assets/images/portfolio-12.webp'],
    ['13', 'آرچ نچرال', 'natural', 'نچرال', 'قوس کنترل‌شده و تاج آرام برای حفظ حس طبیعی.', 'assets/images/portfolio-13.webp'],
    ['14', 'فِیثر اِیر', 'fluffy', 'کرکی', 'حجم بصری بالا بدون لبه‌ی سنگین.', 'assets/images/portfolio-14.webp'],
    ['15', 'نانو کمبو', 'combo', 'ترکیبی', 'جزئیات مویی دقیق همراه با پخش سایه در دم.', 'assets/images/portfolio-15.webp'],
    ['16', 'سافت میست', 'powder', 'پودری', 'هاله‌ی سایه‌ای نرم با تمرکز کمتر در تاج.', 'assets/images/portfolio-16.webp'],
    ['17', 'امضای سون گول', 'natural', 'نچرال', 'فرم شخصی‌سازی‌شده برای استایل طبیعی و لوکس.', 'assets/images/portfolio-17.webp'],
    ['18', 'گلاس کمبو', 'combo', 'ترکیبی', 'قاب تمیز با جزئیات تار و پایان بسیار نرم.', 'assets/images/portfolio-18.webp'],
    ['19', 'فِیثر برونت', 'fluffy', 'کرکی', 'پر، سبک و طبیعی برای ابروی پرحضور.', 'assets/images/portfolio-19.webp'],
    ['20', 'مینیمال پودری', 'powder', 'پودری', 'سایه‌ی کنترل‌شده برای نتیجه‌ی مرتب و کم‌کنتراست.', 'assets/images/portfolio-20.webp']
  ].map(([id, title, style, label, description, image]) => ({ id, title, style, label, description, image }));

  const gallery = $('#gallery');
  const filters = $('#filters');
  const searchInput = $('#searchInput');
  const savedCount = $('#savedCount');
  const savedKey = 'songool-favorites-v3';
  let saved = new Set();
  let currentItem = null;

  try {
    const stored = JSON.parse(localStorage.getItem(savedKey) || '[]');
    if (Array.isArray(stored)) saved = new Set(stored.map(String));
  } catch (_) {
    saved = new Set();
  }

  const syncSavedCount = () => {
    if (savedCount) savedCount.textContent = faDigits(saved.size);
  };

  const styleMatch = (item, filter) => filter === 'all' ? true : filter === 'saved' ? saved.has(item.id) : item.style === filter;

  function renderGallery() {
    if (!gallery) return;
    const active = $('.filters button.active')?.dataset.filter || 'all';
    const query = (searchInput?.value || '').trim().toLowerCase();
    const matches = items.filter(item => {
      if (!styleMatch(item, active)) return false;
      if (!query) return true;
      return `${item.title} ${item.label} ${item.description}`.toLowerCase().includes(query);
    });

    gallery.innerHTML = '';
    if (!matches.length) {
      gallery.innerHTML = '<div class="empty">مدلی با این فیلتر یا جست‌وجو پیدا نشد.</div>';
      syncSavedCount();
      return;
    }

    const frag = document.createDocumentFragment();
    matches.forEach(item => {
      const card = document.createElement('article');
      card.className = 'work-card reveal';
      card.innerHTML = `
        <button class="heart ${saved.has(item.id) ? 'saved' : ''}" type="button" aria-label="${saved.has(item.id) ? 'حذف از ذخیره‌ها' : 'ذخیره مدل'}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>
        </button>
        <button class="work-open" type="button">
          <span class="work-image"><img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" width="900" height="700"><span class="work-number">${item.id}</span></span>
          <span class="work-copy"><span class="work-meta">${item.label} · مرجع تصویری</span><strong>${item.title}</strong><span class="work-arrow">↙</span></span>
        </button>`;
      frag.appendChild(card);

      $('.work-open', card).addEventListener('click', () => openModal(item));
      $('.heart', card).addEventListener('click', event => {
        event.stopPropagation();
        if (saved.has(item.id)) saved.delete(item.id); else saved.add(item.id);
        localStorage.setItem(savedKey, JSON.stringify([...saved]));
        renderGallery();
      });
    });
    gallery.appendChild(frag);
    syncSavedCount();
    if (revealObserver) $$('.reveal:not(.in)', gallery).forEach(el => revealObserver.observe(el));
    else $$('.reveal', gallery).forEach(el => el.classList.add('in'));
  }

  filters?.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    $$('#filters button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderGallery();
  });
  searchInput?.addEventListener('input', renderGallery);

  const modal = $('#workModal');
  const modalImage = $('#modalImage');
  const modalMeta = $('#modalMeta');
  const modalTitle = $('#modalTitle');
  const modalDesc = $('#modalDesc');
  const modalFav = $('#modalFav');
  const modalClose = $('#modalClose');

  function openModal(item) {
    currentItem = item;
    if (!modal) return;
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalMeta.textContent = `${item.id} · ${item.label} · مرجع تصویری`;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;
    modalFav.textContent = saved.has(item.id) ? 'حذف از ذخیره‌ها' : 'ذخیره مدل';
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    if (typeof modal.close === 'function') modal.close(); else modal.removeAttribute('open');
    document.body.style.overflow = '';
  }
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  modalFav?.addEventListener('click', () => {
    if (!currentItem) return;
    if (saved.has(currentItem.id)) saved.delete(currentItem.id); else saved.add(currentItem.id);
    localStorage.setItem(savedKey, JSON.stringify([...saved]));
    syncSavedCount();
    modalFav.textContent = saved.has(currentItem.id) ? 'حذف از ذخیره‌ها' : 'ذخیره مدل';
  });
  $('#modalBook')?.addEventListener('click', () => {
    if (!currentItem) return;
    const styleMap = { natural:'نچرال', fluffy:'کرکی', combo:'ترکیبی', powder:'پودری' };
    const style = $('#style');
    const message = $('#message');
    if (style) style.value = styleMap[currentItem.style] || '';
    if (message) message.value = `مدل انتخابی: ${currentItem.title}`;
    closeModal();
    $('#booking')?.scrollIntoView({ behavior:'smooth', block:'start' });
  });

  // Booking form: local only, with share + copy fallbacks.
  const form = $('#bookingForm');
  const status = $('#formStatus');
  const bookingKey = 'songool-booking-v3';
  const date = $('#date');
  if (date) date.min = new Date().toISOString().slice(0, 10);

  function bookingData() {
    const fd = new FormData(form);
    return {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      style: String(fd.get('style') || '').trim(),
      date: String(fd.get('date') || '').trim(),
      message: String(fd.get('message') || '').trim(),
      savedAt: new Date().toISOString()
    };
  }
  function bookingText(b) {
    return `درخواست رزرو سون گول\n\nنام: ${b.name}\nشماره تماس: ${b.phone}\nاستایل: ${b.style || 'تعیین نشده'}\nتاریخ پیشنهادی: ${b.date || 'تعیین نشده'}\nتوضیحات: ${b.message || 'ندارد'}`;
  }
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = bookingData();
    if (data.name.length < 2 || data.phone.length < 7) {
      if (status) status.textContent = 'لطفاً نام و شماره تماس را کامل وارد کن.';
      return;
    }
    localStorage.setItem(bookingKey, JSON.stringify(data));
    if (status) status.textContent = 'درخواست روی همین دستگاه ذخیره شد. می‌توانی خلاصه را کپی یا با گوشی به اشتراک بگذاری.';
  });

  function getSavedBookingText() {
    try {
      const raw = localStorage.getItem(bookingKey);
      return raw ? bookingText(JSON.parse(raw)) : '';
    } catch (_) { return ''; }
  }

  $('#copyBtn')?.addEventListener('click', async () => {
    const text = getSavedBookingText();
    if (!text) { if (status) status.textContent = 'ابتدا فرم را ثبت کن.'; return; }
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = 'خلاصه درخواست کپی شد.';
    } catch (_) {
      if (status) status.textContent = 'کپی خودکار توسط مرورگر در دسترس نیست.';
    }
  });

  $('#shareBtn')?.addEventListener('click', async () => {
    const text = getSavedBookingText();
    if (!text) { if (status) status.textContent = 'ابتدا فرم را ثبت کن.'; return; }
    if (navigator.share) {
      try {
        await navigator.share({ title:'درخواست رزرو سون گول', text });
        if (status) status.textContent = 'خلاصه درخواست به اشتراک گذاشته شد.';
        return;
      } catch (_) { /* user cancelled or share unavailable; use copy fallback */ }
    }
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = 'گزینه اشتراک‌گذاری در این مرورگر در دسترس نیست؛ خلاصه کپی شد.';
    } catch (_) {
      if (status) status.textContent = 'اشتراک‌گذاری یا کپی در این مرورگر در دسترس نیست.';
    }
  });

  renderGallery();
})();
