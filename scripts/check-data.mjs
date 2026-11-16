#!/usr/bin/env node
// check-data.mjs — Validación de datos de contenido (ajv + CONTENT_STRICT).
// Uso CLI: node scripts/check-data.mjs [--dir src/_data] [--strict]
// Uso libro: export validateData({ dir, strict })
//
// Reglas (SPEC.md §7 · CONSTRAINTS.md):
//  - cada *.json de datos debe tener su *.schema.json (misma raíz)
//  - cada registro lleva source (no vacío), validated, validated_by, validated_at
//  - materia prima: `validated` es boolean; CONTENT_STRICT exige validated === true
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

const isSchema = (f) => f.endsWith('.schema.json');
const isData = (f) => f.endsWith('.json') && !isSchema(f) && !f.includes('fixtures');

export async function validateData({ dir = 'src/_data', strict = process.env.CONTENT_STRICT === '1' } = {}) {
  const errors = [];
  const files = readdirSync(dir).filter(isData);
  const ajv = new Ajv({ allErrors: true, strict: false });

  for (const file of files) {
    const schemaFile = file.replace('.json', '.schema.json');
    const schemaPath = join(dir, schemaFile);
    if (!existsSync(schemaPath)) {
      if (strict) errors.push(`${file}: falta schema (${schemaFile})`);
      continue;
    }
    let schema, data;
    try {
      schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
      data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    } catch (e) {
      errors.push(`${file}: JSON inválido: ${e.message}`);
      continue;
    }
    const validate = ajv.compile(schema);
    const okSchema = validate(data);
    if (!okSchema) {
      for (const err of validate.errors ?? []) {
        errors.push(`${file}: ${err.instancePath} ${err.message}`);
      }
      continue;
    }
    // Reglas de contenido (capa de política, no de esquema)
    for (const record of findRecords(data)) {
      if (!record.source || String(record.source).trim() === '') {
        errors.push(`${file}: registro "${record.nombre ?? record.id ?? '?'}" sin source`);
      }
      if (strict && record.validated !== true) {
        errors.push(`${file}: registro "${record.nombre ?? record.id ?? '?'}" no validado (validated !== true) en modo estricto`);
      }
    }
  }
  return { ok: errors.length === 0, errors };
}

function findRecords(data) {
  // Soporta { items: [...] } y arrays sueltos de registros.
  if (Array.isArray(data)) return data.flatMap(findRecords);
  if (data && Array.isArray(data.items)) return data.items;
  if (data && typeof data === 'object' && ('source' in data || 'validated' in data)) return [data];
  return [];
}

// Ejecución CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const dirIdx = process.argv.indexOf('--dir');
  const strict = process.argv.includes('--strict') || process.env.CONTENT_STRICT === '1';
  const dir = dirIdx !== -1 ? process.argv[dirIdx + 1] : 'src/_data';
  const { ok, errors } = await validateData({ dir, strict });
  if (!ok) {
    console.error('❌ check-data FALLÓ:\n' + errors.map(e => '  - ' + e).join('\n'));
    process.exit(1);
  }
  console.log('✅ check-data OK (' + (strict ? 'CONTENT_STRICT activo' : 'modo normal') + ')');
}
