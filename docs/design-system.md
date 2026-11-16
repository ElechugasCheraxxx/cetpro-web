# Design system — CETPRO San Luis (v2)

**Evolución a v2:** adopta `ui-ux-pro-max-skill` (nextlevelbuilder) → MASTER persistido en `design-system/cetpro-san-luis/MASTER.md` (paleta "Accessible & Ethical — Government/Education"; tipografía Atkinson Hyperlegible auto-hospedada; patrón Minimal Single Column).

**Fecha:** 16/11/2026 · **Estado:** implementado y desplegado en producción (`https://cetpro.pages.dev/`).

## Paleta (MASTER.md)

| Token | Hex | Rol | Contraste |
|---|---|---|---|
| `--color-primary` | `#0F172A` (slate-900) | Texto de encabezados, fondo CTA | vs #FFFFFF 16.1:1 ✓ |
| `--color-primary-dark` | `#020617` (slate-950) | Héroe/footer | vs #FFFFFF 19.2:1 ✓ |
| `--color-accent` | `#0369A1` (sky-700) | CTA secundario, cursors, anillos | vs #FFFFFF 5.1:1 ✓ AA |
| `--color-accent-dark` | `#075279` | Bordes | vs #FFFFFF 6.6:1 |
| `--color-text` | `#020617` | Cuerpo | vs #F8FAFC 19.2:1 |
| `--color-muted` | `#475569` (slate-600) | Texto secundario | vs #F8FAFC 10.0:1 |
| `--color-bg` | `#F8FAFC` (slate-50) | Fondo | ✓ AA |
| `--color-surface` | `#FFFFFF` | Tarjetas | ✓ AA |
| `--color-border` | `#E2E8F0` | Bordes | ≥ 3.0:1 no aplica a texto |
| `--color-ring` | `#0F172A` | Focus outline | ✓ AA 16:1 |

## Tipografía

- **Atkinson Hyperlegible** (OFL) regular 400 / bold 700 / italic — auto-hospedada en `src/assets/fonts/*.woff2`. Diseñada por el Braille Institute; garantiza diferenciación de glifos y es dyslexia-friendly. Ratio cuerpo 1.05–1.6rem.
- Escalas: `h1 clamp(1.7, 3.2vw, 2.4rem) -0.02em`, `h2 clamp(1.3, 2.6vw, 1.7rem) -0.01em`, body 1.05rem/1.6.

## Motion (Emil Kowalski rules)

- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` · `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` · `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`.
- Feedback presionado: `:active { transform: scale(0.97) }` 160ms ease-out. Hover gated por `(hover: hover) and (pointer: fine)`.
- Reveal on view con IntersectionObserver (opacity+transform, stagger ≤ 80ms).
- `prefers-reduced-motion` → todas las transiciones caen a 160ms solo-opacity.

## Persistencia

- `design-system/cetpro-san-luis/MASTER.md` es la fuente de verdad para cualquier nuevo desarrollo:
  - `pages/<page>.md` invalida Master cuando existe para la página específica.
  - Reglas duras: no emojis como iconos, `cursor-pointer` en todos los clickables, hover suave 150–300ms, focus visible siempre, 375/768/1024/1440 responsive.

## Entregables actualizados

- CSS con @font-face Atkinson + tokens slate
- `src/_includes/base.njk` logo SVG con navy + accent
- Únicamente activos externos: cero dependencias de producción; fuentes auto-hosteadas.
