#!/usr/bin/env node
// compare-version.mjs — paridad Pages ↔ espejo. Uso:
//   node scripts/compare-version.mjs <urlA> <urlB>
// MP-PW §9.9: bytes iguales de {build, commit}; diferencia > 30 min = incidente.
import { fileURLToPath } from 'node:url';

export function compareVersions(a, b) {
  for (const v of [a, b]) {
    if (!v || typeof v !== 'object') return { match: false, reason: 'version.json malformado (no es objeto)' };
    if (typeof v.build !== 'string' || typeof v.commit !== 'string' || v.build === '' || v.commit === '') {
      return { match: false, reason: 'version.json malformado (falta build o commit)' };
    }
  }
  if (a.build !== b.build) return { match: false, reason: `build distinto: ${a.build} vs ${b.build}` };
  if (a.commit !== b.commit) return { match: false, reason: `commit distinto: ${a.commit} vs ${b.commit}` };
  return { match: true, reason: '' };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [, , urlA, urlB] = process.argv;
  if (!urlA || !urlB) {
    console.error('Uso: compare-version.mjs <urlA> <urlB>');
    process.exit(2);
  }
  const [a, b] = await Promise.all(
    [urlA, urlB].map(async (u) => {
      const res = await fetch(u);
      if (!res.ok) throw new Error(`${u} → HTTP ${res.status}`);
      return res.json();
    })
  );
  const { match, reason } = compareVersions(a, b);
  if (!match) {
    console.error('❌ paridad FALLA: ' + reason);
    process.exit(1);
  }
  console.log(`✅ paridad OK (build ${a.build}, commit ${a.commit})`);
}
