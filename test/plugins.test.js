const { document, section, text } = require('../src/core/factory');
const { render } = require('../src/api');

describe('plugin lifecycle', () => {
  it('runs preRender and postRender hooks', () => {
    const doc = document('article');
    doc.add(section('Intro').add(text('Hello world')));
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
});
