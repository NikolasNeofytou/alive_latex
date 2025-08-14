// Basic LaTeX text escaping (Phase 1 minimal)
const ESCAPE_MAP = new Map([
  ['\\', '\\textbackslash{}'],
  ['{', '\\{'],
  ['}', '\\}'],
  ['#', '\\#'],
  ['$', '\\$'],
  ['%', '\\%'],
  ['&', '\\&'],
  ['_', '\\_'],
  ['~', '\\textasciitilde{}'],
  ['^', '\\textasciicircum{}'],
]);

function escapeText(str) {
  return str.replace(/[\\{}#$%&_~^]/g, (ch) => ESCAPE_MAP.get(ch) || ch);
}

module.exports = { escapeText };
