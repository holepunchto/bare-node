# bare-node

Compatibility modules for Bare that try to behave like their Node.js counterparts. Not meant to cover 100% of all APIs but the 95% that everyone uses.

Currently supported:

* `assert`: [`bare-assert`](https://github.com/holepunchto/bare-assert) (through `npm:bare-node-assert`)
* `buffer`: [`bare-buffer`](https://github.com/holepunchto/bare-buffer) (through `npm:bare-node-buffer`)
* `child_process`: [`bare-subprocess`](https://github.com/holepunchto/bare-subprocess) (through `npm:bare-node-child-process`)
* `console`: [`bare-console`](https://github.com/holepunchto/bare-console) (through `npm:bare-node-console`)
* `events`: [`bare-events`](https://github.com/holepunchto/bare-events) (through `npm:bare-node-events`)
* `fs`: [`bare-fs`](https://github.com/holepunchto/bare-fs) (through `npm:bare-node-fs`)
* `http`: [`bare-http1`](https://github.com/holepunchto/bare-http1) (through `npm:bare-node-http`)
* `https`: [`bare-https`](https://github.com/holepunchto/bare-https) (through `npm:bare-node-https`)
* `inspector`: [`bare-inspector`](https://github.com/holepunchto/bare-inspector) (through `npm:bare-node-inspector`)
* `os`: [`bare-os`](https://github.com/holepunchto/bare-os) (through `npm:bare-node-os`)
* `path`: [`bare-path`](https://github.com/holepunchto/bare-path) (through `npm:bare-node-path`)
* `process`: [`bare-process`](https://github.com/holepunchto/bare-process) (through `npm:bare-node-process`)
* `readline`: [`bare-readline`](https://github.com/holepunchto/bare-readline) (through `npm:bare-node-readline`)
* `repl`: [`bare-repl`](https://github.com/holepunchto/bare-repl) (through `npm:bare-node-repl`)
* `timers`: [`bare-timers`](https://github.com/holepunchto/bare-timers) (through `npm:bare-node-timers`)
* `tls`: [`bare-tls`](https://github.com/holepunchto/bare-tls) (through `npm:bare-node-tls`)
* `tty`: [`bare-tty`](https://github.com/holepunchto/bare-tty) (through `npm:bare-node-tty`)
* `url`: [`bare-url`](https://github.com/holepunchto/bare-url) (through `npm:bare-node-url`)
* `worker_threads`: [`bare-worker`](https://github.com/holepunchto/bare-worker) (through `npm:bare-node-worker-threads`)

## Example

To use `fs` easily in a Bare application simply do the following in your `package.json`:

```json
{
  "dependencies": {
    "bare-fs": "^2.1.5",
    "fs": "npm:bare-node-fs"
  }
}
```

First we say install `bare-fs` newer than `^2.1.5`. Then we say, alias `fs` to the wrapper `npm:bare-node-fs`.

The only thing the wrapper does is `module.exports = require('bare-fs')` and at version `*`, meaning the version you specify is the one that wins.

Using the wrapper saves you space as it means npm will only include `bare-fs` once if something else installs it.

## Using import maps

When writing a module that uses `fs` you can also choose to specify directly in that module what `fs` should map to instead of relying on a compatibility layer. You would do that using an import map.

For example [Localdrive](https://github.com/holepunchto/localdrive) uses `fs` and to work in both Bare and Node.js it adds the following import map to `package.json`:

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

This way the module is in full control of exactly which version of `fs` it wants to bind to in Bare. If you can, this is the best option as it provides the best of all worlds; Node.js compatible, but full control of your dependencies.

Say goodbye to broken apps and modules due to Node.js core changes.

## Get the full Node.js library

To get the full Node.js compatibility layer that Bare currently supports add the following to your `package.json`:

```json
{
  "dependencies": {
    "bare-assert": "^1.0.1",
    "assert": "npm:bare-node-assert",
    "bare-buffer": "^2.2.0",
    "buffer": "npm:bare-node-buffer",
    "bare-subprocess": "^3.0.0",
    "child_process": "npm:bare-node-child-process",
    "bare-console": "^5.0.0",
    "console": "npm:bare-node-console",
    "bare-events": "^2.2.2",
    "events": "npm:bare-node-events",
    "bare-fs": "^2.3.0",
    "fs": "npm:bare-node-fs",
    "bare-http1": "^3.2.0",
    "http": "npm:bare-node-http",
    "bare-https": "^1.0.0",
    "https": "npm:bare-node-https",
    "bare-inspector": "^1.2.1",
    "inspector": "npm:bare-node-inspector",
    "bare-os": "^2.3.0",
    "os": "npm:bare-node-os",
    "bare-path": "^2.1.1",
    "path": "npm:bare-node-path",
    "bare-process": "^1.3.2",
    "process": "npm:bare-node-process",
    "bare-readline": "^1.0.2",
    "readline": "npm:bare-node-readline",
    "bare-repl": "^2.0.0",
    "repl": "npm:bare-node-repl",
    "bare-timers": "^2.0.9",
    "timers": "npm:bare-node-timers",
    "bare-tls": "^1.0.0",
    "tls": "npm:bare-node-tls",
    "bare-tty": "^3.3.0",
    "tty": "npm:bare-node-tty",
    "bare-url": "^1.1.0",
    "url": "npm:bare-node-url",
    "bare-worker": "^1.0.0",
    "worker_threads": "npm:bare-node-worker-threads"
  }
}
```

## License

Apache-2.0
