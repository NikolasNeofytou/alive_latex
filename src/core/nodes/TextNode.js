const BaseNode = require('./BaseNode');

class TextNode extends BaseNode {
  constructor(text) {
    super('text');
    this.text = text;
  }
}

module.exports = TextNode;
