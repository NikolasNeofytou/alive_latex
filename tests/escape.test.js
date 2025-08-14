import { describe, it, expect } from 'vitest';
const { text, section, document, render } = require('../src/api');

describe('Escaping', () => {
  it('escapes special characters in text nodes', () => {
    const special = '#$%&_{}~^\\';
    const doc = document().add(section('Spec', text(special)));
    const out = render(doc);
    const escapedPatterns = ['\\#','\\$','\\%','\\&','\\_','\\{','\\}','\\textasciitilde{}','\\textasciicircum{}','\\textbackslash{}'];
    for (const p of escapedPatterns) {
      expect(out).toContain(p);
    }
  });
});
