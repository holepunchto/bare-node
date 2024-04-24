# bare-node

Compatibility modules for Bare that try to behave like their Node.js counterparts. Not meant to cover 100% of all APIs but the 95% that everyone uses.

Currently supported:

{{list}}

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
{{all}}
```

## License

Apache-2.0
