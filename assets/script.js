const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// Decorative petals: tiny and lightweight, no external requests.
const petals = $('#petals');
if (petals) {
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.style.left = `${Math.random()*100}%`;
    p.style.animationDuration = `${12 + Math.random()*13}s`;
    p.style.animationDelay = `${-Math.random()*18}s`;
    p.style.setProperty('--drift', `${(Math.random()*2-1)*120}px`);
    petals.appendChild(p);
  }
}

// Mobile menu
const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = !mobileMenu.hasAttribute('hidden');
    if (open) mobileMenu.setAttribute('hidden',''); else mobileMenu.removeAttribute('hidden');
    menuBtn.setAttribute('aria-expanded', String(!open));
  });
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.setAttribute('hidden','');
    menuBtn.setAttribute('aria-expanded','false');
  }));
}

// Real draggable before/after slider.
const comparison = $('#comparison');
const range = $('#comparisonRange');
if (comparison && range) {
  const setSplit = value => comparison.style.setProperty('--split', `${value}%`);
  setSplit(range.value);
  range.addEventListener('input', e => setSplit(e.target.value));
}

// Portfolio data using the site's existing local images.
const portfolioData = [
  ['portfolio-01.webp','نچرال','تارهای نرم و قاب طبیعی','natural'],
  ['portfolio-02.webp','نچرال','فرم تمیز و سبک','natural'],
  ['portfolio-03.webp','کرکی','حالت airy و رو به بالا','fluffy'],
  ['portfolio-04.webp','کرکی','بافت سبک و کشیده','fluffy'],
  ['portfolio-05.webp','ترکیبی','عمق نرم با ظاهر طبیعی','combo'],
  ['portfolio-06.webp','ترکیبی','تار + سایه کنترل‌شده','combo'],
  ['portfolio-07.webp','نچرال','قاب ظریف و سبک','natural'],
  ['portfolio-08.webp','کرکی','جهت تارهای رو به بالا','fluffy'],
  ['portfolio-09.webp','ترکیبی','تراکم کنترل‌شده','combo'],
  ['portfolio-10.webp','پودری','هاله سایه‌ای نرم','powder'],
  ['portfolio-11.webp','نچرال','حس نرم و روزمره','natural'],
  ['portfolio-12.webp','کرکی','تارهای لطیف و بلند','fluffy'],
  ['portfolio-13.webp','ترکیبی','فرم مشخص با بافت طبیعی','combo'],
  ['portfolio-14.webp','نچرال','فرم ملایم و روشن','natural'],
  ['portfolio-15.webp','ترکیبی','قوس دقیق و لطیف','combo'],
  ['portfolio-16.webp','کرکی','بافت تار به تار','fluffy'],
  ['portfolio-17.webp','پودری','کادر مشخص و نرم','powder'],
  ['portfolio-18.webp','نچرال','بافت طبیعی ابرو','natural'],
  ['portfolio-19.webp','پودری','هاله سبک برای قاب بیشتر','powder'],
  ['portfolio-20.webp','ترکیبی','ترکیب تار و سایه','combo']
].map((x,i)=>({id:i+1, image:x[0], title:x[1], desc:x[2], filter:x[3]}));

const storageKey = 'songool_saved_models_v3';
const getSaved = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; } };
const setSaved = arr => { try { localStorage.setItem(storageKey, JSON.stringify(arr)); } catch {} };
let currentFilter = 'all';
let query = '';
const gallery = $('#gallery');
const savedCount = $('#savedCount');

