const BaseNode = require('./BaseNode');

class DocumentNode extends BaseNode {
  constructor() {
    super('document');
    this.documentClass = { name: 'article', options: [] };
    this.packages = new Map(); // name -> { options: [] }
    this.body = []; // top level nodes
  this.macros = []; // { name, params, body }
  this._labels = new Set();
  this._refs = new Set();
  }
  setClass(name, options = []) {
    this.documentClass = { name, options };
    return this;
  }
  usePackage(name, options = []) {
    if (!this.packages.has(name)) {
      this.packages.set(name, { options });
    }
    return this;
  }
  add(...nodes) {
    for (const n of nodes) {
      this.body.push(n);
      n.parent = this;
      // collect labels/refs
      collectNodeMetadata(this, n);
    }
    return this;
  }

  defineMacro(name, params = 0, body = '') {
    this.macros.push({ name, params, body });
    return this;
  }

  registerLabel(label) { this._labels.add(label); }
  registerRef(ref) { this._refs.add(ref); }
}

function collectNodeMetadata(doc, node) {
  if (node.type === 'command' && node.name === 'label' && node.args[0]) {
    const arg = node.args[0];
    if (arg.kind === 'mandatory' && typeof arg.value === 'string') {
      doc.registerLabel(arg.value);
    }
  }
  if (node.type === 'command' && ['ref','eqref'].includes(node.name) && node.args[0]) {
    const arg = node.args[0];
    if (arg.kind === 'mandatory' && typeof arg.value === 'string') {
      doc.registerRef(arg.value);
    }
  }
  // recurse children
  if (node.children) {
    for (const c of node.children) collectNodeMetadata(doc, c);
  }
  if (node.trailing) {
    for (const t of node.trailing) collectNodeMetadata(doc, t);
  }
}

module.exports = DocumentNode;
