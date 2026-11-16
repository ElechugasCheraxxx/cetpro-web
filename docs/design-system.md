# Design system — CETPRO San Luis (v1)

**Fecha:** 16/11/2026 · **Estado:** implementado y en producción (`https://cetpro.pages.dev/`).
**Fuentes:** (1) `spec/SPEC.md` mobile-first + WCAG 2.1 AA; (2) Skills de UI de `.resources/skills/skills` (apple-design, emil-design-eng, mobile-native, animate); (3) `Docs/masterplan-pagina-web.md` v1.0.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#0b3d6e` | Marca primaria; fondo header translúcido |
| `--color-primary-dark` | `#072a4c` | Fondos hero/footer; texto de encabezados |
| `--color-accent` | `#f4c20d` | CTAs; tinte institucional; foco visible |
| `--color-accent-dark` | `#c99b00` | Bordes notice |
| `--color-surface` | `#f2f6fc` | Fondos de tarjetas |
| `--color-border` | `#d7e0ec` | Bordes |
| `--color-muted` | `#4a5568` | Texto secundario (AA sobre blanco) |

## Movimiento (Emil Kowalski rules)

- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` entradas/respuestas · `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` morphing · `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` drawers · `--ease-hover` hovers.
- Feedback presionado: `:active { transform: scale(0.97) }` con `transition: transform 160ms ease-out` (consistente con la frecuencia de clics de usuario).
- Tailwind/exprimidos eternos: `:hover` solo con `@media (hover: hover) and (pointer: fine)`.
- Reveal on view: `opacity 0→1` + `transform translateY(24px)→0` con `--ease-out`, `transition-delay` máximo 180ms (stagger). `will-change` solo durante la transición.
- Menú drawer mobile: `translateY(-8px)→0` `+ opacity` 240ms con `--ease-drawer`.
- **Reduced motion:** todas las transiciones caen a 160ms solo-opacity (Apple §14 / Emil §reduced-motion).
- Nada de `ease-in`; duración UI < 300ms; sin `transition: all`; sin `scale(0)`; `:focus-visible` siempre.

## Componentes interactiva

- `.btn`/`.btn.secondary`: press feedback + acción primaria visual. Min 44 × 44 px de área touch (hit area por padding 0.85rem).
- `.card`: elevación al hover con `translateY(-3px) + shadow + border-color` (solo hover-capable devices).
- `.site-header`: sticky translúcido `backdrop-filter saturate(160%) blur(14px)`; sombra en `.is-scrolled`; `env(safe-area-inset-top)`; `@media (prefers-reduced-transparency)` pinta fondo sólido.
- Tipografía: `system-ui` stack; tracking negativo (`-0.02em`) en headlines; tracking leve positivo en uppercase small-caps.

## Comportamientos móviles (skill mobile-native)

- `viewport-fit=cover`, `theme-color` light, `color-scheme: light`.
- `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation`, `overscroll-behavior: none`, `user-select: none` en controles, `font-size ≥ 16px` (sin inputs hoy).
- `@media (hover: hover)` para todos los efectos hover.

## Política de libs

Este sitio es estático y sin recolección de datos: **cero dependencias de producción**. No se necesitan motion libs (transiciones CSS son suficientes). `pick-ui-library`: nada aplicable — entre las skills gráficas solo la filosofía crítica de Sonner ("mínimos detalles que componen calidad") inspirada, no el componente.

## Entregables

- `src/assets/css/main.css` (tokens + reglas)
- `src/assets/js/nav.js` (menú a11y + IntersectionObserver reveal)
- Lighthouse ≥ 90 ×3 + SEO warn (noindex intencional E2).
