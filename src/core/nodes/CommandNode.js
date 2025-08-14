const BaseNode = require('./BaseNode');

class CommandNode extends BaseNode {
  constructor(name, args = [], trailing = []) {
    super('command');
    this.name = name;
    this.args = args; // array of { kind: 'mandatory' | 'optional', value: string | node }
    this.trailing = trailing; // nodes that appear after the command call
  }
  addTrailing(node) {
    this.trailing.push(node);
  }
}

module.exports = CommandNode;
