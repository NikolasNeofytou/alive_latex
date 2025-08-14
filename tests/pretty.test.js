import { describe, it, expect } from 'vitest';
const { document, section, itemize, item, text, render } = require('../src/api');

describe('Pretty printer', () => {
  it('indents environments and separates top-level nodes', () => {
    const doc = document().add(
      section('Intro', text('Hello')),
      itemize(item('A'), item('B'))
    );
    const out = render(doc, { pretty: true });
    expect(out).toMatch(/\\begin{itemize}\n  \\item{A}\n  \\item{B}\n\\end{itemize}/);
    // Ensure blank line between section and itemize
    expect(out).toMatch(/\\section{Intro}[\s\S]*Hello\n\n\\begin{itemize}/);
  });
});
