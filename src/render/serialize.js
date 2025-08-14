const { escapeText } = require('./escape');

function renderArg(arg) {
  const value = typeof arg.value === 'string' ? escapeText(arg.value) : serializeNode(arg.value);
  return arg.kind === 'optional' ? `[${value}]` : `{${value}}`;
}

function serializeCommand(node) {
  const args = node.args.map(renderArg).join('');
  const trailing = node.trailing.map(serializeNode).join('');
  return `\\${node.name}${args}${trailing ? `\n${trailing}` : ''}`;
}

function serializeEnvironment(node) {
  const args = node.args.map(renderArg).join('');
  const inner = node.children.map(serializeNode).join('\n');
  return `\\begin{${node.name}}${args}\n${inner}\n\\end{${node.name}}`;
}

function serializeDocument(node) {
  const classOpts = node.documentClass.options.length ? `[${node.documentClass.options.join(',')}]` : '';
  const docClass = `\\documentclass${classOpts}{${node.documentClass.name}}`;
  const pkgs = Array.from(node.packages.entries())
    .map(([name, { options }]) => `\\usepackage${options.length ? `[${options.join(',')}]` : ''}{${name}}`)
    .join('\n');
  const macroDefs = node.macros.map(m => `\\newcommand{\\${m.name}}${m.params > 0 ? `[${m.params}]` : ''}{${m.body}}`).join('\n');
  const body = node.body.map(serializeNode).join('\n');
  const validation = basicValidation(node);
  const preambleParts = [docClass, pkgs, macroDefs].filter(Boolean).join('\n');
  return [preambleParts, '\\begin{document}', validation, body, '\\end{document}']
    .filter(Boolean)
    .join('\n');
}

function basicValidation(doc) {
  const missing = [];
  for (const ref of doc._refs) {
    if (!doc._labels.has(ref)) missing.push(ref);
  }
  if (missing.length) {
    return `% WARN: Unresolved refs -> ${missing.join(', ')}`;
  }
  return '';
}

function serializeNode(node) {
  switch (node.type) {
    case 'text':
      return escapeText(node.text);
    case 'command':
      return serializeCommand(node);
    case 'environment':
      return serializeEnvironment(node);
    case 'document':
      return serializeDocument(node);
    case 'math':
  return node.display ? `$$${node.content}$$` : `\\(${node.content}\\)`;
    case 'comment':
      return `% ${node.text}`;
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

module.exports = { serializeNode };
