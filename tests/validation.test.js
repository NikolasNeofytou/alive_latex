import { describe, it, expect } from 'vitest';
const { document, section, ref, render } = require('../src/api');

describe('Validation & warnings', () => {
  it('returns warnings array when asObject requested', () => {
    const doc = document().add(section('S1', ref('missing:1')));
    const result = render(doc, { asObject: true });
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toContain('Unresolved refs');
    expect(result.latex).toContain('% WARN:');
  });
  it('can suppress warning emission inline but still collect them', () => {
    const doc = document().add(section('S1', ref('missing:2')));
    const result = render(doc, { warnings: false, asObject: true });
    expect(result.warnings.length).toBe(1);
    expect(result.latex).not.toContain('% WARN:');
  });
});
