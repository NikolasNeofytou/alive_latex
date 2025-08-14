// Public API (Phase 1/2 evolving)
const factory = require('./core/factory');
const { serializeNode } = require('./render/serialize');

/**
 * @typedef {Object} AliveLatexPlugin
 * @property {(doc: import('./core/nodes/DocumentNode'))=} preRender mutate or enrich the DocumentNode pre-serialization
 * @property {(latex: string, ctx: { warnings: string[], options: { pretty?: boolean, indent?: string } })=} postRender transform or annotate the final LaTeX (return string to replace)
 */

function render(doc, { pretty = false, indent = '  ', warnings = true, asObject = false } = {}) {
  if (doc.type !== 'document') throw new Error('render expects a DocumentNode');
  // Run preRender hooks
  for (const p of doc.plugins) {
    if (typeof p.preRender === 'function') {
      p.preRender(doc);
    }
  }
  // Always emitWarnings true internally to allow extraction; strip later if needed
  const internalLatex = serializeNode(doc, { pretty, indent, level: 0, emitWarnings: true });
  const warnLines = internalLatex.split('\n').filter(l => l.startsWith('% WARN:'));
  const finalLatex = warnings ? internalLatex : internalLatex.replace(/(^% WARN:.*\n?)/gm, '');
  let outputLatex = finalLatex;
  for (const p of doc.plugins) {
    if (typeof p.postRender === 'function') {
      const maybe = p.postRender(outputLatex, { warnings: warnLines, options: { pretty, indent } });
      if (typeof maybe === 'string') outputLatex = maybe;
    }
  }
  if (asObject) return { latex: outputLatex, warnings: warnLines };
  return outputLatex;
}

module.exports = {
  ...factory,
  render,
};
