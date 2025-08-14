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
  const body = node.body.map(serializeNode).join('\n');
  return [docClass, pkgs, '\\begin{document}', body, '\\end{document}']
    .filter(Boolean)
    .join('\n');
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
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

module.exports = { serializeNode };
