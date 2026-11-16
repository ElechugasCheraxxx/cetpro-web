/* nav.js — único JS del sitio (≤ 2 KB). Sin frameworks ni libs.
   1) Menú móvil accesible. 2) Header translúcido que gana sombra al scrollearse.
   3) Reveal on view con IntersectionObserver (transform + opacity only; sin JS pesado). */
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });
  nav.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (nav.getAttribute('data-open') === 'true' && !nav.contains(e.target) && e.target !== toggle) {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Header: añadir sombra cuando la página se mueve (Apple §12 — scroll edge effect) */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

const targets = document.querySelectorAll('.reveal');
// Mantenemos la clase en CSS; el JS ya no anima (estático, sin dependencia).
