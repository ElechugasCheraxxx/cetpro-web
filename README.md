# cetpro-san-luis-web

Sitio institucional del **Centro de Educación Técnico-Productiva San Luis** (Lima, Perú). Estático, sin recolección de datos personales, público en **Cloudflare Pages** y espejo en **IIS (WEB01)**. El sitio se genera con [Eleventy](https://www.11ty.dev/) a partir de `_data/*.json` validados con esquemas ajv.

## Comandos

```bash
npm ci                 # instala dependencias (Node ≥ 22)
npm test               # pruebas (node:test) — lógica de datos y de versión
npm run check:data     # ajv + reglas de contenido; CONTENT_STRICT=1 en main
npm run build          # Eleventy → dist/ (+ make-version.mjs → version.json)
npm run serve          # npx serve dist -l 8080
npm run check:html     # html-validate
npm run check:links    # 26 enlaces, concurrency 10
```

## Contenido

Toda información es **pública y citada** (`docs/fuentes-publicas.md`) y marcada `fuente-pública · NO oficial`. No se inventan: misión/visión (omitidas), fechas de matrícula (no publicadas), perfiles de programas (sin fuente oficial). Los datos llevan `source`, `validated`, `validated_by`, `validated_at` (esquema en `_data/*.schema.json`).

## Flujo

`PR a main` → CI (check-data/tests/build/html-validate) → doble revisión (CODEOWNERS sobre `/src/_data`) → merge → build-and-deploy (Pages). El espejo en WEB01 descarga la misma release y repunta `current` (cada 15 min, `CETPRO-Sync-Site`); paridad obligatoria por `version.json`.

## Documentación

- `docs/manual-despliegue.md` — cómo se despliega y cómo se revierte.
- `docs/manual-usuario.md` — para la Dirección / docente evaluador.
- `docs/CONTENT_LOG.md` — historial de cambios de contenido.
- `../spec/` — especificación del proyecto (arquitectura, restricciones, ADRs).
- `CodeOwners` y permisos: ver `.github/workflows/build-and-deploy.yml`.
