#!/usr/bin/env node
// make-version.mjs — genera dist/version.json {build, commit, builtAt, contentHash}.
// Post-build. Lo consume la paridad Pages↔espejo (MP-PW §9.9, MP-SW §15.2).
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export function buildVersion({ build, commit, now, contentHash }) {
  if (!build || String(build).trim() === '') throw new Error('build vacío');
  if (!commit || String(commit).trim() === '') throw new Error('commit vacío');
  if (!contentHash) throw new Error('contentHash vacío');
  return { build: String(build), commit: String(commit), builtAt: now.toISOString(), contentHash };
}

function hashDir(dir) {
  const hash = createHash('sha256');
  const walk = (d) => {
    for (const entry of readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const p = join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name !== 'version.json') {
        hash.update(relative(dir, p));
        hash.update(readFileSync(p));
      }
    }
  };
  walk(dir);
  return 'sha256-' + hash.digest('hex');
}

function git(cmd, fallback) {
  try {
    return execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return fallback;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const dist = process.argv[2] ?? 'dist';
  if (!existsSync(dist)) {
    console.error('dist/ no existe. Ejecuta primero npm run build.');
    process.exit(1);
  }
  const commit = process.env.COMMIT ?? git('git rev-parse --short HEAD', 'nogit');
  const build = process.env.BUILD ?? git('git rev-list --count HEAD', '0');
  const contentHash = hashDir(dist);
  const v = buildVersion({ build, commit, now: new Date(), contentHash });
  writeFileSync(join(dist, 'version.json'), JSON.stringify(v, null, 2));
  console.log(JSON.stringify(v, null, 2));
}
