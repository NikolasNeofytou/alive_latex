const TextNode = require('./nodes/TextNode');
const CommandNode = require('./nodes/CommandNode');
const EnvironmentNode = require('./nodes/EnvironmentNode');
const DocumentNode = require('./nodes/DocumentNode');

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
};
