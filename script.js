// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const onScroll = () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', onScroll, { passive: true });

// ===== SCROLL REVEAL ANIMATIONS =====
const revealEls = document.querySelectorAll(
  '.about-wrap > *, .menu-featured, .menu-side-card, .gal-item, .review-card, .info-row, .stat, .pillar'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 4 === 1) el.classList.add('reveal-delay-1');
  if (i % 4 === 2) el.classList.add('reveal-delay-2');
  if (i % 4 === 3) el.classList.add('reveal-delay-3');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ===== RATING BAR ANIMATION =====
const ratingSection = document.getElementById('reviews');
const barObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.fill').forEach(fill => {
      const w = fill.style.width;
      fill.style.width = '0%';
      requestAnimationFrame(() => { fill.style.width = w; });
    });
    barObserver.disconnect();
  }
}, { threshold: 0.3 });
if (ratingSection) barObserver.observe(ratingSection);

// ===== GALLERY LIGHTBOX (simple) =====
document.querySelectorAll('.gal-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.92);
      display:flex;align-items:center;justify-content:center;cursor:zoom-out;
      animation:fadeIn .25s ease;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    bigImg.style.cssText = 'max-width:92vw;max-height:90vh;border-radius:8px;object-fit:contain;box-shadow:0 20px 80px rgba(0,0,0,.5);';
    overlay.appendChild(bigImg);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
    document.addEventListener('keydown', e => { if(e.key==='Escape') overlay.remove(); }, {once:true});
  });
});

// ===== INJECT ANIMATION KEYFRAME =====
const s = document.createElement('style');
s.textContent = `@keyframes fadeIn{from{opacity:0}to{opacity:1}}`;
document.head.appendChild(s);
