# bare-node-runtime

Bare utilities for Node.js compatibility.

```
npm i bare-node-runtime
```

## Usage

```js
require('bare-node-runtime/global')

require('some-nodejs-package', {
  with: { imports: 'bare-node-runtime/imports' }
})
```

## License

Apache-2.0
