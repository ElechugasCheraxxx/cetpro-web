/* nav.js — único JS propio. Sin frameworks. ≤ 4 KB.
   1) Menú móvil accesible. 2) Header translúcido que gana sombra al scrollearse.
   3) GSAP ScrollTrigger parallax/expand imágenes (parallax img + reveal). */

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
  const onScroll = () => { header.classList.toggle('is-scrolled', window.scrollY > 12); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* GSAP ScrollTrigger — parallax + expand */
if (window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero: entrada suave con scale + clip on load (una vez)
  const heroImg = document.querySelector('.hero-media img');
  if (heroImg) {
    gsap.fromTo(heroImg,
      { scale: 0.93, clipPath: 'inset(10% 8% 10% 12%)' },
      { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out' });
  }

  // Imagenes parallax: scale vinculada al progreso de scroll (siempre visibles)
  document.querySelectorAll('.parallax').forEach((img) => {
    if (img.closest('.hero-media')) return; // hero ya animada en carga
    gsap.fromTo(img,
      { scale: 1.14 },
      {
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('figure') ?? img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
  });

  // Hero copy: visible por defecto (sin animación above-the-fold).
}
