const TextNode = require('./nodes/TextNode');
const CommandNode = require('./nodes/CommandNode');
const EnvironmentNode = require('./nodes/EnvironmentNode');
const DocumentNode = require('./nodes/DocumentNode');
const MathNode = require('./nodes/MathNode');
const CommentNode = require('./nodes/CommentNode');

function text(str) { return new TextNode(str); }
function command(name, args = [], trailing = []) { return new CommandNode(name, args, trailing); }
function env(name, args = [], children = []) { return new EnvironmentNode(name, args, children); }
function document() { return new DocumentNode(); }

function mandatory(value) { return { kind: 'mandatory', value }; }
function optional(value) { return { kind: 'optional', value }; }

// High-level helpers (minimal set for Phase 1)
function section(title, ...trailing) {
  return command('section', [mandatory(title)], trailing);
}
function itemize(...items) { return env('itemize', [], items); }
function enumerate(...items) { return env('enumerate', [], items); }
function item(content) { return command('item', [mandatory(content)]); }
function label(name) { return command('label', [mandatory(name)]); }
function ref(name) { return command('ref', [mandatory(name)]); }
function eqref(name) { return command('eqref', [mandatory(name)]); }
function math(expr, { display = false } = {}) { return new MathNode(expr, display); }
function comment(text) { return new CommentNode(text); }

module.exports = {
  text,
  command,
  env,
  document,
  mandatory,
  optional,
  section,
  itemize,
  enumerate,
  item,
  label,
  ref,
  eqref,
  math,
  comment,
};
