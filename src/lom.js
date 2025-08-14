class LatexNode {
  constructor(type, content = '') {
    this.type = type;
    this.content = content;
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  toString() {
    if (this.type === 'text') {
      return this.content;
    }

    if (this.children.length === 0 && this.content !== '') {
      return `\\${this.type}{${this.content}}`;
    }

    const inner = this.children.map((child) => child.toString()).join('');
    return `\\begin{${this.type}}${inner}\\end{${this.type}}`;
  }
}

function createElement(type, content = '') {
  return new LatexNode(type, content);
}

function createTextNode(text) {
  return new LatexNode('text', text);
}

module.exports = {
  LatexNode,
  createElement,
  createTextNode,
};

// Deprecation notice (emit once)
if (!global.__ALIVE_LATEX_LEGACY_WARNED__) {
  // eslint-disable-next-line no-console
  console.warn('[alive-latex] Warning: lom.js legacy API is deprecated and will be replaced by structured nodes. Use src/api.js going forward.');
  global.__ALIVE_LATEX_LEGACY_WARNED__ = true;
}
