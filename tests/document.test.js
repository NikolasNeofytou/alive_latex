import { describe, it, expect } from 'vitest';
const { document, section, text, itemize, item, render } = require('../src/api');

describe('Document serialization', () => {
  it('serializes a document with section and list', () => {
    const doc = document()
      .setClass('article', ['12pt'])
      .usePackage('amsmath')
      .add(
        section('Introduction', text('Welcome to LaTeX & JS.')),
        itemize(
          item('Alpha'),
          item('Beta')
        )
      );
    const output = render(doc);
    expect(output).toContain('\\documentclass[12pt]{article}');
    expect(output).toContain('\\usepackage{amsmath}');
    expect(output).toContain('\\section{Introduction}');
    expect(output).toContain('\\begin{itemize}');
    expect(output).toContain('\\item{Alpha}');
  });
});
