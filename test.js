const assert = require('assert');
const { createElement } = require('./src/lom.js');

// Test simple command node
const section = createElement('section', 'Introduction');
assert.strictEqual(section.toString(), '\\section{Introduction}');

// Test environment node with children
const list = createElement('itemize');
list.appendChild(createElement('item', 'First'));
list.appendChild(createElement('item', 'Second'));
assert.strictEqual(
  list.toString(),
  '\\begin{itemize}\\item{First}\\item{Second}\\end{itemize}'
);

console.log('All tests passed');
