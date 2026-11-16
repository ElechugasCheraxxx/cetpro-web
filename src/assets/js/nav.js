// nav.js — único JS del sitio. Menú móvil accesible. ≤ 2 KB sin minificar.
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
