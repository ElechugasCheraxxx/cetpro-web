# Manual de despliegue (modelo dual)

Audiencia: equipo del proyecto + docente evaluador. Para demo de mantenimiento.

## 1. Requisitos

- Cuenta de GitHub con acceso al repositorio `cetprosanluis/cem` (fork → rama → PR).
- `main` protegida con checks obligatorios; CODEOWNERS exige segundo revisor sobre `/src/_data/`.
- Secrets (solo CI): `CF_API_TOKEN` (Pages:Edit), `CF_ACCOUNT_ID`. **Nunca** en archivos.
- [Wrangler] CLI (opcional local): `npm i -g wrangler`.

## 2. Flujo de una actualización

```
Datos: src/_data/*.json + schemas en regla
  ↓  npm test && npm run check:data
Compilación: npm run build (Eleventy → dist/)  + make-version.mjs
  ↓  PR → CI (check-data/tests/build/html-validate)
merge a main → build-and-deploy.yml:
  ↓  Deploy a Pages (wrangler-action)
  ↓  make-version.mjs deja dist/version.json
Windows VM (cuando esté en WEB01): CETPRO-Sync-Site descarga la release
  cada 15 min, verifica SHA-256, repunta `current` y prueba /version.json
  ↓  paridad Pages ↔ espejo (build/commit idénticos)
```

## 3. Cómo se despliega (pasos)

1. Rama `contenido/<area>` o `fix/<desc>` → PR a `main` → checks verdes → doble revisor → merge.
2. El Actions ejecuta build y despliega a Pages; obtiene URL pública.
3. En WEB01: `Start-ScheduledTask CETPRO-Sync-Site` (o esperar ≤ 15 min) → `Invoke-WebRequest http://127.0.0.1:8080/version.json` → comparar con `https://<proyecto>.pages.dev/version.json` (MP-PW §9.9).
4. Evidencia archivada: release y run de Actions en `evidencias/`.

## 4. Rollback

- Pages: panel de Pages → despliegue anterior → "Rollback" (o revertir PR y fusionar: CI vuelve a publicar build previo).
- Espejo: `Rollback-Site.ps1 [-To <release-id>]` (deshabilita la sincronización; habilitar cuando haya build corregido).

## 5. Antipatrones (nunca)

- Editar `dist/` a mano, o tocar IIS / archivos en la VM directamente.
- Fusionar `main` con CI roja o con registros sin `source`/validated.
- Publicar datos personales o informes con nombres reales sin autorización.
- Imprimir tokens/JF en logs o capturas de evidencia.

## 6. Qué verificar tras cada despliegue

- `curl -I https://<proyecto>.pages.dev/` → 200 + headers (CSP/XFO/XCTO).
- `curl -s https://<proyecto>.pages.dev/version.json` + mismo en `http://127.0.0.1:8080/version.json` → mismos `build` y `commit`.
- Revisión puntual de las páginas clave en navegador externo.
