const BaseNode = require('./BaseNode');

class DocumentNode extends BaseNode {
  constructor() {
    super('document');
    this.documentClass = { name: 'article', options: [] };
    this.packages = new Map(); // name -> { options: [] }
    this.body = []; // top level nodes
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
    }
    return this;
  }
}

module.exports = DocumentNode;
