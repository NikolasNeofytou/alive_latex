const BaseNode = require('./BaseNode');

class CommentNode extends BaseNode {
  constructor(text) {
    super('comment');
    this.text = text;
  }
}

module.exports = CommentNode;
