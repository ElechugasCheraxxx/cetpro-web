# Design system — CETPRO San Luis (v3 · "Plano de taller")

**Evolución a v3 (16/11/2026):** se abandona la base genérica "Instituciones públicas / Accessible & Ethical (slate+sky)" por una dirección de arte con punto de vista: *manual técnico de un taller público peruano* — Anton para display condensado, Atkinson Hyperlegible para cuerpo, IBM Plex Mono para anotaciones e índices, marcos de imprenta con desfase duro (sin sombras suaves ni degradados), filetes de tinta y sello institucional impreso. Motivo: la identidad debe sentirse *taller/obra*, no *SaaS institucional*.

**Fecha:** 16/11/2026 · **Estado:** implementado en producción (`https://cetpro.pages.dev/`) tras PR #20.

## Dirección de arte

Manual de taller a dos tintas con aplicación de color: papel de plano gris verdoso, tinta cálida casi negra, verde profundo en planchas, naranja de señal y franja hazard amarilla. La fotografía se presenta en marcos de tinta con bloque de color desfasado (desfase de imprenta) y pie en mono “FIG. NN — …”. Las secciones se numeran con índices de plano ("§ 01", "§ 02"). La oferta formativa es un índice de catálogo (`C-01…C-06`, `A-01…A-06`), no un tablero de tarjetas genérico. El wordmark del pie (“CETPRO SAN LUIS”, Anton) es el colofón.

## Paleta

| Token | Hex | Rol | Contraste verificado |
|---|---|---|---|
| `--paper` | `#ECEEE7` | Fondo (gris verdoso frío, no crema) | ink sobre paper 13.4:1 ✓ |
| `--surface` | `#FDFCF6` | Fichas/tarjetas | ink sobre surface 14.6:1 ✓ |
| `--ink` | `#16150F` | Texto, filetes, planchas | vs paper 13.4:1 ✓ |
| `--deep` / `--deep-ink` | `#0E3B2C` / `#0A2A20` | Planchas verdes (drawer móvil, hover) | paper sobre deep 10.4:1 ✓ |
| `--rust` | `#9A3412` | Enlaces sobre papel, índices § | vs paper 6.4:1 ✓ AA |
| `--orange` | `#C2410C` | Gráficos/acento (no texto) | vs paper 4.5:1 (grande/UI) |
| `--hazard` | `#F2C230` | CTA primario (tinta), friso, sello | ink sobre hazard 10.9:1 ✓ |
| `--muted` | `#57534A` | Texto secundario sobre papel | vs paper 6.7:1 ✓ |
| `--line-soft` | `#D3D6CB` | Zebra tablas, filetes suaves | no aplica a texto |

Regla dura: el naranja `#C2410C` **no** se usa para texto de cuerpo (4.5:1 exacto); el texto va en óxido `#9A3412`.

## Tipografía (auto-hospedada, OFL)

- **Anton** 400 — display (`.hero h1`, `h1`, `h2`, wordmark): condensada, mayúsculas, tracking ≈ 0.01em.
- **Atkinson Hyperlegible** 400/700/italic — cuerpo. Diseñada por Braille Institute; dyslexia-friendly; dislexia/legibilidad AA.
- **IBM Plex Mono** 400/500 — anotaciones, índices, tags, `figcaption` (“FIG. 01 — …”), navegación (uppercase 500), metadatos.
- Medida de cuerpo: `p, li { max-width: 56ch; text-wrap: pretty }` (Atkinson renderiza ≈1.4 char/ch).

## Componentes

- **Header:** plancha `--ink` con friso `--hazard` 4px inferior; marca en Anton; nav mono 500 uppercase con subrayado hazard en activo.
- **Hero:** papel milimetrado (dot field radial), titular Anton mayúsculas con palabra señal en óxido, CTAs esmaltados (hazard + offset tinta), regla citacional mono, figura en marco tinta con bloque naranja desfasado 14px y **sello 60+ años** (Anton + Plex Mono, doble anillo, rotación −9°, `role="img"` con `aria-label`).
- **Friso hazard:** regla amarilla plana 12px con filetes de tinta (una vez por página; separa obra).
- **Cards:** fichas de catálogo — marco tinta 2px, índice mono decimal-leading-zero (`counter-reset: card`) en esquina, offset 6px tinta en hover. Tags en mono uppercase (tinta = carrera / naranja = auxiliar).
- **Índice de programas:** `.program-list` con `C-NN`/`A-NN` generados por contadores CSS + `--row-prefix`; fila hover = hazard con tinta; meta mono oculto ≤640px.
- **Tablas:** ledger — thead tinta + papel, filas zebra, números tabulares.
- **Notas (`.notice`):** “NOTA DE TALLER” como etiqueta mono negativa sobre el borde superior; marco tinta uniforme (sin side-tab).
- **404:** Anton “404” + regla hazard + “ESTA HOJA NO ESTÁ EN EL PLANO”.
- **Footer:** plancha tinta con colofón Anton “CETPRO SAN LUIS” (dos líneas, breaks explícitos para no forzar ancho), enlaces hazard, barra mono inferior (“Plano M-01”).

## Motion

- GSAP 3 + ScrollTrigger self-hosted; parallax scrub en `.parallax` (`scale 1.14→1.02`, `scrub 0.6`), hero frame entra con clip/scale una vez.
- `prefers-reduced-motion: reduce` → animaciones prácticamente desactivadas; hover solo `(hover: hover) and (pointer: fine)`; press 100–160ms.

## Verificación (v3)

- html-validate: 0 errores (22 páginas). impeccable detect: `[]` en 14/14 páginas auditadas. Lighthouse local: 100/100/100/100. axe: 0 violaciones. Contraste AA verificado manualmente por par (tabla arriba).

## Persistencia

`design-system/cetpro-san-luis/MASTER.md` es la fuente de verdad. `pages/<page>.md` invalida al Master por página. Prohibidos: emojis como iconos, sombras suaves/degradados en CTAs, naranja como texto de cuerpo, side-tabs en avisos, kickers pequeños sobre el H1.
