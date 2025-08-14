import { describe, it, expect } from 'vitest';
const { document, section, text, label, ref, math, comment, render } = require('../src/api');

describe('Labels, refs, macros, math, comments', () => {
  it('serializes labels and detects unresolved refs', () => {
    const doc = document()
      .defineMacro('vect', 1, '\\mathbf{#1}')
      .add(
        section('Intro', text('Content'), label('sec:intro')), // label after section
        section('Use', ref('sec:intro'), ref('sec:missing')),
        comment('A comment line'),
        math('E=mc^2'),
        math('a^2+b^2=c^2', { display: true })
      );
    const out = render(doc);
    expect(out).toContain('\\newcommand{\\vect}[1]{\\mathbf{#1}}');
    expect(out).toContain('\\section{Intro}');
    expect(out).toContain('\\section{Use}');
    expect(out).toContain('\\label{sec:intro}');
    expect(out).toContain('\\ref{sec:intro}');
    expect(out).toContain('% WARN: Unresolved refs -> sec:missing');
    expect(out).toContain('% A comment line');
    expect(out).toContain('\\(E=mc^2\\)');
    expect(out).toContain('$$a^2+b^2=c^2$$');
  });
  it('supports macro parameter defaults', () => {
    const doc = document()
      .defineMacro('img', 2, '\\includegraphics[width=#1]{#2}', '0.9\\textwidth');
    const out = render(doc);
    expect(out).toContain('\\newcommand{\\img}[2][0.9\\textwidth]{\\includegraphics[width=#1]{#2}}');
  });
});
