// Automatically adds amsmath package if any MathNode exists in the document
module.exports = function autoMathPackage() {
  return {
    preRender(doc) {
      let found = false;
      function walk(node) {
        if (!node || found) return;
        if (node.type === 'math') { found = true; return; }
        if (node.children) node.children.forEach(walk);
        if (node.body) node.body.forEach(walk);
        if (node.trailing) node.trailing.forEach(walk);
      }
      walk(doc);
      if (found) doc.usePackage('amsmath');
    }
  };
};
