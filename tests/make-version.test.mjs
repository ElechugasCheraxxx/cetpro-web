import test from 'node:test';
import assert from 'node:assert/strict';
import { buildVersion } from '../scripts/make-version.mjs';

test('buildVersion produce build/commit/builtAt/contentHash', () => {
  const v = buildVersion({
    build: 'site-1',
    commit: 'abc1234',
    now: new Date('2026-11-16T10:00:00Z'),
    contentHash: 'sha256-deadbeef'
  });
  assert.equal(v.build, 'site-1');
  assert.equal(v.commit, 'abc1234');
  assert.equal(v.builtAt, '2026-11-16T10:00:00.000Z');
  assert.equal(v.contentHash, 'sha256-deadbeef');
});

test('buildVersion rechaza build vacío', () => {
  assert.throws(() => buildVersion({ build: '', commit: 'x', now: new Date(), contentHash: 'h' }));
});

test('buildVersion rechaza commit vacío', () => {
  assert.throws(() => buildVersion({ build: 'b', commit: '', now: new Date(), contentHash: 'h' }));
});
