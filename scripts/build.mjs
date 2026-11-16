#!/usr/bin/env node
// Limpia y construye el sitio con Eleventy.
import { rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

try { rmSync('dist', { recursive: true, force: true }); } catch {}
execSync('npx @11ty/eleventy', { stdio: 'inherit' });
if (!existsSync('dist')) {
  console.error('Build falló: dist/ no generado.');
  process.exit(1);
}
console.log('✅ build OK → dist/');
