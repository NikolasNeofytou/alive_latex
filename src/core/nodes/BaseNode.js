class BaseNode {
  constructor(type) {
    this.type = type;
    this.parent = null;
    this.meta = {}; // reserved for future source mapping, etc.
  }
}

module.exports = BaseNode;
