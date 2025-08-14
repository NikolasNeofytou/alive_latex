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
  this._macroNames = new Set();
  this._duplicateLabels = new Set();
  this._macroRedefinitions = new Set();
  this.plugins = []; // { preRender?, postRender? }
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

  // defineMacro(name, params, body, firstDefault?)
  defineMacro(name, params = 0, body = '', firstDefault) {
    if (this._macroNames.has(name)) {
      this._macroRedefinitions.add(name);
    }
    this.macros.push({ name, params, body, firstDefault });
    this._macroNames.add(name);
    return this;
  }

  registerLabel(label) { this._labels.add(label); }
  registerRef(ref) { this._refs.add(ref); }

  use(plugin) {
    if (plugin && typeof plugin === 'object') this.plugins.push(plugin);
    return this;
  }
}

function collectNodeMetadata(doc, node) {
  if (node.type === 'command' && node.name === 'label' && node.args[0]) {
    const arg = node.args[0];
    if (arg.kind === 'mandatory' && typeof arg.value === 'string') {
  if (doc._labels.has(arg.value)) doc._duplicateLabels.add(arg.value);
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
