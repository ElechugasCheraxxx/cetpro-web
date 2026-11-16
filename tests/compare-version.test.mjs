import test from 'node:test';
import assert from 'node:assert/strict';
import { compareVersions } from '../scripts/compare-version.mjs';

const mk = (build, commit) => ({ build, commit, builtAt: '2026-11-16T00:00:00.000Z', contentHash: 'sha256-x' });

test('mismo build y commit ⇒ match', () => {
  const r = compareVersions(mk('site-1', 'abc'), mk('site-1', 'abc'));
  assert.equal(r.match, true);
});

test('build distinto ⇒ no match', () => {
  const r = compareVersions(mk('site-1', 'abc'), mk('site-2', 'abc'));
  assert.equal(r.match, false);
  assert.match(r.reason, /build/i);
});

test('commit distinto ⇒ no match', () => {
  const r = compareVersions(mk('site-1', 'abc'), mk('site-1', 'def'));
  assert.equal(r.match, false);
  assert.match(r.reason, /commit/i);
});

test('version.json malformado ⇒ no match con razón', () => {
  const r = compareVersions({ build: 1 }, mk('site-1', 'abc'));
  assert.equal(r.match, false);
});
