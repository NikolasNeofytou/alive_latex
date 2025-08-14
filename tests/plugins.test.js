const { document, section, text, math } = require('../src/core/factory');
const { render } = require('../src/api');

describe('plugin lifecycle', () => {
  it('runs preRender and postRender hooks', () => {
    const doc = document('article');
  const intro = section('Intro');
  doc.add(intro);
  doc.add(text('Hello world'));
    const calls = [];
    doc.use({
      preRender(d) {
        calls.push('pre');
        d.usePackage('amsmath');
      },
      postRender(latex) {
        calls.push('post');
        return latex + '\n% post processed';
      }
    });
    const out = render(doc, { asObject: true });
    expect(out.latex).toMatch(/\\usepackage\{amsmath\}/);
    expect(out.latex).toMatch(/% post processed/);
    expect(calls).toEqual(['pre', 'post']);
  });
  it('autoMathPackage adds amsmath when math present', () => {
    const autoMath = require('../src/plugins/autoMathPackage');
    const doc = document();
    doc.add(math('E=mc^2'));
    doc.use(autoMath());
    const out = render(doc);
    expect(out).toMatch(/\\usepackage\{amsmath\}/);
  });
});
