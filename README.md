# bare-node

Compat modules for Bare that try to behave like their Node.js counterparts.
Not meant to cover 100% of all APIS but the 95% that everyone uses

Currently supported are

* child_process: [bare-subprocess](https://github.com/holepunchto/bare-subprocess (npm:bare-node-child-process)
* console: [bare-console](https://github.com/holepunchto/bare-console (npm:bare-node-console)
* events: [bare-events](https://github.com/holepunchto/bare-events (npm:bare-node-events)
* fs: [bare-fs](https://github.com/holepunchto/bare-fs (npm:bare-node-fs)
* http: [bare-http1](https://github.com/holepunchto/bare-http1 (npm:bare-node-http)
* inspector: [bare-inspector](https://github.com/holepunchto/bare-inspector (npm:bare-node-inspector)
* os: [bare-os](https://github.com/holepunchto/bare-os (npm:bare-node-os)
* path: [bare-path](https://github.com/holepunchto/bare-path (npm:bare-node-path)
* process: [bare-process](https://github.com/holepunchto/bare-process (npm:bare-node-process)
* readline: [bare-readline](https://github.com/holepunchto/bare-readline (npm:bare-node-readline)
* repl: [bare-repl](https://github.com/holepunchto/bare-repl (npm:bare-node-repl)
* url: [bare-url](https://github.com/holepunchto/bare-url (npm:bare-node-url)

To use easily in a Bare application simply do the following in your package.json

```json
{
  "dependencies": {
    "bare-fs": "^2.1.5",
    "fs": "npm:bare-node-fs"
  }
}
```

The above says you wanna support `require(fs)` with `bare-fs` versioned to 2.1.5.
This means you can even lock down the versions of everthing if you want to!

When writing a module that uses fs you can also choose to specify directly in that
module what fs should map to instead of relying on the compat. You would do that using an import map.

For example Hypercore uses `events` and to work in both bare and node it adds the following import map
to package.json

```json
{
  "imports": {
    "events": {
      "bare": "bare-events",
      "default": "events"
    }
  },
  "optionalDependencies": {
    "bare-events": "^2.2.0"
  }
}
```

Note that this way the module is in FULL control of exactly which version of events it wants to bind to
in Bare.

Say goodbye to broken apps and modules due to Node.js core changes.

To get the full Node.js compat layer that bare currently supports add the following to package.json

```json
{
  "bare-subprocess": "^2.0.4"
  "child_process": "npm:bare-node-child-process"
  "bare-console": "^4.1.0"
  "console": "npm:bare-node-console"
  "bare-events": "^2.2.0"
  "events": "npm:bare-node-events"
  "bare-fs": "^2.1.5"
  "fs": "npm:bare-node-fs"
  "bare-http1": "^2.0.3"
  "http": "npm:bare-node-http"
  "bare-inspector": "^1.1.2"
  "inspector": "npm:bare-node-inspector"
  "bare-os": "^2.2.0"
  "os": "npm:bare-node-os"
  "bare-path": "^2.1.0"
  "path": "npm:bare-node-path"
  "bare-process": "^1.3.0"
  "process": "npm:bare-node-process"
  "bare-readline": "^1.0.0"
  "readline": "npm:bare-node-readline"
  "bare-repl": "^1.0.3"
  "repl": "npm:bare-node-repl"
  "bare-url": "^1.0.5"
  "url": "npm:bare-node-url"
}
```
