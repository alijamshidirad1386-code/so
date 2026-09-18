const portfolio = [
  {id:1,title:'نچرال ابریشمی',category:'natural',categoryFa:'نچرال',desc:'خطوط بسیار ظریف با فاصله‌های کنترل‌شده؛ مناسب چهره‌هایی که ظاهر آرام و مینیمال می‌خواهند.',tags:['کم‌تراکم','ظریف','روشن'],image:'assets/images/portfolio-01.svg'},
  {id:2,title:'کرکی کلاسیک',category:'fluffy',categoryFa:'کرکی',desc:'تارهای سبک و پرتحرک با فرم رو به بالا برای جلوه‌ای جوان‌تر و مرتب‌تر.',tags:['کرکی','رو به بالا','طبیعی'],image:'assets/images/portfolio-02.svg'},
  {id:3,title:'قوس نرم',category:'natural',categoryFa:'نچرال',desc:'قوس ملایم و انتهای کمی کشیده برای چشم‌هایی که فرم بازتر و تمیزتر می‌خواهند.',tags:['قوس نرم','تمیز','متعادل'],image:'assets/images/portfolio-03.svg'},
  {id:4,title:'نچرال گرم',category:'natural',categoryFa:'نچرال',desc:'استایل گرم با هاشورهای نرم و تغییر جهت تدریجی در بخش میانی ابرو.',tags:['گرم','ملایم','نچرال'],image:'assets/images/portfolio-04.svg'},
  {id:5,title:'فاکسی ظریف',category:'fluffy',categoryFa:'کرکی',desc:'انتهای کشیده و تارهای رو به بیرون، بدون ایجاد حس سنگینی یا فرم مصنوعی.',tags:['فاکسی','کشیده','سبک'],image:'assets/images/portfolio-05.svg'},
  {id:6,title:'ترکیبی ساتن',category:'combo',categoryFa:'ترکیبی',desc:'تارهای مویی در ابتدای ابرو و شیدینگ کنترل‌شده در بدنه برای حجم بیشتر.',tags:['ترکیبی','حجم','ساتن'],image:'assets/images/portfolio-06.svg'},
  {id:7,title:'پودری لطیف',category:'powder',categoryFa:'پودری',desc:'شیدینگ بسیار نرم و یکدست برای ظاهری مرتب که در عکس هم تمیز دیده می‌شود.',tags:['پودری','یکدست','نرم'],image:'assets/images/portfolio-07.svg'},
  {id:8,title:'کرکی مهمانی',category:'fluffy',categoryFa:'کرکی',desc:'تارهای آشکارتر در بدنه با انتهای نرم؛ انتخابی جذاب برای چهره‌های گرافیکی‌تر.',tags:['کرکی','گرافیکی','پرجلوه'],image:'assets/images/portfolio-08.svg'},
  {id:9,title:'نانو نچرال',category:'combo',categoryFa:'ترکیبی',desc:'حس تار به تار در کنار سایه‌ای بسیار سبک برای کسانی که ابروی خالی دارند.',tags:['نانو','تار به تار','حجم'],image:'assets/images/portfolio-09.svg'},
  {id:10,title:'ابروی کلاسیک',category:'powder',categoryFa:'پودری',desc:'فرم متقارن و تمیز با شدت سایه کنترل‌شده در دم ابرو.',tags:['کلاسیک','مرتب','متقارن'],image:'assets/images/portfolio-10.svg'},
  {id:11,title:'پَر نرم',category:'fluffy',categoryFa:'کرکی',desc:'تارهای شکسته و طبیعی برای کسانی که دوست دارند ظاهر ابرو مثل موی واقعی خوانده شود.',tags:['پَر','واقعی','سبک'],image:'assets/images/portfolio-11.svg'},
  {id:12,title:'نچرال مینیمال',category:'natural',categoryFa:'نچرال',desc:'حداقل هاشور ممکن با تمرکز روی جاهای خالی؛ مخصوص طرفداران ظاهر «هیچ‌کار نکرده».',tags:['مینیمال','جاهای خالی','نامحسوس'],image:'assets/images/portfolio-12.svg'},
  {id:13,title:'ترکیبی مخملی',category:'combo',categoryFa:'ترکیبی',desc:'شروع نرم و لطیف در سر ابرو، با بدنه‌ای پرتر و انتهایی تمیز و جمع‌وجور.',tags:['مخملی','ترکیبی','مرتب'],image:'assets/images/portfolio-13.svg'},
  {id:14,title:'پودری نچرال',category:'powder',categoryFa:'پودری',desc:'سایه‌ای مات و سبک با مرزهای محو برای ابرویی مرتب و روزمره.',tags:['مات','روزمره','محو'],image:'assets/images/portfolio-14.svg'},
  {id:15,title:'قوس سلطنتی',category:'fluffy',categoryFa:'کرکی',desc:'قوس کمی بلندتر با تارهای رو به بالا برای نگاه بازتر و استایل مجلسی‌تر.',tags:['قوس بلند','مجلسی','کشیده'],image:'assets/images/portfolio-15.svg'},
  {id:16,title:'ابروی روشن',category:'natural',categoryFa:'نچرال',desc:'خطوط روشن و نازک برای موی ابرو و چهره‌هایی با کنتراست پایین.',tags:['روشن','نازک','نرم'],image:'assets/images/portfolio-16.svg'},
  {id:17,title:'هیبرید لوکس',category:'combo',categoryFa:'ترکیبی',desc:'تکنیک ترکیبی برای ظاهر پرتر، اما با شروع طبیعی و تارهای تفکیک‌شده.',tags:['لوکس','هیبرید','پرتر'],image:'assets/images/portfolio-17.svg'},
  {id:18,title:'پودری ابریشمی',category:'powder',categoryFa:'پودری',desc:'گرادیان بسیار نرم از ابتدای ابرو تا دم؛ مناسب استایل مرتب و آرایش‌دوست.',tags:['گرادیان','ابریشمی','تمیز'],image:'assets/images/portfolio-18.svg'},
  {id:19,title:'کرکی ژورنالی',category:'fluffy',categoryFa:'کرکی',desc:'تارهای برجسته و کمی نامنظم برای حس ادیتوریال و مدرن، بدون فرم خشک.',tags:['ژورنالی','مدرن','خوش‌تراکم'],image:'assets/images/portfolio-19.svg'},
  {id:20,title:'امضای Songul',category:'combo',categoryFa:'ترکیبی',desc:'مدل امضای استودیو: شروع تار به تار، بدنه متعادل و سایه بسیار سبک در دم.',tags:['امضایی','تعادل','تخصصی'],image:'assets/images/portfolio-20.svg'}
];