const renderGallery = () => {
  if (!gallery) return;
  const saved = getSaved();
  if (savedCount) savedCount.textContent = String(saved.length).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
  let list = portfolioData.filter(item => currentFilter === 'all' ? true : currentFilter === 'saved' ? saved.includes(item.id) : item.filter === currentFilter);
  if (query) list = list.filter(item => `${item.title} ${item.desc}`.includes(query));
  gallery.innerHTML = '';
  if (!list.length) { gallery.innerHTML = '<div class="empty">موردی برای این فیلتر پیدا نشد.</div>'; return; }
  const frag = document.createDocumentFragment();
  list.forEach(item => {
    const card = document.createElement('article');
    card.className = 'gallery-card';
    card.tabIndex = 0;
    const isSaved = saved.includes(item.id);
    card.innerHTML = `<button class="save-btn ${isSaved?'active':''}" aria-label="${isSaved?'حذف از ذخیره‌ها':'ذخیره مدل'}">${isSaved?'♥':'♡'}</button><img src="assets/images/${item.image}" alt="${item.title} — ${item.desc}" loading="lazy" decoding="async"><div class="gallery-meta"><b>${item.title}</b><span>${String(item.id).padStart(2,'0')}</span></div>`;
    const open = e => { if (e.target.closest('.save-btn')) return; openModal(item); };
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') open(e); });
    card.querySelector('.save-btn').addEventListener('click', e => {
      e.stopPropagation();
      const now = getSaved();
      const index = now.indexOf(item.id);
      if (index >= 0) now.splice(index,1); else now.push(item.id);
      setSaved(now); renderGallery();
    });
    frag.appendChild(card);
  });
  gallery.appendChild(frag);
};

$$('#filters button').forEach(btn => btn.addEventListener('click', () => {
  $$('#filters button').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = btn.dataset.filter;
  renderGallery();
}));
const search = $('#search');
if (search) search.addEventListener('input', e => { query = e.target.value.trim(); renderGallery(); });

// Modal
const modal = $('#modal');
const modalImg = $('#modalImg');
const modalMeta = $('#modalMeta');
const modalTitle = $('#modalTitle');
const modalDesc = $('#modalDesc');
let modalItem = null;
function openModal(item){
  modalItem = item;
  modalImg.src = `assets/images/${item.image}`;
  modalImg.alt = item.title;
  modalMeta.textContent = `MODEL ${String(item.id).padStart(2,'0')} · ${item.filter.toUpperCase()}`;
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.desc;
  if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open','');
}
const closeModal = () => { if (modal && modal.open) modal.close(); };
$('#modalClose')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
$('#modalBook')?.addEventListener('click', () => { closeModal(); location.hash = '#booking'; });
$('#modalFav')?.addEventListener('click', () => {
  if (!modalItem) return;
  const now = getSaved();
  if (!now.includes(modalItem.id)) now.push(modalItem.id);
  setSaved(now); renderGallery();
});

// Booking form: local demo + copy/share.
const bookingForm = $('#bookingForm');
const status = $('#status');
function bookingText(){
  const name = $('#name')?.value.trim();
  const phone = $('#phone')?.value.trim();
  const style = $('#style')?.value || 'انتخاب نشده';
  const date = $('#date')?.value || 'تعیین نشده';
  const message = $('#message')?.value.trim() || 'بدون توضیح';
  return `سلام سون گول، برای میکروبلیدینگ ابرو درخواست رزرو دارم.\nنام: ${name}\nتماس: ${phone}\nاستایل: ${style}\nتاریخ پیشنهادی: ${date}\nتوضیحات: ${message}`;
}
bookingForm?.addEventListener('submit', e => {
  e.preventDefault();
  const text = bookingText();
  try { localStorage.setItem('songool_booking_v3', text); } catch {}
  if (status) status.textContent = 'درخواست روی همین دستگاه آماده شد. از دکمه «کپی / اشتراک‌گذاری» برای انتقال آن استفاده کن.';
});
$('#shareBtn')?.addEventListener('click', async () => {
  const text = bookingText();
  try {
    if (navigator.share) { await navigator.share({title:'درخواست رزرو سون گول', text}); }
    else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); if (status) status.textContent='متن درخواست کپی شد.'; }
    else { window.prompt('متن درخواست را کپی کن:', text); }
  } catch {}
});

renderGallery();
