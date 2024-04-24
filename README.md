# bare-node

Compatibility modules for Bare that try to behave like their Node.js counterparts. Not meant to cover 100% of all APIs but the 95% that everyone uses.

## Usage

To use any of the supported Node.js builtins, such as `fs`, in a Bare application run the following:

```
npm i bare-fs fs@npm:bare-node-fs
```

This will add something like the following to your `package.json`:

```json
{
  "dependencies": {
    "bare-fs": "^2.1.5",
    "fs": "npm:bare-node-fs"
  }
}
```

The only thing the wrapper does is `module.exports = require('bare-fs')` and at version `*`, meaning the version you specify is the one that wins. Using the wrapper saves you space as it means npm will only include `bare-fs` once even if multiple modules depend on it.

### Import maps

When writing a module that uses a Node.js builtin, such as `fs`, you can also choose to specify directly in that module what builtin should map to instead of relying on the compatibility layer. You would do that using an import map by adding the following to your `package.json`:

```json
{
  "imports": {
    "fs": {
      "bare": "bare-fs",
      "default": "fs"
    },
    "fs/*": {
      "bare": "bare-fs/*",
      "default": "fs/*"
    }
  },
  "optionalDependencies": {
    "bare-fs": "^2.1.5"
  }
}
```

This way your module is in full control of exactly which version of the builtin it wants to bind to in Bare. If you can, this is the best option as it provides the best of all worlds; Node.js compatible, but full control of your dependencies.

Say goodbye to broken apps and modules due to Node.js core changes.

## Modules

* `assert`: [`bare-assert`](https://github.com/holepunchto/bare-assert) (through [`npm:bare-node-assert`](https://www.npmjs.com/package/bare-node-assert))
* `buffer`: [`bare-buffer`](https://github.com/holepunchto/bare-buffer) (through [`npm:bare-node-buffer`](https://www.npmjs.com/package/bare-node-buffer))
* `child_process`: [`bare-subprocess`](https://github.com/holepunchto/bare-subprocess) (through [`npm:bare-node-child-process`](https://www.npmjs.com/package/bare-node-child-process))
* `console`: [`bare-console`](https://github.com/holepunchto/bare-console) (through [`npm:bare-node-console`](https://www.npmjs.com/package/bare-node-console))
* `events`: [`bare-events`](https://github.com/holepunchto/bare-events) (through [`npm:bare-node-events`](https://www.npmjs.com/package/bare-node-events))
* `fs`: [`bare-fs`](https://github.com/holepunchto/bare-fs) (through [`npm:bare-node-fs`](https://www.npmjs.com/package/bare-node-fs))
* `http`: [`bare-http1`](https://github.com/holepunchto/bare-http1) (through [`npm:bare-node-http`](https://www.npmjs.com/package/bare-node-http))
* `https`: [`bare-https`](https://github.com/holepunchto/bare-https) (through [`npm:bare-node-https`](https://www.npmjs.com/package/bare-node-https))
* `inspector`: [`bare-inspector`](https://github.com/holepunchto/bare-inspector) (through [`npm:bare-node-inspector`](https://www.npmjs.com/package/bare-node-inspector))
* `module`: [`bare-module`](https://github.com/holepunchto/bare-module) (through [`npm:bare-node-module`](https://www.npmjs.com/package/bare-node-module))
* `os`: [`bare-os`](https://github.com/holepunchto/bare-os) (through [`npm:bare-node-os`](https://www.npmjs.com/package/bare-node-os))
* `path`: [`bare-path`](https://github.com/holepunchto/bare-path) (through [`npm:bare-node-path`](https://www.npmjs.com/package/bare-node-path))
* `process`: [`bare-process`](https://github.com/holepunchto/bare-process) (through [`npm:bare-node-process`](https://www.npmjs.com/package/bare-node-process))
* `readline`: [`bare-readline`](https://github.com/holepunchto/bare-readline) (through [`npm:bare-node-readline`](https://www.npmjs.com/package/bare-node-readline))
* `repl`: [`bare-repl`](https://github.com/holepunchto/bare-repl) (through [`npm:bare-node-repl`](https://www.npmjs.com/package/bare-node-repl))
* `timers`: [`bare-timers`](https://github.com/holepunchto/bare-timers) (through [`npm:bare-node-timers`](https://www.npmjs.com/package/bare-node-timers))
* `tls`: [`bare-tls`](https://github.com/holepunchto/bare-tls) (through [`npm:bare-node-tls`](https://www.npmjs.com/package/bare-node-tls))
* `tty`: [`bare-tty`](https://github.com/holepunchto/bare-tty) (through [`npm:bare-node-tty`](https://www.npmjs.com/package/bare-node-tty))
* `url`: [`bare-url`](https://github.com/holepunchto/bare-url) (through [`npm:bare-node-url`](https://www.npmjs.com/package/bare-node-url))
* `worker_threads`: [`bare-worker`](https://github.com/holepunchto/bare-worker) (through [`npm:bare-node-worker-threads`](https://www.npmjs.com/package/bare-node-worker-threads))

## License

Apache-2.0
