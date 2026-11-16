# Design system — CETPRO San Luis (v3.3 · "Plano de taller" OSCURO en todas las rutas)

**Evolución a v3.3 (16/11/2026):** el mismo lenguaje de alta gama del hero (fondo `#070B0A`, retícula de puntos, fichas de cristal oscuro, cian para enlaces, amarillo para CTA, fucsia para desfases) se aplica a **todas las secciones y todas las rutas**. **Evolución a v3.1 (16/11/2026):** el equipo entregó el **logotipo oficial** (insignia circular, engranajes cian/fucsia/amarillo) corroborado en el FB público; sustituye al emblema provisional y define la paleta. **Evolución a v3 (16/11/2026):** se abandona la base genérica "Instituciones públicas / Accessible & Ethical (slate+sky)" por una dirección de arte con punto de vista: *manual técnico de un taller público peruano* — Anton para display condensado, Atkinson Hyperlegible para cuerpo, IBM Plex Mono para anotaciones e índices, marcos de imprenta con desfase duro (sin sombras suaves ni degradados), filetes de tinta y sello institucional impreso. Motivo: la identidad debe sentirse *taller/obra*, no *SaaS institucional*.

**Fecha:** 16/11/2026 · **Estado:** implementado en producción (`https://cetpro.pages.dev/`) tras PR #20.

## Dirección de arte

Manual de taller a dos tintas con aplicación de color: papel de plano gris verdoso, tinta cálida casi negra, verde profundo en planchas, naranja de señal y franja hazard amarilla. La fotografía se presenta en marcos de tinta con bloque de color desfasado (desfase de imprenta) y pie en mono “FIG. NN — …”. Las secciones se numeran con índices de plano ("§ 01", "§ 02"). La oferta formativa es un índice de catálogo (`C-01…C-06`, `A-01…A-06`), no un tablero de tarjetas genérico. El wordmark del pie (“CETPRO SAN LUIS”, Anton) es el colofón.

## Paleta

| Token | Hex | Rol | Contraste verificado |
|---|---|---|---|
| `--bg` | `#070B0A` | Fondo global (plancha, retícula de puntos) | paper sobre bg ≈17:1 ✓ |
| `--surface` | `#101820` | Fichas/tarjetas: cristal oscuro + `backdrop-filter: blur(6px)` | paper sobre surface ≈15:1 ✓ |
| `--ink` | `#13140F` | Texto (negro del wordmark del logo) | vs paper 15.8:1 ✓ |
| `--deep` / `--deep-ink` | `#1C2F57` / `#131F36` | Planchas azul del lema del logo (header/footer/drawer) | paper sobre deep 11.3:1 ✓ |
| `--rust` | `#55CCEE` | Enlaces, índices § sobre plancha | vs bg ≈9:1 ✓ AA |
| `--orange` | `#B42C9B` | Fucsia del logo: acentos y tags auxiliares | vs paper 4.8:1 ✓ (tag fucsia/texto blanco 5.6:1) |
| `--hazard` / `--hazard-hot` | `#FAD441` / `#FFE066` | Amarillo engranaje: CTA, friso, selección | ink sobre hazard 12.8:1 ✓ |
| `--cyan` | `#3ABDE9` | Cian del logo: **solo gráficos y subrayados decorativos** | vs paper 1.9:1 → **nunca texto** |
| `--muted` | `#AEB8C0` | Texto secundario sobre plancha | vs bg ≈8:1 ✓ |
| `--line` / `--line-soft` | `#2C3740` | Filetes y zebra sobre plancha | no aplica a texto |

Regla dura: el cian `#3ABDE9` es decoración (1.9:1); el fucsia `#B42C9B` se usa para tag con texto **blanco** (5.6:1).

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
