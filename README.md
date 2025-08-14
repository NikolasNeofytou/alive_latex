# Alive LaTeX

An experimental project exploring a JavaScript-like interface for building
LaTeX documents programmatically. The included `src/lom.js` module provides a
very small set of utilities that mimic a DOM-style API:

```javascript
const { createElement } = require('./src/lom.js');

const section = createElement('section', 'Introduction');
console.log(section.toString()); // => \section{Introduction}
```

Run tests with:

```bash
npm test
```