const grid = document.getElementById('portfolioGrid');
const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalTags = document.getElementById('modalTags');
const modalBooking = document.getElementById('modalBooking');
const closeModal = () => modal?.open && modal.close();

function renderPortfolio(filter='all'){
  const visible = filter === 'all' ? portfolio : portfolio.filter(item => item.category === filter);
  grid.innerHTML = visible.map(item => `
    <article class="portfolio-card" data-id="${item.id}" tabindex="0" aria-label="نمایش ${item.title}">
      <img class="portfolio-image" src="${item.image}" alt="نمونه سبک ${item.title}" loading="lazy">
      <div class="portfolio-info"><div class="portfolio-top"><h3>${item.title}</h3><span class="chip">${item.categoryFa}</span></div><p>${item.desc}</p></div>
    </article>`).join('');
}
function openPortfolio(id){
  const item = portfolio.find(x => x.id === Number(id));
  if(!item || !modal) return;
  modalImage.src = item.image; modalImage.alt = `نمونه سبک ${item.title}`;
  modalTitle.textContent = item.title; modalDescription.textContent = item.desc; modalCategory.textContent = `${item.categoryFa} · LOOK ${String(item.id).padStart(2,'0')}`;
  modalTags.innerHTML = item.tags.map(t=>`<span>${t}</span>`).join('');
  modalBooking.dataset.style = item.title;
  modal.showModal();
}
grid.addEventListener('click',e=>{const card=e.target.closest('.portfolio-card'); if(card) openPortfolio(card.dataset.id);});
grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ') && e.target.classList.contains('portfolio-card')){e.preventDefault();openPortfolio(e.target.dataset.id);}});
document.getElementById('modalClose')?.addEventListener('click',closeModal);
modalBooking?.addEventListener('click',e=>{e.preventDefault(); const style=modalBooking.dataset.style; closeModal(); document.querySelector('#booking select[name="style"]').value = style; document.querySelector('#booking').scrollIntoView({behavior:'smooth'});});
modal?.addEventListener('click',e=>{if(e.target===modal) closeModal();});

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('is-active')); btn.classList.add('is-active'); renderPortfolio(btn.dataset.filter);
}));

const bookingForm = document.getElementById('bookingForm');
const success = document.getElementById('bookingSuccess');
const successText = document.getElementById('successText');
bookingForm.addEventListener('submit', e=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(bookingForm).entries());
  if(!data.name.trim() || !data.phone.trim()){
    bookingForm.querySelector('[name="name"]').reportValidity();
    if(!data.name.trim()) bookingForm.querySelector('[name="name"]').focus(); else bookingForm.querySelector('[name="phone"]').focus();
    return;
  }
  const request = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem('songul_booking_requests') || '[]');
  existing.unshift(request); localStorage.setItem('songul_booking_requests', JSON.stringify(existing.slice(0,10)));
  successText.textContent = `درخواست ${data.name} برای «${data.style}» روی همین دستگاه ذخیره شد. برای نهایی‌کردن زمان، می‌توانی بعد از این مرحله از بخش اینستاگرام پیام بدهی.`;
  success.showModal(); bookingForm.reset();
});
document.getElementById('successClose').addEventListener('click',()=>success.close());
success.addEventListener('click',e=>{if(e.target===success) success.close();});

// Smooth anchor links also close open dialogs.
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{ if(modal?.open) closeModal(); }));
renderPortfolio();
