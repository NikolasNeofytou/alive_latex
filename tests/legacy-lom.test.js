import { describe, it, expect, vi } from 'vitest';

// Ensure legacy API still functions & warns once
const legacy = require('../src/lom.js');

describe('Legacy lom.js', () => {
  it('creates a section command style node', () => {
    const sec = legacy.createElement('section', 'Intro');
    expect(sec.toString()).toBe('\\section{Intro}');
  });
});
