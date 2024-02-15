# bare-node

Compat modules for Bare that try to behave like their Node.js counterparts.
Not meant to cover 100% of all APIS but the 95% that everyone uses

Currently supported are

* `child_process`: [`bare-subprocess`](https://github.com/holepunchto/bare-subprocess) (through `npm:bare-node-child-process)`
* `console`: [`bare-console`](https://github.com/holepunchto/bare-console) (through `npm:bare-node-console)`
* `events`: [`bare-events`](https://github.com/holepunchto/bare-events) (through `npm:bare-node-events)`
* `fs`: [`bare-fs`](https://github.com/holepunchto/bare-fs) (through `npm:bare-node-fs)`
* `http`: [`bare-http1`](https://github.com/holepunchto/bare-http1) (through `npm:bare-node-http)`
* `inspector`: [`bare-inspector`](https://github.com/holepunchto/bare-inspector) (through `npm:bare-node-inspector)`
* `os`: [`bare-os`](https://github.com/holepunchto/bare-os) (through `npm:bare-node-os)`
* `path`: [`bare-path`](https://github.com/holepunchto/bare-path) (through `npm:bare-node-path)`
* `process`: [`bare-process`](https://github.com/holepunchto/bare-process) (through `npm:bare-node-process)`
* `readline`: [`bare-readline`](https://github.com/holepunchto/bare-readline) (through `npm:bare-node-readline)`
* `repl`: [`bare-repl`](https://github.com/holepunchto/bare-repl) (through `npm:bare-node-repl)`
* `url`: [`bare-url`](https://github.com/holepunchto/bare-url) (through `npm:bare-node-url)`

## Example, support `fs`

To use easily in a Bare application simply do the following in your package.json

```json
{
  "dependencies": {
    "bare-fs": "^2.1.5",
    "fs": "npm:bare-node-fs"
  }
}
```

First we say install `bare-fs` newer than `^2.1.5`.
Then we say, alias `fs` to the wrapper `npm:bare-node-fs`.

The only thing the wrapper does is `module.exports = require('bare-fs')` and at version `*`,
meaning the version you specify is the one that wins.

Using the wrapper saves you space as it means npm will only include `bare-fs` once if something else install it.

## Using import maps

When writing a module that uses `fs` you can also choose to specify directly in that
module what `fs` should map to instead of relying on the compat. You would do that using an import map.

For example [Localdrive](https://github.com/holepunchto/localdrive) uses `fs` and to work in both Bare and Node.js it adds the following import map
to package.json

```json
{
  "imports": {
    "events": {
      "bare": "bare-fs",
      "default": "fs"
    }
  },
  "optionalDependencies": {
    "bare-fs": "^2.1.5"
  }
}
```

This way the module is in FULL control of exactly which version of `fs` it wants to bind to in Bare.

If you can, this is the best option as it provides the best of all worlds. Node.js compat, but full control of your dependencies.

Say goodbye to broken apps and modules due to Node.js core changes.

## Get the full Node.js stdlib

To get the full Node.js compat layer that Bare currently supports add the following to package.json

```json
{
  "dependencies": {
    "bare-subprocess": "^2.0.4",
    "child_process": "npm:bare-node-child-process",
    "bare-console": "^4.1.0",
    "console": "npm:bare-node-console",
    "bare-events": "^2.2.0",
    "events": "npm:bare-node-events",
    "bare-fs": "^2.1.5",
    "fs": "npm:bare-node-fs",
    "bare-http1": "^2.0.3",
    "http": "npm:bare-node-http",
    "bare-inspector": "^1.1.2",
    "inspector": "npm:bare-node-inspector",
    "bare-os": "^2.2.0",
    "os": "npm:bare-node-os",
    "bare-path": "^2.1.0",
    "path": "npm:bare-node-path",
    "bare-process": "^1.3.0",
    "process": "npm:bare-node-process",
    "bare-readline": "^1.0.0",
    "readline": "npm:bare-node-readline",
    "bare-repl": "^1.0.3",
    "repl": "npm:bare-node-repl",
    "bare-url": "^1.0.5",
    "url": "npm:bare-node-url"
  }
}
```
