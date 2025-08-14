const { escapeText } = require('./escape');

function renderArg(arg, ctx) {
  const value = typeof arg.value === 'string' ? escapeText(arg.value) : serializeNode(arg.value, ctx);
  return arg.kind === 'optional' ? `[${value}]` : `{${value}}`;
}

function serializeCommand(node, ctx) {
  const args = node.args.map(a => renderArg(a, ctx)).join('');
  const trailing = node.trailing.map(ch => serializeNode(ch, ctx)).join(ctx.pretty ? '\n' : '');
  return `\\${node.name}${args}${trailing ? `\n${trailing}` : ''}`;
}

function serializeEnvironment(node, ctx) {
  const args = node.args.map(a => renderArg(a, ctx)).join('');
  if (!ctx.pretty) {
    const inner = node.children.map(ch => serializeNode(ch, ctx)).join('\n');
    return `\\begin{${node.name}}${args}\n${inner}\n\\end{${node.name}}`;
  }
  const indentStr = ctx.indent.repeat(ctx.level);
  const childCtx = { ...ctx, level: ctx.level + 1 };
  const childIndent = ctx.indent.repeat(ctx.level + 1);
  const innerLines = node.children.map(ch => serializeNode(ch, childCtx).split('\n')
    .map(l => (l.length ? childIndent + l : l)).join('\n'));
  return [
    `${indentStr}\\begin{${node.name}}${args}`,
    ...innerLines,
    `${indentStr}\\end{${node.name}}`
  ].join('\n');
}

function serializeDocument(node, ctx) {
  const classOpts = node.documentClass.options.length ? `[${node.documentClass.options.join(',')}]` : '';
  const docClass = `\\documentclass${classOpts}{${node.documentClass.name}}`;
  const pkgs = Array.from(node.packages.entries())
    .map(([name, { options }]) => `\\usepackage${options.length ? `[${options.join(',')}]` : ''}{${name}}`)
    .join('\n');
  const macroDefs = node.macros.map(m => {
    if (m.params > 0) {
      const countPart = `[${m.params}]`;
      const defaultPart = (m.firstDefault !== undefined && m.firstDefault !== null) ? `[${m.firstDefault}]` : '';
      return `\\newcommand{\\${m.name}}${countPart}${defaultPart}{${m.body}}`;
    }
    return `\\newcommand{\\${m.name}}{${m.body}}`;
  }).join('\n');
  const body = node.body.map(n => serializeNode(n, ctx)).join(ctx.pretty ? '\n\n' : '\n');
  const validation = ctx.emitWarnings ? basicValidation(node) : '';
  const preambleParts = [docClass, pkgs, macroDefs].filter(Boolean).join('\n');
  return [preambleParts, '\\begin{document}', validation, body, '\\end{document}']
    .filter(Boolean)
    .join('\n');
}

function basicValidation(doc) {
  const lines = [];
  const missing = [];
  for (const ref of doc._refs) {
    if (!doc._labels.has(ref)) missing.push(ref);
  }
  if (missing.length) lines.push(`% WARN: Unresolved refs -> ${missing.join(', ')}`);
  if (doc._duplicateLabels && doc._duplicateLabels.size) {
    lines.push(`% WARN: Duplicate labels -> ${Array.from(doc._duplicateLabels).join(', ')}`);
  }
  if (doc._macroRedefinitions && doc._macroRedefinitions.size) {
    lines.push(`% WARN: Macro redefinitions -> ${Array.from(doc._macroRedefinitions).join(', ')}`);
  }
  return lines.join('\n');
}

function serializeNode(node, ctx = { pretty: false, indent: '  ', level: 0, emitWarnings: true }) {
  switch (node.type) {
    case 'text':
      return escapeText(node.text);
    case 'command':
  return serializeCommand(node, ctx);
    case 'environment':
  return serializeEnvironment(node, ctx);
    case 'document':
  return serializeDocument(node, ctx);
    case 'math':
  return node.display ? `$$${node.content}$$` : `\\(${node.content}\\)`;
    case 'comment':
      return `% ${node.text}`;
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

module.exports = { serializeNode };
