# Alive LaTeX

![CI](https://github.com/NikolasNeofytou/alive_latex/actions/workflows/ci.yml/badge.svg)

“JavaScript for LaTeX” – a programmable LaTeX Object Model (LOM) with an API and, over time, a plugin + build ecosystem (see roadmap below).

Current state: minimal prototype (`src/lom.js`) proving out a DOM‑like approach. Roadmap tracks phased build‑out toward a richer node model, rendering pipeline, plugins, CLI, and JSX / TypeScript developer experience.

## Quick Start (Prototype API)
```javascript
const { createElement } = require('./src/lom.js');
const section = createElement('section', 'Introduction');
console.log(section.toString()); // => \section{Introduction}
```

## Roadmap
See `ROADMAP.md` for phased delivery (Phase 0–6) and GitHub Project setup instructions.

High level phases:
1. MVP Core (nodes + serializer)
2. Authoring ergonomics (macros, labels/refs, formatting)
3. Plugins & CLI
4. Developer Experience (TypeScript, JSX)
5. Quality & Performance (incremental rendering)
6. Ecosystem integrations (bibliography, figures, theming)

## Vision (Condensed)
Provide a structured AST + rendering + tooling layer so authors express LaTeX documents with composable JS constructs, similar to how React/JSX abstracts HTML. Future features include validation, incremental rebuilds, and a plugin system.

## Contributing (Early Stage)
While still pre-MVP, contributions are welcome. Prefer opening an issue describing proposed changes before a PR. Check open issues labeled `good-first-issue` or `phase:1` as we seed core tasks.

## Running Tests
Run the unified test suite (Vitest):
```bash
npm test
```
Or watch mode:
```bash
npm run test:watch
```

Generate coverage (text summary + lcov + HTML report in coverage/):
```bash
npm run coverage
```

### Pretty Printing
Pass `{ pretty: true }` to `render` for human-friendly indentation:
```javascript
const { document, section, itemize, item, render } = require('./src/api');
const doc = document().add(
	section('Intro'),
	itemize(item('First'), item('Second'))
);
console.log(render(doc, { pretty: true }));
```

### Render Options
`render(document, options)` supports:
- `pretty` (boolean) – formatted output
- `indent` (string) – indentation characters (default two spaces)
- `warnings` (boolean) – include inline warning comments (default true)
- `asObject` (boolean) – return `{ latex, warnings }` instead of string

Example collecting warnings without embedding them:
```javascript
const { document, section, ref, render } = require('./src/api');
const doc = document().add(section('Intro', ref('missing:sec')));
const { latex, warnings } = render(doc, { asObject: true, warnings: false });
console.log(warnings); // ['% WARN: Unresolved refs -> missing:sec']
console.log(latex); // No inline WARN comment
```

### Plugins (Experimental)
### Macros with Parameter Defaults
You can supply a default for the first argument of a macro by passing a 4th parameter to `defineMacro(name, paramCount, body, firstDefault)`:
```javascript
const doc = document()
	.defineMacro('img', 2, '\\includegraphics[width=#1]{#2}', '0.9\\textwidth');
console.log(render(doc));
// emits: \newcommand{\img}[2][0.9\textwidth]{\includegraphics[width=#1]{#2}}
```
Plugins can hook into the render lifecycle with optional `preRender(doc)` and `postRender(latex, ctx)` methods. Register a plugin on a Document via `doc.use(pluginObject)` before calling `render`.

Basic shape:
```javascript
const plugin = {
	preRender(doc) { /* mutate: add packages, define macros, traverse nodes */ },
	postRender(latex, ctx) { /* return new latex or void; ctx.warnings, ctx.options */ }
};
doc.use(plugin);
```

Auto math package example (included as `src/plugins/autoMathPackage.js`):
```javascript
const { document, math, render } = require('./src/api');
const autoMath = require('./src/plugins/autoMathPackage');
const doc = document();
doc.add(math('E=mc^2'));
doc.use(autoMath());
console.log(render(doc)); // will include \usepackage{amsmath}
```

Post-processing example:
```javascript
doc.use({
	postRender(latex) { return latex + '\n% built at ' + new Date().toISOString(); }
});
```

Return `{ latex, warnings }` via `asObject: true` if you need warning array data separate from inline comments.

## License
ISC

---
_Note: The current `lom.js` API is legacy and will be superseded by a structured node + serializer system in Phase 1. A compatibility shim will remain through at least v0.2.0._
