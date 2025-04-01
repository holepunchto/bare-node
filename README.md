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
  "dependencies": {
    "bare-fs": "^2.1.5"
  }
}
```

This way your module is in full control of exactly which version of the builtin it wants to bind to in Bare. If you can, this is the best option as it provides the best of all worlds; Node.js compatible, but full control of your dependencies.

Say goodbye to broken apps and modules due to Node.js core changes.

## Modules

| Node.js                                                                  | Bare                                                                  | Wrapper                                                                                            | Status            |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :---------------- |
| [`assert`](https://nodejs.org/api/assert.html)                           | [`bare-assert`](https://github.com/holepunchto/bare-assert)           | [`npm:bare-node-assert`](https://www.npmjs.com/package/bare-node-assert)                           |
| [`async_hooks`](https://nodejs.org/api/async_hooks.html)                 | None                                                                  | [`npm:bare-node-async-hooks`](https://www.npmjs.com/package/bare-node-async-hooks)                 |
| [`buffer`](https://nodejs.org/api/buffer.html)                           | [`bare-buffer`](https://github.com/holepunchto/bare-buffer)           | [`npm:bare-node-buffer`](https://www.npmjs.com/package/bare-node-buffer)                           |
| [`child_process`](https://nodejs.org/api/child_process.html)             | [`bare-subprocess`](https://github.com/holepunchto/bare-subprocess)   | [`npm:bare-node-child-process`](https://www.npmjs.com/package/bare-node-child-process)             |
| [`cluster`](https://nodejs.org/api/cluster.html)                         | None                                                                  | [`npm:bare-node-cluster`](https://www.npmjs.com/package/bare-node-cluster)                         |
| [`console`](https://nodejs.org/api/console.html)                         | [`bare-console`](https://github.com/holepunchto/bare-console)         | [`npm:bare-node-console`](https://www.npmjs.com/package/bare-node-console)                         |
| [`constants`](https://nodejs.org/api/constants.html)                     | None                                                                  | [`npm:bare-node-constants`](https://www.npmjs.com/package/bare-node-constants)                     | ⛔️ **Obsolete**  |
| [`crypto`](https://nodejs.org/api/crypto.html)                           | [`bare-crypto`](https://github.com/holepunchto/bare-crypto)           | [`npm:bare-node-crypto`](https://www.npmjs.com/package/bare-node-crypto)                           |
| [`dgram`](https://nodejs.org/api/dgram.html)                             | [`bare-dgram`](https://github.com/holepunchto/bare-dgram)             | [`npm:bare-node-dgram`](https://www.npmjs.com/package/bare-node-dgram)                             |
| [`diagnostics_channel`](https://nodejs.org/api/diagnostics_channel.html) | None                                                                  | [`npm:bare-node-diagnostics-channel`](https://www.npmjs.com/package/bare-node-diagnostics-channel) |
| [`dns`](https://nodejs.org/api/dns.html)                                 | [`bare-dns`](https://github.com/holepunchto/bare-dns)                 | [`npm:bare-node-dns`](https://www.npmjs.com/package/bare-node-dns)                                 |
| [`domain`](https://nodejs.org/api/domain.html)                           | None                                                                  | [`npm:bare-node-domain`](https://www.npmjs.com/package/bare-node-domain)                           | ⚠️ **Deprecated** |
| [`events`](https://nodejs.org/api/events.html)                           | [`bare-events`](https://github.com/holepunchto/bare-events)           | [`npm:bare-node-events`](https://www.npmjs.com/package/bare-node-events)                           |
| [`fs`](https://nodejs.org/api/fs.html)                                   | [`bare-fs`](https://github.com/holepunchto/bare-fs)                   | [`npm:bare-node-fs`](https://www.npmjs.com/package/bare-node-fs)                                   |
| [`http`](https://nodejs.org/api/http.html)                               | [`bare-http1`](https://github.com/holepunchto/bare-http1)             | [`npm:bare-node-http`](https://www.npmjs.com/package/bare-node-http)                               |
| [`http2`](https://nodejs.org/api/http2.html)                             | None                                                                  | [`npm:bare-node-http2`](https://www.npmjs.com/package/bare-node-http2)                             |
| [`https`](https://nodejs.org/api/https.html)                             | [`bare-https`](https://github.com/holepunchto/bare-https)             | [`npm:bare-node-https`](https://www.npmjs.com/package/bare-node-https)                             |
| [`inspector`](https://nodejs.org/api/inspector.html)                     | [`bare-inspector`](https://github.com/holepunchto/bare-inspector)     | [`npm:bare-node-inspector`](https://www.npmjs.com/package/bare-node-inspector)                     |
| [`module`](https://nodejs.org/api/module.html)                           | [`bare-module`](https://github.com/holepunchto/bare-module)           | [`npm:bare-node-module`](https://www.npmjs.com/package/bare-node-module)                           |
| [`net`](https://nodejs.org/api/net.html)                                 | [`bare-net`](https://github.com/holepunchto/bare-net)                 | [`npm:bare-node-net`](https://www.npmjs.com/package/bare-node-net)                                 |
| [`os`](https://nodejs.org/api/os.html)                                   | [`bare-os`](https://github.com/holepunchto/bare-os)                   | [`npm:bare-node-os`](https://www.npmjs.com/package/bare-node-os)                                   |
| [`path`](https://nodejs.org/api/path.html)                               | [`bare-path`](https://github.com/holepunchto/bare-path)               | [`npm:bare-node-path`](https://www.npmjs.com/package/bare-node-path)                               |
| [`perf_hooks`](https://nodejs.org/api/perf_hooks.html)                   | None                                                                  | [`npm:bare-node-perf-hooks`](https://www.npmjs.com/package/bare-node-perf-hooks)                   |
| [`process`](https://nodejs.org/api/process.html)                         | [`bare-process`](https://github.com/holepunchto/bare-process)         | [`npm:bare-node-process`](https://www.npmjs.com/package/bare-node-process)                         |
| [`punycode`](https://nodejs.org/api/punycode.html)                       | None                                                                  | [`npm:bare-node-punycode`](https://www.npmjs.com/package/bare-node-punycode)                       | ⚠️ **Deprecated** |
| [`querystring`](https://nodejs.org/api/querystring.html)                 | [`bare-querystring`](https://github.com/holepunchto/bare-querystring) | [`npm:bare-node-querystring`](https://www.npmjs.com/package/bare-node-querystring)                 |
| [`readline`](https://nodejs.org/api/readline.html)                       | [`bare-readline`](https://github.com/holepunchto/bare-readline)       | [`npm:bare-node-readline`](https://www.npmjs.com/package/bare-node-readline)                       |
| [`repl`](https://nodejs.org/api/repl.html)                               | [`bare-repl`](https://github.com/holepunchto/bare-repl)               | [`npm:bare-node-repl`](https://www.npmjs.com/package/bare-node-repl)                               |
| [`sea`](https://nodejs.org/api/sea.html)                                 | None                                                                  | [`npm:bare-node-sea`](https://www.npmjs.com/package/bare-node-sea)                                 |
| [`sqlite`](https://nodejs.org/api/sqlite.html)                           | None                                                                  | [`npm:bare-node-sqlite`](https://www.npmjs.com/package/bare-node-sqlite)                           |
| [`stream`](https://nodejs.org/api/stream.html)                           | [`bare-stream`](https://github.com/holepunchto/bare-stream)           | [`npm:bare-node-stream`](https://www.npmjs.com/package/bare-node-stream)                           |
| [`string_decoder`](https://nodejs.org/api/string_decoder.html)           | None                                                                  | [`npm:bare-node-string-decoder`](https://www.npmjs.com/package/bare-node-string-decoder)           |
| [`sys`](https://nodejs.org/api/sys.html)                                 | None                                                                  | [`npm:bare-node-sys`](https://www.npmjs.com/package/bare-node-sys)                                 | ⛔️ **Obsolete**  |
| [`test`](https://nodejs.org/api/test.html)                               | None                                                                  | [`npm:bare-node-test`](https://www.npmjs.com/package/bare-node-test)                               |
| [`timers`](https://nodejs.org/api/timers.html)                           | [`bare-timers`](https://github.com/holepunchto/bare-timers)           | [`npm:bare-node-timers`](https://www.npmjs.com/package/bare-node-timers)                           |
| [`tls`](https://nodejs.org/api/tls.html)                                 | [`bare-tls`](https://github.com/holepunchto/bare-tls)                 | [`npm:bare-node-tls`](https://www.npmjs.com/package/bare-node-tls)                                 |
| [`trace_events`](https://nodejs.org/api/trace_events.html)               | None                                                                  | [`npm:bare-node-trace-events`](https://www.npmjs.com/package/bare-node-trace-events)               | ⛔️ **Obsolete**  |
| [`tty`](https://nodejs.org/api/tty.html)                                 | [`bare-tty`](https://github.com/holepunchto/bare-tty)                 | [`npm:bare-node-tty`](https://www.npmjs.com/package/bare-node-tty)                                 |
| [`url`](https://nodejs.org/api/url.html)                                 | [`bare-url`](https://github.com/holepunchto/bare-url)                 | [`npm:bare-node-url`](https://www.npmjs.com/package/bare-node-url)                                 |
| [`util`](https://nodejs.org/api/util.html)                               | [`bare-utils`](https://github.com/holepunchto/bare-utils)             | [`npm:bare-node-util`](https://www.npmjs.com/package/bare-node-util)                               |
| [`v8`](https://nodejs.org/api/v8.html)                                   | None                                                                  | [`npm:bare-node-v8`](https://www.npmjs.com/package/bare-node-v8)                                   |
| [`vm`](https://nodejs.org/api/vm.html)                                   | [`bare-vm`](https://github.com/holepunchto/bare-vm)                   | [`npm:bare-node-vm`](https://www.npmjs.com/package/bare-node-vm)                                   |
| [`wasi`](https://nodejs.org/api/wasi.html)                               | None                                                                  | [`npm:bare-node-wasi`](https://www.npmjs.com/package/bare-node-wasi)                               |
| [`worker_threads`](https://nodejs.org/api/worker_threads.html)           | [`bare-worker`](https://github.com/holepunchto/bare-worker)           | [`npm:bare-node-worker-threads`](https://www.npmjs.com/package/bare-node-worker-threads)           |
| [`zlib`](https://nodejs.org/api/zlib.html)                               | [`bare-zlib`](https://github.com/holepunchto/bare-zlib)               | [`npm:bare-node-zlib`](https://www.npmjs.com/package/bare-node-zlib)                               |

## License

Apache-2.0
