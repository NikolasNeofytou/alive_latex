## Alive LaTeX Roadmap

Purpose: Provide a structured, DOM/JSX-like programmable layer for LaTeX generation ("JavaScript for LaTeX"). This roadmap outlines phased delivery and how to track work using GitHub Projects.

---
### Phase Overview (High Level)
| Phase | Goal | Outcomes |
|-------|------|----------|
| 0 | Foundation cleanup | Current prototype stabilized, roadmap + project infra |
| 1 (MVP Core) | Core LOM + rendering | Document/Command/Environment nodes, escaping, basic helpers, tests |
| 2 (Authoring) | Ergonomics & structure | Helpers (section/itemize), macros, labels/refs, pretty formatting |
| 3 (Plugins & CLI) | Extensibility & tooling | Plugin API, CLI build/watch, PDF pipeline integration |
| 4 (Advanced Types & JSX) | DX uplift | TypeScript types, optional JSX/Babel plugin, snapshot tests |
| 5 (Quality & Perf) | Robustness | Validation layer, diff/incremental rendering, caching |
| 6 (Ecosystem) | Ecosystem integrations | Bibliography, figures/tables abstractions, theming presets |

---
## Phase 0 – Foundation (Week 0)
Objectives:
1. Add roadmap + project configuration (this file)
2. Set up GitHub Project (beta) board
3. Define labels & issue templates
4. Keep existing API (lom.js) but mark as legacy

Key Issues:
- chore: create GitHub Project board & fields
- chore: add label set (phase, type, priority)
- docs: add deprecation note in lom.js

Exit Criteria:
- Board active with at least initial Phase 1 issues populated
- README references roadmap

## Phase 1 – MVP Core (Weeks 1-2)
Deliverables:
- Core node classes: DocumentNode, CommandNode, EnvironmentNode, TextNode, RawNode
- Argument model (mandatory vs optional)
- Escaping module (text vs math modes; minimal set)
- Serializer producing full .tex with \documentclass, \usepackage, body
- Basic helpers: document(), section(), itemize(), enumerate(), item(), text()
- Unit tests: serialization, escaping edge chars
- Backwards compatibility shim (lom.js warns once)

Exit Criteria:
- `npm test` green with new tests
- Example script outputs a valid .tex file

## Phase 2 – Authoring Ergonomics (Weeks 3-4)
Deliverables:
- Labels & refs (label registry + unresolved warnings)
- Macro definition support (defineMacro, macro usage)
- MathNode (inline/display)
- Pretty printer (indentation, line wrapping at 100 cols configurable)
- CommentNode + ability to toggle debug comments
- Validation report (duplicate labels, unknown nodes)

Exit Criteria:
- Example includes labels & refs without warnings
- Pretty printed output toggle works

## Phase 3 – Plugins & CLI (Weeks 5-6)
Deliverables:
- Plugin API (lifecycle hooks: preRender(doc), postRender(tex))
- Built-in packages plugin helpers (amsmath, graphicx auto include)
- CLI: `alive-latex build entry.js --out main.tex [--pdf]` (latexmk optional)
- Watch mode (chokidar) incremental rebuild (full re-render for now)

Exit Criteria:
- CLI builds sample project to PDF locally (manual latex toolchain assumed)
- Plugin example modifies document (e.g., auto add date macro)

## Phase 4 – DX (Weeks 7-8)
Deliverables:
- TypeScript type declarations (.d.ts) + source conversion to ESM/dual build
- Optional JSX support (Babel plugin) mapping JSX elements to nodes
- Snapshots tests (Jest or vitest) for large docs
- Error source mapping (node metadata with origin file/line)

Exit Criteria:
- TS consumers get intellisense
- JSX example compiles & renders

## Phase 5 – Quality & Performance (Weeks 9-10)
Deliverables:
- Incremental diff (dirty flag strategy) to reserialize only changed subtrees
- Render timing metrics (simple profiler)
- Caching of preamble and stable parts
- Fuzz tests for escaping (property-based via fast-check)

Exit Criteria:
- Large example shows measurable speed improvement vs full rebuild (document numbers in PR)

## Phase 6 – Ecosystem Integrations (Weeks 11-12)
Deliverables:
- Bibliography integration (biblatex helper + plugin)
- Figure/table builder abstractions + float options
- Theming presets (article/report/beamer helpers)
- Unicode translation map (optional plugin) for common characters

Exit Criteria:
- Example doc with bibliography & figures builds cleanly

---
## GitHub Project Configuration (Beta Projects)

Recommended Project Name: "Alive LaTeX Roadmap"

Fields (Project > Settings > Fields):
- Status (Single select): Todo, In Progress, Review, Blocked, Done
- Phase (Single select): 0, 1, 2, 3, 4, 5, 6
- Priority (Single select): P0, P1, P2, P3
- Size (Single select): XS, S, M, L, XL
- Area (Single select): Core, Render, API, CLI, Plugin, DX, Infra, Docs
- Target (Text or Iteration) (optional: create Iterations for week ranges)
- Created/Updated (auto; default)

