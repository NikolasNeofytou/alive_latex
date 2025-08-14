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
