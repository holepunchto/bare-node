# bare-node

Compat modules for Bare that try to behave like their Node.js counterparts.
Not meant to cover 100% of all APIS but the 95% that everyone uses

Currently supported are

{{list}}

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

Note that this way the module is in FULL control of exactly which version of events it wants to bind to in Bare.
If you can, this is the best option as it provides the best of all worlds. Node.js compat, but full control of your dependencies.

Say goodbye to broken apps and modules due to Node.js core changes.

## Get the full Node.js stdlib

To get the full Node.js compat layer that Bare currently supports add the following to package.json

```json
{{all}}
```
