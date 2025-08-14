const BaseNode = require('./BaseNode');

class MathNode extends BaseNode {
  constructor(content, display = false) {
    super('math');
    this.content = content;
    this.display = display;
  }
}

module.exports = MathNode;
