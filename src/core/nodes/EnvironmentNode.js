const BaseNode = require('./BaseNode');

class EnvironmentNode extends BaseNode {
  constructor(name, args = [], children = []) {
    super('environment');
    this.name = name;
    this.args = args; // array of { kind: 'mandatory' | 'optional', value: string | node }
    this.children = children;
  }
  append(child) {
    this.children.push(child);
    child.parent = this;
  }
}

module.exports = EnvironmentNode;
