# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** CETPRO San Luis
**Generated:** 2026-11-16 02:03:58 · **Revisado:** 2026-11-16 (v3 · "Plano de taller")
**Category:** Government/Public Service

---

## Global Rules (v3 — vigente desde 16/11/2026)

### Dirección de arte

*Manual técnico de un taller público*: papel de plano, tinta, planchas verdes profundas, naranja de señal y hazard. Marcos de imprenta con desfase duro. Nada de degradados, sombras suaves ni tarjetas redondeadas genéricas. Anton (display) + Atkinson Hyperlegible (cuerpo) + IBM Plex Mono (anotaciones). Índices de plano `§ NN` por sección; oferta formativa como índice de catálogo (`C-NN`, `A-NN`); wordmark Anton de colofón.

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Paper | `#ECEEE7` | `--paper` |
| Surface (fichas) | `#FDFCF6` | `--surface` |
| Ink (texto/filetes) | `#16150F` | `--ink` |
| Deep (planchas) | `#0E3B2C` | `--deep` |
| Deep Ink (drawer móvil) | `#0A2A20` | `--deep-ink` |
| Rust (enlaces/índices) | `#9A3412` | `--rust` |
| Orange (acento NO texto) | `#C2410C` | `--orange` |
| Hazard (CTA tinta/friso/sello) | `#F2C230` | `--hazard` |
| Muted | `#57534A` | `--muted` |
| Border suave | `#D3D6CB` | `--line-soft` |
| Destructive | `#DC2626` | `--color-destructive` (utilidad `.btn.danger`) |
| Ring (focus) | `#16150F` (papel) / `#F2C230` (quemado/oscuro) | `--color-ring` |

**Color Notes:** contrastes medidos — ink/paper 13.4:1 · rust/paper 6.4:1 · paper/deep 10.4:1 · ink/hazard 10.9:1 · muted/paper 6.7:1. El naranja `#C2410C` no se usa para texto de cuerpo.

### Tipografía

- **Display:** Anton 400, mayúsculas, tracking ≈ 0.01em (hero `clamp(2.05, 4.6vw, 3.4rem)`, `h1`, `h2`, wordmark).
- **Body:** Atkinson Hyperlegible 400/700/italic — heredada de v2 por motivos de legibilidad (Braille Institute).
- **Mono:** IBM Plex Mono 400/500 — índices (`§`, `C-01`), tags, captions (`FIG. 01 — …`), navegación, metadatos.
- Medida: `p, li { max-width: 56ch; text-wrap: pretty }`.

### Spacing & Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `0.25rem` | Gaps mínimos |
| `--space-sm` | `0.5rem` | Gaps inline |
| `--space-md` | `1rem` | Padding estándar |
| `--space-lg` | `1.5rem` | Padding de sección |
| `--space-2xl` | `3rem` | Márgenes de héroe |
| `--radius` | `2px` | Esquinas duras (imprenta) |

### Sombras (solo desfase duro, nunca suavizadas)

| Level | Value | Usage |
|-------|-------|-------|
| `--offset-sm` | `5px 5px 0 var(--ink)` | Botones, fichas hover |
| `--offset-md` | `6px 6px 0 var(--ink)` | Cards hover |
| `--offset-photo` | `10px 10px 0 var(--orange)` ó `0 var(--ink)` | Marcos de foto |
| `--offset-hero` | `14px 14px 0 var(--orange)` | Figura hero |

---

## Component Specs

### Botones ("esmaltados" — tinta sobre hazard)

```css
.btn { /* primario */
  background: var(--hazard); color: var(--ink); border: 2px solid var(--ink);
  font-family: var(--font-mono); font-weight: 500; letter-spacing: .06em; text-transform: uppercase;
  padding: .8rem 1.35rem; border-radius: 2px; box-shadow: 5px 5px 0 var(--ink);
  transition: transform 140ms, box-shadow 140ms;
}
.btn:hover { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 var(--ink); }
```

Secundarios: `.btn.secondary` (sobre plancha oscura), `.btn.secondary-light` (sobre papel, tinta). Todos: `cursor: pointer`, press 140ms, sin degradados.

### Cards (fichas de catálogo)

Marco `2px solid var(--ink)`, fondo `--surface`, radio 2px. Índice mono `decimal-leading-zero` generado por CSS counters (`counter-reset: card` en `.cards`), esquina superior derecha en `--rust`. Hover: `translate(-2px,-2px)` + offset 6px tinta.

### Tablas (ledger)

`thead` tinta + papel (mono uppercase), `tbody` zebra `#EDE9DC`, `td:last-child { font-variant-numeric: tabular-nums }`, filetes superiores/inferiores de tinta.

### Avisos (`.notice`)

Marco tinta uniforme; etiqueta negativa "NOTA DE TALLER" (mono sobre `--ink` con texto hazard) montada en el borde superior. Sin side-tabs.

---

## Style Guidelines

**Style:** Plano de taller (v3)

**Mood:** oficio · obra · pública · impresa · accesible

**Best For:** instituciones públicas con oficio propio (CETPRO, talleres, escuelas técnicas)

**Key Effects:** desfases duros de imprenta, índices mono `§`, dot field milimetrado en héroe, sello Anton/Plex ("60+ AÑOS"), palabra señal en óxido, friso hazard único por página, focus-visible 3px de alto contraste.

### Prohibidos (v3)

- ❌ Gradientes de fondo en héroe o CTAs (incluido el "gradient on section")
- ❌ Sombras suaves/difusas y blur en CTAs
- ❌ Side-tabs en avisos y cards
- ❌ Kickers/eyebrows pequeños sobre el H1
- ❌ Naranja como texto de cuerpo (usar óxido)
- ❌ Fondos crema planos "cálidos por defecto" (el papel es gris verdoso frío)
- ❌ Emojis como iconos
- ❌ Texto < 11px en controles/labels

---

## Pre-Delivery Checklist

- [ ] No emojis como iconos (SVG propio)
- [ ] `cursor: pointer` en todo clickable
- [ ] Hover 140–160ms con ease-out; nada de cambios instantáneos
- [ ] Contraste cuerpo ≥ 4.5:1 (medido por par; ver tabla)
- [ ] Focus visible de alto contraste (3px `--ink` sobre papel / 3px hazard sobre tinta)
- [ ] `prefers-reduced-motion` respetado
- [ ] Wordmark del pie con `<br>` explícito (nunca nowrap forzado)
- [ ] Sin scroll horizontal a 375px (verificado a 500px headless + 375/768/1024/1440 lógicos)
- [ ] Medida ≤ 56ch en cuerpo