Views:
1. Board (group by Status; filter is: is:issue -label:archived)
2. Roadmap (group by Phase; show fields: Status, Priority, Size)
3. Backlog (filter: Status=Todo sort by Priority then Size)
4. In Flight (filter: Status=In Progress OR Status=Review)
5. Quality (filter: label:test OR label:validation)

Automation Ideas:
- When item added → set Status=Todo
- When PR linked & merged → Status=Done
- When assignee added → Status=In Progress
- When Status=Done → (optional) archive after 14 days

Labels (Repository → Settings → Labels):
- phase:0 .. phase:6
- type:core, type:render, type:api, type:cli, type:plugin, type:dx, type:docs, type:test, type:perf
- priority:p0 .. priority:p3
- good-first-issue (starter tasks)
- help-wanted (needs contributors)

Issue Title Conventions:
`[Phase X][Area] Short imperative description`
Example: `[Phase 1][Core] Implement CommandNode serialization`

Branch Naming:
`phase-<n>/<short-task>` e.g., `phase-1/command-node`

Commit Prefix (optional):
`core:`, `render:`, `plugin:`, `docs:`, `cli:`, `test:`

Milestones:
- v0.1.0 (Phase 1) – MVP Core
- v0.2.0 (Phase 2) – Authoring
- v0.3.0 (Phase 3) – CLI & Plugins
- v0.4.0 (Phase 4) – DX & JSX
- v0.5.0 (Phase 5) – Perf
- v0.6.0 (Phase 6) – Ecosystem

Release Checklist Template (add as .github/ISSUE_TEMPLATE/release.md later):
- [ ] All issues for milestone closed or deferred
- [ ] CHANGELOG updated
- [ ] Version bump committed
- [ ] Tag pushed & GitHub Release drafted
- [ ] Example docs regenerated

---
## Initial Issue Seed (Suggested)

| Title | Labels | Size |
|-------|--------|------|
| [Phase 0][Infra] Configure GitHub Project board | phase:0 type:infra | S |
| [Phase 0][Docs] Add ROADMAP.md | phase:0 type:docs | XS |
| [Phase 1][Core] Define node base classes | phase:1 type:core | M |
| [Phase 1][Render] Implement escape module | phase:1 type:render | S |
| [Phase 1][Render] Implement serializer for basic nodes | phase:1 type:render | M |
| [Phase 1][API] Helper functions (section, itemize, item) | phase:1 type:api | S |
| [Phase 1][Test] Add tests for commands/environments | phase:1 type:test | S |
| [Phase 1][Docs] Update README with new API example | phase:1 type:docs | XS |
| [Phase 2][Core] Label & ref registry | phase:2 type:core | M |
| [Phase 2][Render] Pretty printer | phase:2 type:render | M |
| [Phase 2][Core] Macro definition support | phase:2 type:core | M |
| [Phase 3][CLI] Build command (tex + optional pdf) | phase:3 type:cli | M |
| [Phase 3][Plugin] Plugin hook design | phase:3 type:plugin | S |

---
## Getting Started with GitHub Project (Manual Steps)
1. Create new Project (Beta): Repo → Projects → New project → Table layout
2. Add custom fields (Status, Phase, Priority, Size, Area)
3. Add views (Board, Roadmap, etc.) switching groupings and saving each
4. Add filters and save each view name
5. Populate initial issues using suggested seed
6. (Optional) Use GitHub CLI for automation (examples below)

### GitHub CLI Examples (Optional)
```bash
# Create issues quickly
gh issue create -t "[Phase 1][Core] Define node base classes" -b "Implements DocumentNode, CommandNode, EnvironmentNode, TextNode." -l phase:1,type:core,priority:p1

# List project items (replace PROJECT_NUMBER)
gh project item-list --owner "<your-user>" --number <PROJECT_NUMBER>

# Add an existing issue to project
gh project item-add --owner "<your-user" --number <PROJECT_NUMBER> --url https://github.com/<your-user>/alive_latex/issues/1
```

---
## Metrics & Progress Tracking (Later)
Add fields or use a JSON summary generated by a script to surface:
- Render performance (ms per render) over time
- Size (# nodes) of sample doc
- Test coverage (once coverage setup added)

---
## Future Considerations
- Monorepo split (core, cli, plugins) once complexity grows
- WASM playground to edit JS and preview rendered PDF in browser
- Template gallery (starter documents)

---
## Contributing Guidelines (Sketch)
1. Discuss substantial API changes via issue before PR
2. Maintain backward compatibility within minor series (0.x) where feasible
3. Include tests for new node types / render paths
4. Keep serializer deterministic (stable ordering)

---
End of roadmap.
