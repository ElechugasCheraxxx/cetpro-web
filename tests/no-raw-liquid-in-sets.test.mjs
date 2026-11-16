import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

// Regresión: un {% set %} con "{{ ... }}" dentro del string asigna texto
// literal y Nunjucks lo imprime crudo en producción (visto en ficha.njk).
test('ningún template mete tags Liquid dentro de strings de {% set %}', () => {
  const templates = readdirSync(src).filter(f => f.endsWith('.njk'))
    .concat(readdirSync(join(src, '_includes')).filter(f => f.endsWith('.njk')).map(f => join('_includes', f)));
  for (const f of templates) {
    const body = readFileSync(join(src, f), 'utf8');
    const bad = body.match(/\{%\s*set\s+\w+\s*=\s*"[^"]*(\{\{|\{%)[^"]*"\s*%\}/g);
    assert.equal(bad, null, `${f} tiene {% set %} con tag Liquid dentro del string: ${bad}`);
  }
});
