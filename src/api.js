// Public API (Phase 1)
const factory = require('./core/factory');
const { serializeNode } = require('./render/serialize');

function render(doc) {
  if (doc.type !== 'document') throw new Error('render expects a DocumentNode');
  return serializeNode(doc);
}

module.exports = {
  ...factory,
  render,
};
