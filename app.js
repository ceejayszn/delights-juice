// NAV
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav')) closeNav();
});

function closeNav() {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
}

// SCROLL NAV SHADOW
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,.1)' : 'none';
}, { passive: true });

// FADE IN on scroll
const fades = document.querySelectorAll('.menu-card, .flavour-card, .contact-row, .treat-block');
fades.forEach(el => el.classList.add('fade'));

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
fades.forEach(el => obs.observe(el));

// FAB hide on footer
const fab    = document.getElementById('fab');
const footer = document.querySelector('.footer');
const fabObs = new IntersectionObserver(entries => {
  fab.style.opacity      = entries[0].isIntersecting ? '0' : '1';
  fab.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
}, { threshold: 0.1 });
if (footer) fabObs.observe(footer);

// Broken image fallback
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.background = '#f0f0f0';
    img.style.minHeight  = '80px';
    img.removeAttribute('src');
  });
});
