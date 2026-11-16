import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateData } from '../scripts/check-data.mjs';

const SCHEMA = {
  type: 'object',
  required: ['items'],
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        required: ['source', 'validated', 'validated_by', 'validated_at', 'nombre'],
        properties: {
          nombre: { type: 'string', minLength: 1 },
          source: { type: 'string', minLength: 1 },
          validated: { type: 'boolean' },
          validated_by: { type: 'string', minLength: 1 },
          validated_at: { type: 'string', minLength: 1 }
        },
        additionalProperties: true
      }
    }
  }
};

function makeFixture(dir, file, data) {
  writeFileSync(join(dir, file), JSON.stringify(data));
}

test('valida registros con validated:true en modo normal', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'data-'));
  try {
    mkdirSync(join(dir, 'fixtures'), { recursive: true });
    makeFixture(dir, 'areas.schema.json', SCHEMA);
    makeFixture(dir, 'areas.json', { items: [
      { nombre: 'Panificación Industrial', source: 'Andina 08/12/2025', validated: true, validated_by: 'equipo-fuente-publica', validated_at: '2026-11-15' }
    ] });
    const result = await validateData({ dir, strict: false });
    assert.equal(result.ok, true, JSON.stringify(result.errors));
    assert.deepEqual(result.errors, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('CONTENT_STRICT rechaza validated:false en producción', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'data-'));
  try {
    makeFixture(dir, 'areas.schema.json', SCHEMA);
    makeFixture(dir, 'areas.json', { items: [
      { nombre: 'Cocina', source: 'Andina 08/12/2025', validated: false, validated_by: 'equipo', validated_at: '2026-11-15' }
    ] });
    const strict = await validateData({ dir, strict: true });
    assert.equal(strict.ok, false);
    assert.ok(strict.errors.some(e => e.includes('validated')));
    const lenient = await validateData({ dir, strict: false });
    assert.equal(lenient.ok, true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('datos sin source no pasan ni en modo normal', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'data-'));
  try {
    makeFixture(dir, 'areas.schema.json', SCHEMA);
    makeFixture(dir, 'areas.json', { items: [
      { nombre: 'Sin fuente', source: '', validated: true, validated_by: 'equipo', validated_at: '2026-11-15' }
    ] });
    const result = await validateData({ dir, strict: false });
    assert.equal(result.ok, false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('archivos sin schema solo en producción fallan el chequeo', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'data-'));
  try {
    makeFixture(dir, 'huerfqnos.json', { items: [] });
    const result = await validateData({ dir, strict: true });
    assert.equal(result.ok, false);
    assert.ok(result.errors.some(e => e.includes('schema')));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
