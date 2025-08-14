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

## License
ISC

---
_Note: The current `lom.js` API is legacy and will be superseded by a structured node + serializer system in Phase 1. A compatibility shim will remain through at least v0.2.0._
