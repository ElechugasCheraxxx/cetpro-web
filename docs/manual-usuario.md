# Manual de usuario (para la Dirección / docente evaluador)

Audiencia: Dirección del CETPRO (patrocinador) y docente evaluador. Tiempo de lectura: 5 min.

## ¿Qué es este proyecto?

Un **sitio web público** del CETPRO San Luis, más un **servidor web de demostración** en una VM con Windows Server, IIS y OpenSSH, usado como respaldo/espejo y evidencia del curso de Gestión de Proyectos de TI.

En palabras simples:

- **El sitio público vive en Cloudflare Pages**: siempre online, sin depender de ningún equipo del CETPRO.
- **La VM es el "segundo sitio igual"** (respaldo) que demuestra Windows Server + IIS + acceso seguro por SSH, sin abrir puertos.
- **El sitio y el espejo son idénticos** gracias a un control automático (`version.json`): el equipo garantiza que son la misma versión.

## ¿Cómo ver el sitio?

- URL pública: `https://cetpro.pages.dev/` (o el dominio que apruebe la Dirección en el futuro).
- Alternativa (solo respaldo): `https://respaldo.<dominio>/` (si existe zona DNS) o túnel temporal en demo en vivo.
- El sitio abre en cualquier navegador del celular (datos móviles).

## ¿Qué contiene?

- **Inicio** — mensaje institucional y accesos rápidos.
- **Oferta formativa** — 6 carreras técnicas + 6 programas de auxiliar técnico (ver fuentes en la propia página de cada ficha).
- **Turnos y horarios** — mañana, tarde y noche (horarios exactos aún no publicados oficialmente).
- **Admisión** — requisitos generales (gratuidad, sin examen, desde los 14 años). Las fechas de matrícula de 2026-2027 aún no están publicadas.
- **Servicios** — certificación modular y títulos, bolsa de trabajo, talleres de emprendimiento, servicios a la comunidad.
- **Contacto** — dirección, teléfono, correo.

## ¿Por qué el sitio muestra datos con fuentes?

Toda la información publicada es pública. El equipo etiquetó cada dato con su fuente (Andina, UGEL 07) — **es el mismo procedimiento que exigen los documentos del proyecto y evita publicar información no verificada**. Los datos **no** son pronunciamiento institucional hasta que la institución apruebe contenido oficial.

## ¿Cómo pedir cambios de contenido?

1. Envíe un correo a **cetprosanluis@gmail.com** con el dato afectado y su fuente (resolución, documento oficial, captura).
2. El equipo abre un PR y el dato se incluye o se le dice por qué no (sin fuente = no se publica).
3. El cambio queda registrado en `CONTENT_LOG.md` y en git.

## ¿Qué NO hace el sitio?

No matriculas online, no programas citas, no almacena tus datos. Todo es informativo; para cualquier trámite, comunícate al **323-3342** o al correo institucional.

## Seguridad y privacidad

- El sitio no pide ni guarda información personal (ver `/privacidad/`).
- El servidor (VM) **no está expuesto a Internet**: 0 puertos; el acceso del equipo (SSH por llave) es solo desde la LAN autorizada.
- Ningún servicio expuesto salvo los del borde de Cloudflare.

## ¿Cómo se valida el trabajo del equipo?

- Calidad del sitio: Lighthouse ≥ 90 (rendimiento, accesibilidad, buenas prácticas), WCAG 2.1 AA, 0 enlaces rotos.
- Servidor: instalación reproducible, respaldos probados, runbook de recuperación, sin puertos expuestos.
- Gestión: control semanal de consumo (hoja de sangrado) y líneas base v1.1 con entregables E-2.x/E-3.x.
